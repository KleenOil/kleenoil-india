'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Gauge, Headphones, Package, ShieldCheck, Timer } from 'lucide-react';

import { AmcContractSpineSvg } from '@/components/amc/AmcContractSpineSvg';
import { HeadingLines } from '@/components/sustainability/HeadingLines';
import { blockHasCmsData, cmsList, cmsText } from '@/lib/cms/block-content';
import { DEFAULT_AMC_WHY } from '@/lib/cms/amc';
import { getMediaAlt, getMediaUrl } from '@/lib/cms/links';
import type { Media } from '@/payload-types';

const ICONS = {
  gauge: Gauge,
  timer: Timer,
  headphones: Headphones,
  'shield-check': ShieldCheck,
  package: Package,
} as const;

type BenefitItem = {
  n?: string | null;
  icon?: string | null;
  title?: string | null;
  body?: string | null;
};

export type AmcWhyBlockData = {
  blockType: 'amc-why';
  kicker?: string | null;
  heading?: string | null;
  lead?: string | null;
  image?: number | Media | null;
  items?: BenefitItem[] | null;
};

export function AmcWhyBlock({ block }: { block?: AmcWhyBlockData | null }) {
  const defaults = DEFAULT_AMC_WHY;
  const hasCms = blockHasCmsData(block);
  const kicker = cmsText(block?.kicker, defaults.kicker, hasCms);
  const heading = cmsText(block?.heading, defaults.heading, hasCms);
  const lead = cmsText(block?.lead, defaults.lead, hasCms);
  const [active, setActive] = useState<number | null>(null);
  const items = cmsList(
    block?.items,
    defaults.items,
    hasCms,
    (item): item is BenefitItem & { n: string; title: string; body: string } =>
      Boolean(item.n && item.title && item.body),
  );
  const imageUrl = cmsText(getMediaUrl(block?.image), defaults.imageUrl, hasCms);
  const imageAlt = getMediaAlt(block?.image, heading || (hasCms ? '' : defaults.imageAlt));

  return (
    <section className="bg-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-14 px-6 py-16 lg:px-[100px] lg:py-[120px]">
        <div className="flex flex-col items-end gap-12 lg:flex-row">
          <div className="max-w-[772px] flex-1 space-y-[18px]">
            {kicker ? (
              <p
                data-reveal-part
                className="font-mono text-[12px] font-bold tracking-[1.8px] text-brand-primary uppercase"
              >
                {kicker}
              </p>
            ) : null}
            {heading ? (
              <h2 className="font-heading text-[1.75rem] font-bold leading-[1.12] tracking-[-0.03em] text-text-primary md:text-4xl lg:text-[40px]">
                <HeadingLines text={heading} className="block" />
              </h2>
            ) : null}
            {lead ? (
              <p
                data-reveal-part
                className="max-w-[772px] text-base leading-relaxed text-text-secondary"
              >
                {lead}
              </p>
            ) : null}
          </div>
          {imageUrl ? (
            <div className="relative h-[220px] w-full overflow-hidden rounded-2xl lg:h-[280px] lg:w-[420px] lg:shrink-0">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 420px, 100vw"
              />
            </div>
          ) : null}
        </div>

        <div className="flex gap-6 text-brand-primary">
          <AmcContractSpineSvg count={items.length} activeIndex={active} />
          <div className="min-w-0 flex-1">
            {items.map((item, index) => {
              const Icon = ICONS[(item.icon as keyof typeof ICONS) || 'gauge'] ?? Gauge;
              return (
                <article
                  key={item.title}
                  data-reveal-item
                  className="flex items-start gap-8 border-b border-border-subtle py-7 first:pt-0 last:border-b-0 last:pb-0"
                  onMouseEnter={() => setActive(index)}
                  onMouseLeave={() => setActive(null)}
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <p className="w-6 shrink-0 font-heading text-lg font-bold text-brand-primary">
                    {item.n}
                  </p>
                  <div className="min-w-0 flex-1 space-y-2">
                    <h3 className="font-heading text-[22px] font-bold tracking-[-0.03em] text-text-primary">
                      {item.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-text-secondary">{item.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
