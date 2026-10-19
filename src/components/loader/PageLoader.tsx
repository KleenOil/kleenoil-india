'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

import {
  killLoaderTweens,
  playLoaderIn,
  playLoaderOut,
  type PageLoaderTimeline,
} from '@/lib/animations/page-loader';
import { prefersReducedMotion } from '@/lib/animations/prefers-reduced-motion';
import type { SiteLoader } from '@/lib/cms/site';
import { cn } from '@/lib/utils';

type PageLoaderProps = {
  loader: SiteLoader;
};

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

function waitForPageAssets(): Promise<void> {
  const images = Array.from(document.querySelectorAll('main img')).filter(
    (node): node is HTMLImageElement => node instanceof HTMLImageElement && !node.complete,
  );

  if (!images.length) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    let remaining = images.length;
    const finishWait = () => {
      remaining -= 1;
      if (remaining <= 0) {
        window.clearTimeout(timer);
        resolve();
      }
    };
    const timer = window.setTimeout(resolve, 8000);
    images.forEach((image) => {
      image.addEventListener('load', finishWait, { once: true });
      image.addEventListener('error', finishWait, { once: true });
    });
  });
}

export function PageLoader({ loader }: PageLoaderProps) {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const routeRef = useRef(pathname);
  const phaseRef = useRef<'idle' | 'in' | 'hold' | 'out'>('idle');
  const pendingOutRef = useRef(false);
  const closingRef = useRef(false);
  const inTimelineRef = useRef<PageLoaderTimeline | null>(null);
  const outTimelineRef = useRef<PageLoaderTimeline | null>(null);

  const lockScroll = useCallback((locked: boolean) => {
    document.documentElement.classList.toggle('page-loader-active', locked);
  }, []);

  const finish = useCallback(() => {
    const root = rootRef.current;
    if (!root || phaseRef.current === 'out' || phaseRef.current === 'idle' || closingRef.current) {
      return;
    }

    if (phaseRef.current === 'in') {
      pendingOutRef.current = true;
      return;
    }

    if (phaseRef.current !== 'hold') {
      return;
    }

    closingRef.current = true;
    phaseRef.current = 'out';
    pendingOutRef.current = false;
    inTimelineRef.current?.kill();
    outTimelineRef.current?.kill();
    const reduced = prefersReducedMotion();
    const tl = playLoaderOut({ root, reduced, fadeMs: loader.minDurationMs });
    outTimelineRef.current = tl;
    tl.eventCallback('onComplete', () => {
      phaseRef.current = 'idle';
      pendingOutRef.current = false;
      closingRef.current = false;
      lockScroll(false);
      if (rootRef.current) {
        rootRef.current.setAttribute('aria-hidden', 'true');
        rootRef.current.setAttribute('data-state', 'idle');
        rootRef.current.setAttribute('aria-busy', 'false');
      }
    });
  }, [loader.minDurationMs, lockScroll]);

  const start = useCallback(() => {
    const root = rootRef.current;
    if (!root || phaseRef.current === 'in' || phaseRef.current === 'hold') {
      return;
    }

    outTimelineRef.current?.kill();
    inTimelineRef.current?.kill();
    killLoaderTweens(root);
    closingRef.current = false;
    phaseRef.current = 'in';
    pendingOutRef.current = false;
    lockScroll(true);
    root.setAttribute('aria-hidden', 'false');
    root.setAttribute('data-state', 'active');
    root.setAttribute('aria-busy', 'true');

    const reduced = prefersReducedMotion();
    const tl = playLoaderIn({ root, reduced, fadeMs: loader.minDurationMs });
    inTimelineRef.current = tl;
    tl.eventCallback('onComplete', () => {
      if (phaseRef.current !== 'in') {
        return;
      }
      phaseRef.current = 'hold';
      if (pendingOutRef.current) {
        finish();
      }
    });
  }, [finish, loader.minDurationMs, lockScroll]);

  useEffect(() => {
    if (pathname === routeRef.current) {
      return;
    }

    routeRef.current = pathname;
    let cancelled = false;
    void (async () => {
      await waitForPaint();
      await waitForPageAssets();
      if (!cancelled) {
        finish();
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [finish, pathname]);

  useEffect(() => {
    if (!loader.enabled) {
      return;
    }

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

    return () => {
      window.removeEventListener('load', releaseFirstLoad);
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('popstate', onPopState);
      inTimelineRef.current?.kill();
      outTimelineRef.current?.kill();
      if (rootRef.current) {
        killLoaderTweens(rootRef.current);
      }
      lockScroll(false);
    };
  }, [finish, loader.enabled, loader.showOnFirstLoad, lockScroll, start]);

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
          <div
            className={cn(
              'flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-[18px]',
            )}
          >
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
