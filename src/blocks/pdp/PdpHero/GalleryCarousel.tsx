'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

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
  const thumbRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const count = items.length;
  const safeActive = count > 0 ? Math.min(Math.max(active, 0), count - 1) : 0;

  const goTo = (index: number) => {
    if (count <= 1) {
      return;
    }
    onChange(((index % count) + count) % count);
  };

  // Keep the active thumb in view.
  useEffect(() => {
    const strip = thumbRef.current;
    if (!strip || count <= 1) {
      return;
    }
    const thumb = strip.querySelector<HTMLElement>(`[data-thumb-index="${safeActive}"]`);
    thumb?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [safeActive, count]);

  if (count === 0) {
    return (
      <div className="surface-card relative aspect-[680/520] overflow-hidden rounded-[20px] border-2 border-border-subtle bg-brand-soft" />
    );
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <div
        className="surface-card relative aspect-[680/520] overflow-hidden rounded-[20px] border-2 border-border-subtle bg-brand-soft"
        onTouchStart={(event) => {
          touchStartX.current = event.changedTouches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          const startX = touchStartX.current;
          touchStartX.current = null;
          if (startX == null || count <= 1) {
            return;
          }
          const delta = (event.changedTouches[0]?.clientX ?? startX) - startX;
          if (Math.abs(delta) < 40) {
            return;
          }
          goTo(delta < 0 ? safeActive + 1 : safeActive - 1);
        }}
      >
        <div
          className="flex h-full w-full transition-transform duration-300 ease-out"
          style={{ transform: `translate3d(-${safeActive * 100}%, 0, 0)` }}
          aria-roledescription="carousel"
          aria-label="Product images"
        >
          {items.map((item, index) => (
            <div
              key={`${item.url}-${index}`}
              className="relative h-full w-full min-w-full shrink-0 grow-0 basis-full"
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
          className="flex gap-2 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                'relative h-14 w-[4.5rem] shrink-0 overflow-hidden rounded-lg border-2 md:h-16 md:w-[5.25rem]',
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
