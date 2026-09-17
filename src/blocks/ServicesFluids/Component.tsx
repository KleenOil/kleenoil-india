'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CircleDot, Droplet, Droplets, Sparkles, Thermometer, Wind } from 'lucide-react';

import { FluidsFlowSvg } from '@/components/services/FluidsFlowSvg';
import { blockHasCmsData, cmsList, cmsText } from '@/lib/cms/block-content';
import { getMediaAlt, getMediaUrl } from '@/lib/cms/links';
import { DEFAULT_SERVICES_FLUIDS } from '@/lib/cms/services';
import { cn } from '@/lib/utils';
import type { Media } from '@/payload-types';

const ICONS = {
  droplets: Droplets,
  droplet: Droplet,
  'circle-dot': CircleDot,
  wind: Wind,
  thermometer: Thermometer,
  sparkles: Sparkles,
} as const;

type FluidItem = { icon?: string | null; label?: string | null };

export type ServicesFluidsBlockData = {
  blockType: 'services-fluids';
  kicker?: string | null;
  note?: string | null;
  image?: number | Media | null;
  items?: FluidItem[] | null;
};

export function ServicesFluidsBlock({ block }: { block?: ServicesFluidsBlockData | null }) {
  const defaults = DEFAULT_SERVICES_FLUIDS;
  const hasCms = blockHasCmsData(block);
  const kicker = cmsText(block?.kicker, defaults.kicker, hasCms);
  const note = cmsText(block?.note, defaults.note, hasCms);
  const items = cmsList(
    block?.items,
    defaults.items,
    hasCms,
    (item): item is FluidItem & { label: string } => Boolean(item.label),
  );
  const imageUrl = cmsText(getMediaUrl(block?.image), defaults.imageUrl, hasCms);
  const imageAlt = getMediaAlt(block?.image, hasCms ? kicker || '' : defaults.imageAlt);
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="bg-brand-deep text-brand-soft">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-7 px-6 py-14 lg:px-[100px] lg:py-14">
        {kicker ? (
          <p
            data-reveal-part
            className="font-mono text-[12px] font-bold tracking-[2px] text-brand-soft uppercase"
          >
            {kicker}
          </p>
        ) : null}

        {imageUrl ? (
          <div
            data-reveal-panel
            className="relative h-40 overflow-hidden rounded-[4px] lg:h-[160px]"
          >
            <Image src={imageUrl} alt={imageAlt} fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-brand-deep/25" />
          </div>
        ) : null}

        <div className="text-brand-soft">
          <FluidsFlowSvg
            items={items.map((item) => ({ label: item.label ?? '' }))}
            activeIndex={active}
            onActiveChange={setActive}
          />
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((item, index) => {
            const Icon = ICONS[(item.icon as keyof typeof ICONS) || 'droplet'] ?? Droplet;
            const on = active === index;
            return (
              <button
                key={item.label}
                type="button"
                data-reveal-item
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
                className={cn(
                  'flex flex-col items-center gap-3 text-center transition-opacity duration-300',
                  active !== null && !on && 'opacity-45',
                )}
              >
                <span className="flex size-11 items-center justify-center rounded-full border border-white/15 text-white">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="font-heading text-base font-bold text-white">{item.label}</span>
              </button>
            );
          })}
        </div>

        {note ? (
          <p data-reveal-part className="text-[13px] leading-relaxed text-white/50">
            {note}
          </p>
        ) : null}
      </div>
    </section>
  );
}
