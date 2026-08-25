'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

import { CtaButton } from '@/components/ui/cta-button';
import { usePrefersReducedMotion } from '@/lib/animations/prefers-reduced-motion';
import { cn } from '@/lib/utils';

export type HeroSlideView = {
  indexLabel: string;
  stat: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  imageUrl: string | null;
  imageAlt: string;
  ctas: Array<{
    label: string;
    href: string;
    appearance: 'primary' | 'secondary' | 'ghost';
    openInNewTab?: boolean;
  }>;
};

type HeroSliderProps = {
  slides: HeroSlideView[];
  intervalSeconds?: number;
};

const DEFAULT_INTERVAL_MS = 6000;
const SLIDE_MS = 720;
const ISO_TICKS = ['NAS 6', '16', '14', '12', '9'] as const;

function resolveIntervalMs(seconds?: number) {
  if (seconds === 0) {
    return 0;
  }

  if (!Number.isFinite(seconds) || seconds === undefined || seconds < 0) {
    return DEFAULT_INTERVAL_MS;
  }

  return Math.round(seconds * 1000);
}

function paneMotionClass(
  isIncoming: boolean,
  direction: 1 | -1,
  animating: boolean,
  reduceMotion: boolean,
) {
  if (!animating || reduceMotion) {
    return undefined;
  }

  if (isIncoming) {
    return direction === 1 ? 'hero-slide-in-next' : 'hero-slide-in-prev';
  }

  return direction === 1 ? 'hero-slide-out-next' : 'hero-slide-out-prev';
}

export function HeroSlider({ slides, intervalSeconds = 6 }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [copyIndex, setCopyIndex] = useState(0);
  const [copyIn, setCopyIn] = useState(true);
  const reduceMotion = usePrefersReducedMotion();
  const goRef = useRef<(delta: number) => void>(() => undefined);
  const copyTimer = useRef<number | null>(null);

  const count = slides.length;
  const slide = slides[copyIndex] ?? slides[0];
  const intervalMs = resolveIntervalMs(intervalSeconds);
  const showLoader = intervalMs > 0 && count > 1;
  const autoplay = showLoader && !reduceMotion;
  const animating = previous !== null;

  const go = useCallback(
    (delta: number) => {
      if (count < 2 || animating) {
        return;
      }

      const dir = delta > 0 ? 1 : -1;
      const next = (current + delta + count) % count;
      setDirection(dir);
      setPrevious(current);
      setCurrent(next);

      if (copyTimer.current) {
        window.clearTimeout(copyTimer.current);
      }

      if (reduceMotion) {
        setCopyIndex(next);
        setCopyIn(true);
        return;
      }

      setCopyIn(false);
      copyTimer.current = window.setTimeout(() => {
        setCopyIndex(next);
        copyTimer.current = window.setTimeout(() => {
          setCopyIn(true);
        }, 40);
      }, SLIDE_MS);
    },
    [animating, count, current, reduceMotion],
  );

  useEffect(() => {
    goRef.current = go;
  }, [go]);

  useEffect(() => {
    return () => {
      if (copyTimer.current) {
        window.clearTimeout(copyTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!autoplay) {
      return;
    }

    const timer = window.setInterval(() => {
      goRef.current(1);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [autoplay, current, intervalMs]);

  useEffect(() => {
    if (previous === null) {
      return;
    }

    const done = window.setTimeout(() => {
      setPrevious(null);
    }, SLIDE_MS);

    return () => window.clearTimeout(done);
  }, [previous]);

  if (!slide) {
    return null;
  }

  const number = String(copyIndex + 1).padStart(2, '0');
  const paneIndexes = animating && !reduceMotion ? [previous, current] : [current];

  return (
    <section
      className="relative isolate h-[calc(100vh-var(--header-height,5.25rem))] overflow-hidden bg-brand-deep"
      aria-roledescription="carousel"
      aria-label="Kleenoil hero"
    >
      <div className="relative h-full overflow-hidden">
        {paneIndexes.map((slideIndex) => {
          const item = slides[slideIndex];
          if (!item || slideIndex === null) {
            return null;
          }

          const isIncoming = slideIndex === current;

          return (
            <div
              key={slideIndex}
              className={cn(
                'hero-slide-pane absolute inset-0',
                isIncoming ? 'z-[1]' : 'z-0',
                paneMotionClass(isIncoming, direction, animating, reduceMotion),
              )}
              aria-hidden={slideIndex !== current}
            >
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  fill
                  priority={slideIndex === 0}
                  className="object-cover"
                  sizes="100vw"
                />
              ) : (
                <div className="absolute inset-0 bg-brand-deep" />
              )}
            </div>
          );
        })}

        <div
          aria-hidden
          className="absolute inset-0 z-[2]"
          style={{
            background:
              'linear-gradient(90deg, #00331900 0%, #00331922 22%, #00331999 58%, #003319F2 100%)',
          }}
        />

        <p
          aria-hidden
          className={cn(
            'hero-slide-copy pointer-events-none absolute top-6 right-8 z-[3] font-heading text-[120px] font-bold leading-none tracking-[-0.08em] text-white/10 lg:right-24 lg:text-[220px]',
            copyIn && 'is-in',
          )}
        >
          <span>{number}</span>
        </p>

        <div
          aria-hidden
          className="absolute top-24 right-4 bottom-16 z-[3] hidden flex-col items-center justify-between lg:right-6 lg:flex"
        >
          {ISO_TICKS.map((tick) => (
            <div key={tick} className="flex flex-col items-center gap-1">
              <span
                className={cn('h-0.5', tick === '14' ? 'w-7 bg-brand-primary' : 'w-4 bg-white/40')}
              />
              <span
                className={cn(
                  'font-mono text-[9px] font-bold tracking-[0.8px]',
                  tick === '14' ? 'text-brand-soft' : 'text-white/40',
                )}
              >
                {tick}
              </span>
            </div>
          ))}
        </div>

        <div className="relative z-[3] mx-auto flex h-full w-full max-w-[1440px] flex-col justify-end px-6 pt-16 pb-16 lg:px-[100px] lg:pt-20 lg:pb-20">
          <div className={cn('hero-slide-copy max-w-[680px]', copyIn && 'is-in')}>
            <p className="font-mono text-[12px] font-bold tracking-[2px] text-brand-soft uppercase">
              {slide.eyebrow}
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-white md:text-5xl lg:text-[64px]">
              {slide.headline.split('\n').map((line, lineIndex) => (
                <span key={`${line}-${lineIndex}`} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-5 max-w-[560px] text-base font-medium leading-relaxed text-brand-soft md:text-lg">
              {slide.subheadline}
            </p>
            {slide.ctas.length > 0 ? (
              <div className="mt-8 flex flex-wrap gap-3.5">
                {slide.ctas.map((cta, ctaIndex) => (
                  <CtaButton
                    key={`${cta.label}-${ctaIndex}`}
                    href={cta.href}
                    appearance={cta.appearance}
                    openInNewTab={cta.openInNewTab}
                    className={
                      cta.appearance === 'primary'
                        ? 'hover:border-white hover:bg-transparent hover:text-white'
                        : 'border-white text-white hover:border-white hover:bg-white hover:text-brand-deep'
                    }
                  >
                    {cta.label}
                  </CtaButton>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {count > 1 ? (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => go(-1)}
              className="absolute top-[42%] left-4 z-20 flex size-12 items-center justify-center rounded-full border-[1.5px] border-white bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white lg:left-8"
            >
              <ChevronLeft className="size-[22px]" aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => go(1)}
              className="absolute top-[42%] right-4 z-20 flex size-12 items-center justify-center rounded-full border-[1.5px] border-white bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white lg:right-16"
            >
              <ChevronRight className="size-[22px]" aria-hidden />
            </button>
          </>
        ) : null}

        {showLoader ? (
          <div className="absolute inset-x-0 bottom-0 z-20 h-1 bg-white/15" aria-hidden>
            <span
              key={`${current}-${intervalMs}`}
              className="hero-oil-fill absolute inset-y-0 left-0 bg-brand-primary"
              style={{ animationDuration: `${intervalMs}ms` }}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
