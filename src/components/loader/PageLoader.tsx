'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

import {
  hardHideLoader,
  killLoaderTweens,
  playLoaderIn,
  playLoaderOut,
  preloadPageLoaderGsap,
  setLoaderProgress,
  type PageLoaderTimeline,
} from '@/lib/animations/page-loader';
import { prefersReducedMotion } from '@/lib/animations/prefers-reduced-motion';
import type { SiteLoader } from '@/lib/cms/site';

type PageLoaderProps = {
  loader: SiteLoader;
};

const SAFETY_MAX_MS = 4500;
const ASSET_WAIT_MS = 1800;
const MIN_VISIBLE_MS = 320;

function isModifiedClick(event: MouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
}

function shouldHandleAnchor(anchor: HTMLAnchorElement): boolean {
  if (anchor.hasAttribute('download')) {
    return false;
  }

  const target = anchor.getAttribute('target');
  if (target && target !== '_self') {
    return false;
  }

  const href = anchor.getAttribute('href');
  if (
    !href ||
    href.startsWith('#') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('javascript:')
  ) {
    return false;
  }

  let next: URL;
  try {
    next = new URL(href, window.location.href);
  } catch {
    return false;
  }

  if (next.origin !== window.location.origin) {
    return false;
  }

  if (
    next.pathname.startsWith('/admin') ||
    next.pathname.startsWith('/api') ||
    next.pathname.startsWith('/_next')
  ) {
    return false;
  }

  return next.pathname !== window.location.pathname || next.search !== window.location.search;
}

function waitForPaint(): Promise<void> {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => resolve());
    });
  });
}

function waitForAboveFoldImages(timeoutMs: number): Promise<void> {
  const viewportH = window.innerHeight || 900;
  const images = Array.from(document.querySelectorAll('main img')).filter(
    (node): node is HTMLImageElement => {
      if (!(node instanceof HTMLImageElement) || node.complete) {
        return false;
      }

      const rect = node.getBoundingClientRect();
      if (rect.height === 0 && rect.width === 0) {
        return false;
      }
      return rect.top < viewportH * 1.15;
    },
  );

  if (!images.length) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    let remaining = images.length;
    let settled = false;
    const done = () => {
      if (settled) {
        return;
      }
      settled = true;
      window.clearTimeout(timer);
      resolve();
    };
    const onOne = () => {
      remaining -= 1;
      if (remaining <= 0) {
        done();
      }
    };
    const timer = window.setTimeout(done, timeoutMs);
    images.forEach((image) => {
      image.addEventListener('load', onOne, { once: true });
      image.addEventListener('error', onOne, { once: true });
      if (image.complete) {
        onOne();
      }
    });
  });
}

async function waitForPageReady(onProgress: (value: number) => void): Promise<void> {
  onProgress(0.35);
  await waitForPaint();
  onProgress(0.55);

  const fontsReady =
    'fonts' in document
      ? document.fonts.ready.then(() => undefined).catch(() => undefined)
      : Promise.resolve();

  await Promise.race([
    Promise.all([waitForAboveFoldImages(ASSET_WAIT_MS), fontsReady]),
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, ASSET_WAIT_MS);
    }),
  ]);

  onProgress(0.92);
  await waitForPaint();
  onProgress(1);
}

export function PageLoader({ loader }: PageLoaderProps) {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const routeRef = useRef(pathname);
  const phaseRef = useRef<'idle' | 'in' | 'hold' | 'out'>('idle');
  const pendingOutRef = useRef(false);
  const closingRef = useRef(false);
  const startedAtRef = useRef(0);
  const navTokenRef = useRef(0);
  const safetyTimerRef = useRef<number | null>(null);
  const hardSafetyTimerRef = useRef<number | null>(null);
  const minDurationMsRef = useRef(loader.minDurationMs);
  const inTimelineRef = useRef<PageLoaderTimeline | null>(null);
  const outTimelineRef = useRef<PageLoaderTimeline | null>(null);
  const startRef = useRef<() => void>(() => undefined);
  const finishRef = useRef<() => void>(() => undefined);

  useEffect(() => {
    minDurationMsRef.current = loader.minDurationMs;
  }, [loader.minDurationMs]);

  useEffect(() => {
    preloadPageLoaderGsap();
  }, []);

  // Stable controller — never torn down on pathname changes.
  useEffect(() => {
    if (!loader.enabled) {
      return;
    }

    const lockScroll = (locked: boolean) => {
      document.documentElement.classList.toggle('page-loader-active', locked);
    };

    const clearSafety = () => {
      if (safetyTimerRef.current !== null) {
        window.clearTimeout(safetyTimerRef.current);
        safetyTimerRef.current = null;
      }
      if (hardSafetyTimerRef.current !== null) {
        window.clearTimeout(hardSafetyTimerRef.current);
        hardSafetyTimerRef.current = null;
      }
    };

    const resetIdle = () => {
      clearSafety();
      phaseRef.current = 'idle';
      pendingOutRef.current = false;
      closingRef.current = false;
      lockScroll(false);
      const root = rootRef.current;
      if (root) {
        hardHideLoader(root);
      }
    };

    const finish = () => {
      const root = rootRef.current;
      if (
        !root ||
        phaseRef.current === 'out' ||
        phaseRef.current === 'idle' ||
        closingRef.current
      ) {
        return;
      }

      if (phaseRef.current === 'in') {
        pendingOutRef.current = true;
        return;
      }

      if (phaseRef.current !== 'hold') {
        return;
      }

      const elapsed = performance.now() - startedAtRef.current;
      const waitMore = Math.max(0, MIN_VISIBLE_MS - elapsed);
      if (waitMore > 0) {
        window.setTimeout(() => {
          if (phaseRef.current === 'hold' && !closingRef.current) {
            finish();
          }
        }, waitMore);
        return;
      }

      closingRef.current = true;
      phaseRef.current = 'out';
      pendingOutRef.current = false;
      inTimelineRef.current?.kill();
      outTimelineRef.current?.kill();
      setLoaderProgress({ root, progress: 1 });

      const reduced = prefersReducedMotion();
      const token = navTokenRef.current;

      void playLoaderOut({ root, reduced, fadeMs: minDurationMsRef.current })
        .then((tl) => {
          if (phaseRef.current !== 'out' || token !== navTokenRef.current) {
            tl.kill();
            return;
          }
          outTimelineRef.current = tl;
          tl.eventCallback('onComplete', () => {
            if (token !== navTokenRef.current) {
              return;
            }
            resetIdle();
          });
        })
        .catch(() => {
          resetIdle();
        });
    };

    const armSafety = () => {
      clearSafety();
      safetyTimerRef.current = window.setTimeout(() => {
        if (phaseRef.current === 'idle') {
          return;
        }
        pendingOutRef.current = true;
        if (phaseRef.current === 'in') {
          phaseRef.current = 'hold';
        }
        finish();
      }, SAFETY_MAX_MS);

      hardSafetyTimerRef.current = window.setTimeout(() => {
        if (phaseRef.current !== 'idle') {
          resetIdle();
        }
      }, SAFETY_MAX_MS + 1500);
    };

    const start = () => {
      const root = rootRef.current;
      if (!root) {
        return;
      }

      if (phaseRef.current === 'in' || phaseRef.current === 'hold') {
        pendingOutRef.current = false;
        armSafety();
        return;
      }

      if (phaseRef.current === 'out') {
        outTimelineRef.current?.kill();
        closingRef.current = false;
      }

      navTokenRef.current += 1;
      const token = navTokenRef.current;
      outTimelineRef.current?.kill();
      inTimelineRef.current?.kill();
      killLoaderTweens(root);
      closingRef.current = false;
      pendingOutRef.current = false;
      phaseRef.current = 'in';
      startedAtRef.current = performance.now();
      lockScroll(true);
      root.setAttribute('aria-hidden', 'false');
      root.setAttribute('data-state', 'active');
      root.setAttribute('aria-busy', 'true');
      armSafety();

      const reduced = prefersReducedMotion();
      void playLoaderIn({ root, reduced, fadeMs: minDurationMsRef.current })
        .then((tl) => {
          if (token !== navTokenRef.current || phaseRef.current !== 'in') {
            tl.kill();
            return;
          }
          inTimelineRef.current = tl;
          setLoaderProgress({ root, progress: 0.2 });

          const enterHold = () => {
            if (token !== navTokenRef.current || phaseRef.current !== 'in') {
              return;
            }
            phaseRef.current = 'hold';
            setLoaderProgress({ root, progress: 0.45 });
            if (pendingOutRef.current) {
              finish();
            }
          };

          if (typeof tl.progress === 'function' && tl.progress() >= 1) {
            enterHold();
            return;
          }

          tl.eventCallback('onComplete', enterHold);
        })
        .catch(() => {
          if (token !== navTokenRef.current) {
            return;
          }
          phaseRef.current = 'hold';
          if (pendingOutRef.current) {
            finish();
          }
        });
    };

    startRef.current = start;
    finishRef.current = finish;

    const onClick = (event: MouseEvent) => {
      if (isModifiedClick(event) || event.defaultPrevented) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest('a');
      if (!(anchor instanceof HTMLAnchorElement) || !shouldHandleAnchor(anchor)) {
        return;
      }

      start();
    };

    const onPopState = () => {
      start();
      pendingOutRef.current = true;
    };

    document.addEventListener('click', onClick, true);
    window.addEventListener('popstate', onPopState);

    const releaseFirstLoad = () => {
      pendingOutRef.current = true;
      finish();
    };

    if (loader.showOnFirstLoad) {
      start();
      if (document.readyState === 'complete') {
        releaseFirstLoad();
      } else {
        window.addEventListener('load', releaseFirstLoad, { once: true });
      }
    }

    const root = rootRef.current;

    return () => {
      clearSafety();
      window.removeEventListener('load', releaseFirstLoad);
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('popstate', onPopState);
      inTimelineRef.current?.kill();
      outTimelineRef.current?.kill();
      if (root) {
        killLoaderTweens(root);
      }
      lockScroll(false);
      phaseRef.current = 'idle';
      pendingOutRef.current = false;
      closingRef.current = false;
    };
  }, [loader.enabled, loader.showOnFirstLoad]);

  // Dismiss only when the committed route changes after a started transition.
  // Intentionally delay updating routeRef until dismiss is scheduled so React
  // Strict Mode / effect re-runs cannot skip the finish path.
  useEffect(() => {
    if (!loader.enabled) {
      return;
    }

    if (pathname === routeRef.current) {
      return;
    }

    if (phaseRef.current === 'idle') {
      routeRef.current = pathname;
      return;
    }

    const token = navTokenRef.current;
    const committedPath = pathname;
    let cancelled = false;

    void (async () => {
      try {
        await waitForPageReady((value) => {
          if (cancelled || token !== navTokenRef.current || !rootRef.current) {
            return;
          }
          if (phaseRef.current === 'in' || phaseRef.current === 'hold') {
            setLoaderProgress({ root: rootRef.current, progress: value });
          }
        });
      } catch {
        // Readiness probing must never trap the overlay.
      }

      if (cancelled || token !== navTokenRef.current) {
        return;
      }

      routeRef.current = committedPath;
      pendingOutRef.current = true;
      finishRef.current();
    })();

    return () => {
      cancelled = true;
    };
  }, [loader.enabled, pathname]);

  const mark = loader.brandName.trim().charAt(0).toUpperCase() || 'K';
  const brand = loader.brandName.trim() || 'KLEENOIL';

  return (
    <div
      ref={rootRef}
      className="page-loader pointer-events-none fixed inset-0 z-[200] overflow-hidden opacity-0"
      data-state="idle"
      aria-hidden="true"
      aria-live="polite"
      role="status"
    >
      <div data-loader="panel" className="absolute inset-0 bg-[#D4E8DC]">
        <span
          data-loader="edge"
          className="absolute top-0 right-0 h-full w-[3px] bg-brand-primary"
          aria-hidden
        />

        <p
          data-loader="hud"
          data-loader-axis="left"
          className="absolute top-7 left-6 flex items-center gap-2 font-mono text-[10px] tracking-[1.2px] text-text-secondary uppercase md:top-9 md:left-10 md:gap-2.5 md:text-[11px]"
        >
          <span className="size-[5px] rounded-[3px] bg-brand-primary md:size-1.5" aria-hidden />
          <span className="md:hidden">{loader.systemCodeMobile}</span>
          <span className="hidden md:inline">{loader.systemCode}</span>
        </p>

        <p
          data-loader="hud"
          data-loader-axis="bottom"
          className="absolute bottom-7 left-6 font-mono text-[10px] tracking-[1.2px] text-text-secondary uppercase md:bottom-10 md:left-10 md:text-[11px]"
        >
          {loader.versionLabel}
        </p>

        <p
          data-loader="hud"
          data-loader-axis="right"
          className="absolute right-6 bottom-7 font-mono text-[10px] tracking-[1.2px] text-text-secondary uppercase md:right-10 md:bottom-10 md:text-[11px]"
        >
          <span className="md:hidden">{loader.cornerBrandMobile}</span>
          <span className="hidden md:inline">{loader.cornerBrand}</span>
        </p>

        <div
          data-loader="center"
          className="absolute inset-0 flex flex-col items-center justify-center gap-7 px-6 md:gap-10"
        >
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-[18px]">
            <span
              data-loader="mark"
              className="flex size-16 items-center justify-center rounded-xl bg-brand-primary font-heading text-[32px] font-extrabold text-background md:size-[72px] md:rounded-[14px] md:text-4xl"
            >
              {mark}
            </span>
            <span data-loader="word" className="flex flex-col items-center md:items-start">
              <span className="font-heading text-[28px] leading-none font-bold tracking-[1px] text-text-primary uppercase md:text-4xl">
                {brand}
              </span>
              <span className="mt-1.5 font-mono text-[10px] tracking-[1.6px] text-text-secondary uppercase md:text-[11px]">
                <span className="md:hidden">{loader.taglineMobile}</span>
                <span className="hidden md:inline">{loader.tagline}</span>
              </span>
            </span>
          </div>

          <p
            data-loader="status"
            className="flex items-center gap-2 font-mono text-[11px] tracking-[1.3px] text-text-secondary uppercase md:gap-2.5 md:text-xs md:tracking-[1.4px]"
          >
            <span
              data-loader="pulse"
              className="size-[7px] rounded-[4px] bg-brand-primary md:size-2"
              aria-hidden
            />
            {loader.statusText}
          </p>

          <div
            data-loader="track"
            className="relative h-[3px] w-[min(260px,70vw)] overflow-hidden rounded-[2px] bg-[#C3D7CB] md:w-[480px]"
          >
            <span
              data-loader="fill"
              className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 rounded-[2px] bg-brand-primary"
            />
          </div>

          <div className="flex items-center gap-[9px] md:gap-2.5" aria-hidden>
            <span data-loader="dot" className="size-1.5 rounded-[3px] bg-brand-primary" />
            <span data-loader="dot" className="size-1.5 rounded-[3px] bg-[#A8C3B2]" />
            <span data-loader="dot" className="size-1.5 rounded-[3px] bg-[#C3D7CB]" />
          </div>
        </div>
      </div>
    </div>
  );
}
