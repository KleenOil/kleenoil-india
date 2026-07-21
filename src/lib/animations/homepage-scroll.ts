import { getMotionConfig, REVEAL_EASE, REVEAL_EASE_SOFT } from '@/lib/animations/motion-config';
import { initImageParallax } from '@/lib/animations/parallax-images';
import { prefersReducedMotion } from '@/lib/animations/prefers-reduced-motion';

type MotionHandle = {
  destroy: () => void;
};

type GsapInstance = typeof import('gsap').gsap;

const ITEM_SELECTORS = '[data-reveal-item], [data-reveal-stagger] .grid > *';

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px 0px -8% 0px',
  threshold: 0.06,
};

function deferUntilIdle(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(() => resolve(), { timeout: 900 });
      return;
    }

    setTimeout(resolve, 24);
  });
}

function toArray(nodes: NodeListOf<HTMLElement> | HTMLElement[]) {
  return [...new Set([...nodes])];
}

function finishReveal(gsap: GsapInstance, block: HTMLElement, animated: HTMLElement[]) {
  block.classList.add('motion-revealed');
  if (animated.length) {
    gsap.set(animated, { clearProps: 'all' });
  }
}

/**
 * Premium reveals without scroll jank:
 * - Dynamic GSAP import (homepage only)
 * - IntersectionObserver triggers (zero scroll listeners)
 * - No Lenis, no ScrollTrigger, no parallax scrub
 * - Each section animates once, then observer detaches
 */
export async function initHomepageMotion(root: HTMLElement): Promise<MotionHandle> {
  if (prefersReducedMotion()) {
    root.classList.add('motion-reduced');
    return { destroy: () => undefined };
  }

  // Start parallax immediately — do not wait on idle / GSAP load
  const parallax = initImageParallax(root);

  await deferUntilIdle();

  const { gsap } = await import('gsap');
  const config = getMotionConfig();

  const played = new WeakSet<Element>();
  const callbacks = new Map<Element, () => void>();

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting || played.has(entry.target)) {
        continue;
      }

      played.add(entry.target);
      callbacks.get(entry.target)?.();
      callbacks.delete(entry.target);
      observer.unobserve(entry.target);
    }
  }, OBSERVER_OPTIONS);

  const watch = (element: Element, run: () => void) => {
    callbacks.set(element, run);
    observer.observe(element);
  };

  const ctx = gsap.context(() => {
    playHero(gsap, root, config);

    root.querySelectorAll<HTMLElement>('[data-reveal="section"]').forEach((section) => {
      watch(section, () => playSection(gsap, section, config));
    });

    const cta = root.querySelector<HTMLElement>('[data-reveal="cta"]');
    if (cta) {
      watch(cta, () => playCta(gsap, cta, config));
    }
  }, root);

  return {
    destroy: () => {
      observer.disconnect();
      callbacks.clear();
      ctx.revert();
      parallax.destroy();
    },
  };
}

function playHero(
  gsap: GsapInstance,
  root: HTMLElement,
  config: ReturnType<typeof getMotionConfig>,
) {
  const hero = root.querySelector<HTMLElement>('[data-reveal="hero"]');
  if (!hero) {
    return;
  }

  const targets = hero.querySelectorAll<HTMLElement>('[data-reveal-target]');
  const glow = hero.querySelector<HTMLElement>('[data-hero-glow]');
  const animated = [...targets, ...(glow ? [glow] : [])];

  const tl = gsap.timeline({
    defaults: { ease: REVEAL_EASE },
    onComplete: () => finishReveal(gsap, hero, animated),
  });

  if (targets.length) {
    gsap.set(targets, { opacity: 0, y: config.yHeader });
    tl.to(targets, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: config.staggerHeader,
    });
  }

  if (glow) {
    gsap.set(glow, { opacity: 0.3, scale: 0.94 });
    tl.to(glow, { opacity: 0.6, scale: 1, duration: 1.15, ease: REVEAL_EASE_SOFT }, 0);
  }
}

function playSection(
  gsap: GsapInstance,
  section: HTMLElement,
  config: ReturnType<typeof getMotionConfig>,
) {
  const headerParts = section.querySelectorAll<HTMLElement>('[data-reveal-part]');
  const items = toArray(section.querySelectorAll<HTMLElement>(ITEM_SELECTORS));
  const logos = section.querySelectorAll<HTMLElement>('[data-reveal-logos] > *');
  const columns = section.querySelectorAll<HTMLElement>('[data-reveal-column]');
  const lineGrow = section.querySelector<HTMLElement>('.motion-line-grow');
  const animated = [
    ...headerParts,
    ...items,
    ...logos,
    ...columns,
    ...(lineGrow ? [lineGrow] : []),
  ];

  if (!animated.length) {
    section.classList.add('motion-revealed');
    return;
  }

  const tl = gsap.timeline({
    defaults: { ease: REVEAL_EASE },
    onComplete: () => finishReveal(gsap, section, animated),
  });

  if (headerParts.length) {
    gsap.set(headerParts, { opacity: 0, y: config.yHeader });
    tl.to(headerParts, {
      opacity: 1,
      y: 0,
      duration: config.duration,
      stagger: config.staggerHeader,
    });
  }

  if (lineGrow) {
    gsap.set(lineGrow, { scaleX: 0, transformOrigin: 'left center' });
    tl.to(
      lineGrow,
      { scaleX: 1, duration: 0.85, ease: REVEAL_EASE_SOFT },
      headerParts.length ? 0.08 : 0,
    );
  }

  if (columns.length) {
    gsap.set(columns, { opacity: 0, y: config.yItem });
    tl.to(
      columns,
      { opacity: 1, y: 0, duration: config.duration, stagger: 0.09 },
      headerParts.length ? 0.12 : 0,
    );
  }

  if (items.length) {
    gsap.set(items, { opacity: 0, y: config.yItem });
    tl.to(
      items,
      {
        opacity: 1,
        y: 0,
        duration: config.duration,
        stagger: config.staggerItem,
      },
      headerParts.length || columns.length ? 0.16 : 0.06,
    );
  }

  if (logos.length) {
    gsap.set(logos, { opacity: 0, y: 12 });
    tl.to(
      logos,
      { opacity: 1, y: 0, duration: 0.55, ease: REVEAL_EASE_SOFT, stagger: 0.045 },
      0.08,
    );
  }
}

function playCta(gsap: GsapInstance, cta: HTMLElement, config: ReturnType<typeof getMotionConfig>) {
  const panel = cta.querySelector<HTMLElement>('[data-reveal-panel]');
  const parts = cta.querySelectorAll<HTMLElement>('[data-reveal-part]');
  const badges = cta.querySelectorAll<HTMLElement>('[data-reveal-badges] > *');
  const animated = [...(panel ? [panel] : []), ...parts, ...badges];

  const tl = gsap.timeline({
    defaults: { ease: REVEAL_EASE },
    onComplete: () => finishReveal(gsap, cta, animated),
  });

  if (panel) {
    gsap.set(panel, { opacity: 0, y: config.yHeader, scale: 0.985 });
    tl.to(panel, { opacity: 1, y: 0, scale: 1, duration: 0.85 });
  }

  if (parts.length) {
    gsap.set(parts, { opacity: 0, y: config.yItem });
    tl.to(
      parts,
      { opacity: 1, y: 0, duration: config.duration, stagger: config.staggerHeader },
      panel ? 0.14 : 0,
    );
  }

  if (badges.length) {
    gsap.set(badges, { opacity: 0, y: 8 });
    tl.to(
      badges,
      { opacity: 1, y: 0, duration: 0.5, ease: REVEAL_EASE_SOFT, stagger: 0.06 },
      '-=0.18',
    );
  }
}

export type { MotionHandle };
