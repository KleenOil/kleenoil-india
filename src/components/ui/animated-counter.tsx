'use client';

import { useEffect, useRef, useState } from 'react';

import { prefersReducedMotion } from '@/lib/animations/prefers-reduced-motion';
import { cn } from '@/lib/utils';

type ParsedStat = {
  prefix: string;
  target: number;
  suffix: string;
  decimals: number;
  useGrouping: boolean;
};

function parseStatValue(raw: string): ParsedStat | null {
  const match = raw.trim().match(/^([^\d]*)(\d{1,3}(?:,\d{3})*(?:\.\d+)?|\d+(?:\.\d+)?)(.*)$/u);

  if (!match) {
    return null;
  }

  const [, prefix = '', numberPart = '', suffix = ''] = match;
  const decimals = numberPart.includes('.') ? (numberPart.split('.')[1]?.length ?? 0) : 0;
  const target = Number(numberPart.replace(/,/g, ''));

  if (!Number.isFinite(target)) {
    return null;
  }

  return {
    prefix,
    target,
    suffix,
    decimals,
    useGrouping: numberPart.includes(','),
  };
}

function formatStatValue(parsed: ParsedStat, current: number): string {
  const formatted = current.toLocaleString('en-US', {
    minimumFractionDigits: parsed.decimals,
    maximumFractionDigits: parsed.decimals,
    useGrouping: parsed.useGrouping,
  });

  return `${parsed.prefix}${formatted}${parsed.suffix}`;
}

type AnimatedCounterProps = {
  value: string;
  className?: string;
  durationMs?: number;
};

export function AnimatedCounter({ value, className, durationMs = 2000 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    const parsed = parseStatValue(value);

    if (!node || !parsed) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    let started = false;

    const finish = () => {
      setDisplay(value);
    };

    const animate = () => {
      if (started) {
        return;
      }
      started = true;

      if (prefersReducedMotion()) {
        finish();
        return;
      }

      const start = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - start) / durationMs, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(formatStatValue(parsed, parsed.target * eased));

        if (progress < 1) {
          frame = requestAnimationFrame(tick);
          return;
        }

        finish();
      };

      setDisplay(formatStatValue(parsed, 0));
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [durationMs, value]);

  return (
    <span ref={ref} className={cn(className)} aria-label={value}>
      {display}
    </span>
  );
}
