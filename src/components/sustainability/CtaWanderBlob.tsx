'use client';

import { useEffect, useRef } from 'react';

function randomIn(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function CtaWanderBlob() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    const parent = node?.offsetParent as HTMLElement | null;
    if (!node || !parent) {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const wander = () => {
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      const size = node.offsetWidth;
      const x = randomIn(-size * 0.35, width - size * 0.45);
      const y = randomIn(-size * 0.4, height - size * 0.4);
      const duration = randomIn(22, 38);

      node.style.transition = `transform ${duration}s ease-in-out`;
      node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const onEnd = (event: TransitionEvent) => {
      if (event.propertyName === 'transform') {
        wander();
      }
    };

    node.style.transition = 'none';
    wander();
    node.addEventListener('transitionend', onEnd);

    return () => {
      node.removeEventListener('transitionend', onEnd);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute top-0 left-0 size-[420px] text-brand-soft will-change-transform lg:size-[560px]"
    >
      <svg viewBox="0 0 560 560" className="h-full w-full" fill="currentColor">
        <circle cx="280" cy="280" r="280" />
      </svg>
    </div>
  );
}
