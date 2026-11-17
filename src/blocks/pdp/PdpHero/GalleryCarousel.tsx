'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

export type GalleryCarouselItem = {
  url: string;
  alt: string;
};

type GalleryCarouselProps = {
  items: GalleryCarouselItem[];
  active: number;
  onChange: (index: number) => void;
  badge?: string;
};

export function GalleryCarousel({ items, active, onChange, badge }: GalleryCarouselProps) {
  const mainRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const syncingRef = useRef(false);
  const count = items.length;
  const safeActive = count > 0 ? Math.min(Math.max(active, 0), count - 1) : 0;

  const scrollMainTo = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const scroller = mainRef.current;
    if (!scroller) {
      return;
    }
    const width = scroller.clientWidth;
    if (width <= 0) {
      return;
    }
    syncingRef.current = true;
    scroller.scrollTo({ left: width * index, behavior });
    window.setTimeout(
      () => {
        syncingRef.current = false;
      },
      behavior === 'smooth' ? 420 : 0,
    );
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (count <= 1) {
        return;
      }
      const next = ((index % count) + count) % count;
      onChange(next);
      scrollMainTo(next);
    },
    [count, onChange, scrollMainTo],
  );

  // Keep main track aligned when active changes from thumbs / variant reset.
  useEffect(() => {
    scrollMainTo(safeActive, 'auto');
  }, [safeActive, scrollMainTo, count]);

  // Keep the active thumb visible in the strip.
  useEffect(() => {
    const strip = thumbRef.current;
    if (!strip || count <= 1) {
      return;
    }
    const thumb = strip.querySelector<HTMLElement>(`[data-thumb-index="${safeActive}"]`);
    thumb?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [safeActive, count]);

  useEffect(() => {
    const scroller = mainRef.current;
    if (!scroller || count <= 1) {
      return;
    }

    const onScroll = () => {
      if (syncingRef.current) {
        return;
      }
      const width = scroller.clientWidth;
      if (width <= 0) {
        return;
      }
      const index = Math.round(scroller.scrollLeft / width);
      if (index !== safeActive && index >= 0 && index < count) {
        onChange(index);
      }
    };

    scroller.addEventListener('scroll', onScroll, { passive: true });
    return () => scroller.removeEventListener('scroll', onScroll);
  }, [count, onChange, safeActive]);

  if (count === 0) {
    return (
      <div className="surface-card relative aspect-[680/520] overflow-hidden rounded-[20px] border-2 border-border-subtle bg-brand-soft" />
    );
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="surface-card relative aspect-[680/520] overflow-hidden rounded-[20px] border-2 border-border-subtle bg-brand-soft">
        <div
          ref={mainRef}
          className="flex h-full w-full snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-roledescription="carousel"
          aria-label="Product images"
        >
          {items.map((item, index) => (
            <div
              key={`${item.url}-${index}`}
              className="relative h-full w-full shrink-0 snap-center"
              aria-hidden={index !== safeActive}
            >
              <Image
                src={item.url}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 680px"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 bg-brand-primary/10" aria-hidden />

        {badge ? (
          <div className="absolute top-6 left-6 z-10 inline-flex items-center gap-2 rounded-full bg-surface-elevated/80 px-3.5 py-2.5">
            <span className="size-1.5 rounded-full bg-brand-primary" aria-hidden />
            <span className="font-mono text-[11px] font-bold tracking-[1.2px] text-brand-primary uppercase">
              {badge}
            </span>
          </div>
        ) : null}

        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={() => goTo(safeActive - 1)}
              className="absolute top-1/2 left-3 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-border-subtle bg-surface-elevated/90 text-text-primary shadow-sm transition hover:border-brand-primary hover:text-brand-primary md:left-4 md:size-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => goTo(safeActive + 1)}
              className="absolute top-1/2 right-3 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-border-subtle bg-surface-elevated/90 text-text-primary shadow-sm transition hover:border-brand-primary hover:text-brand-primary md:right-4 md:size-10"
              aria-label="Next image"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
            <p className="absolute right-4 bottom-4 z-10 rounded-md bg-surface-elevated/85 px-2 py-1 font-mono text-[10px] tracking-[1px] text-text-secondary uppercase md:right-5 md:bottom-5">
              {safeActive + 1} / {count}
            </p>
          </>
        ) : null}
      </div>

      {count > 1 ? (
        <div
          ref={thumbRef}
          data-reveal-ignore
          className="flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Image thumbnails"
        >
          {items.map((item, index) => (
            <button
              key={`thumb-${item.url}-${index}`}
              type="button"
              data-thumb-index={index}
              onClick={() => goTo(index)}
              aria-label={`Show image ${index + 1}`}
              aria-current={index === safeActive ? 'true' : undefined}
              className={cn(
                'relative h-14 w-[4.5rem] shrink-0 snap-start overflow-hidden rounded-lg border-2 md:h-16 md:w-[5.25rem]',
                index === safeActive ? 'border-brand-primary' : 'border-border-subtle',
              )}
            >
              <Image src={item.url} alt="" fill className="object-cover" sizes="84px" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
