import { prefersReducedMotion } from '@/lib/animations/prefers-reduced-motion';

type ParallaxHandle = {
  destroy: () => void;
};

type ParallaxItem = {
  container: HTMLElement;
  inner: HTMLElement;
  strength: number;
  active: boolean;
};

const DESKTOP_QUERY = '(min-width: 768px)';

/**
 * Lightweight parallax for opted-in images only (Hero + Featured Industries).
 * Uses one passive scroll listener + rAF; updates only in-view items.
 * Intentionally JS-based so it works in all desktop browsers.
 */
export function initImageParallax(root: HTMLElement): ParallaxHandle {
  if (prefersReducedMotion() || !window.matchMedia(DESKTOP_QUERY).matches) {
    return { destroy: () => undefined };
  }

  const items: ParallaxItem[] = [];

  root.querySelectorAll<HTMLElement>('[data-parallax-media]').forEach((container) => {
    const inner = container.querySelector<HTMLElement>('[data-parallax-inner]');
    if (!inner) {
      return;
    }

    items.push({
      container,
      inner,
      strength: Number(container.dataset.parallaxStrength ?? '0.14'),
      active: false,
    });
  });

  if (!items.length) {
    return { destroy: () => undefined };
  }

  let rafId = 0;
  let alive = true;

  const update = () => {
    rafId = 0;
    if (!alive) {
      return;
    }

    const viewportMid = window.innerHeight * 0.5;

    for (const item of items) {
      if (!item.active) {
        continue;
      }

      const rect = item.container.getBoundingClientRect();
      const elementMid = rect.top + rect.height * 0.5;
      const offset = (elementMid - viewportMid) * item.strength;
      item.inner.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    }
  };

  const schedule = () => {
    if (!rafId) {
      rafId = requestAnimationFrame(update);
    }
  };

  const visibility = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const item = items.find((candidate) => candidate.container === entry.target);
        if (!item) {
          continue;
        }

        item.active = entry.isIntersecting;
        if (!entry.isIntersecting) {
          item.inner.style.transform = '';
        }
      }
      schedule();
    },
    { root: null, rootMargin: '15% 0px', threshold: 0 },
  );

  items.forEach((item) => visibility.observe(item.container));

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  schedule();

  return {
    destroy: () => {
      alive = false;
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      visibility.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);

      for (const { inner } of items) {
        inner.style.transform = '';
      }
    },
  };
}

export type { ParallaxHandle };
