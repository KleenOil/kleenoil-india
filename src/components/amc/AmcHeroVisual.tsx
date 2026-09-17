'use client';

import { useState } from 'react';
import Image from 'next/image';

import { AmcYearRingSvg } from '@/components/amc/AmcYearRingSvg';

type QuarterItem = { code: string; label: string };

export function AmcHeroVisual({
  imageUrl,
  imageAlt,
  quarters,
}: {
  imageUrl: string | null;
  imageAlt: string;
  quarters: QuarterItem[];
}) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="relative min-h-[360px] overflow-hidden bg-brand-deep lg:min-h-[800px]">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 1024px) 47vw, 100vw"
        />
      ) : null}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[240px]"
        style={{
          background: 'linear-gradient(180deg, #00331900 0%, #003319E6 100%)',
        }}
      />
      <div className="pointer-events-none absolute right-6 top-8 hidden size-[180px] text-brand-soft/85 lg:block">
        <AmcYearRingSvg activeIndex={active} />
      </div>
      {quarters.length ? (
        <div className="absolute inset-x-4 bottom-6 z-10 flex items-center justify-between rounded-xl bg-[#003319]/85 px-4 py-3 backdrop-blur-sm lg:inset-x-8">
          {quarters.map((quarter, index) => (
            <button
              key={quarter.code}
              type="button"
              className="flex min-w-0 flex-1 flex-col items-center gap-1 border-0 bg-transparent px-1 py-1"
              onMouseEnter={() => setActive(index)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(index)}
              onBlur={() => setActive(null)}
            >
              <span
                className={`font-heading text-[13px] font-bold tracking-[1.6px] ${
                  active === index ? 'text-white' : 'text-brand-soft'
                }`}
              >
                {quarter.code}
              </span>
              <span className="font-heading text-[11px] font-semibold tracking-[1.2px] text-white uppercase">
                {quarter.label}
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
