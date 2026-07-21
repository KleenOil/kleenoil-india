'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';

import { initHomepageMotion } from '@/lib/animations/homepage-scroll';
import { prefersReducedMotion } from '@/lib/animations/prefers-reduced-motion';

type HomepageMotionProps = {
  children: React.ReactNode;
};

export function HomepageMotion({ children }: HomepageMotionProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    if (prefersReducedMotion()) {
      root.classList.add('motion-reduced');
      return;
    }

    root.classList.add('is-animating');
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || root.classList.contains('motion-reduced')) {
      return;
    }

    let handle: { destroy: () => void } | null = null;
    let cancelled = false;

    void initHomepageMotion(root)
      .then((motion) => {
        if (cancelled) {
          motion.destroy();
          return;
        }
        handle = motion;
        root.classList.add('motion-ready');
      })
      .catch(() => {
        root.classList.remove('is-animating');
        root.classList.add('motion-reduced');
      });

    return () => {
      cancelled = true;
      handle?.destroy();
      root.classList.remove('is-animating', 'motion-ready');
    };
  }, []);

  return (
    <div ref={rootRef} className="homepage-motion">
      {children}
    </div>
  );
}
