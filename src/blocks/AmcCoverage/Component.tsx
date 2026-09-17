'use client';

import { useState } from 'react';
import {
  CalendarCheck,
  Droplets,
  Package,
  Search,
  ShieldCheck,
  Wind,
  Wrench,
  Zap,
} from 'lucide-react';

import { HeadingLines } from '@/components/sustainability/HeadingLines';
import { Eyebrow } from '@/components/ui/eyebrow';
import { blockHasCmsData, cmsList, cmsText } from '@/lib/cms/block-content';
import { DEFAULT_AMC_COVERAGE } from '@/lib/cms/amc';

const ICONS = {
  'calendar-check': CalendarCheck,
  search: Search,
  droplets: Droplets,
  wind: Wind,
  'shield-check': ShieldCheck,
  wrench: Wrench,
  zap: Zap,
  package: Package,
} as const;

type CardItem = { icon?: string | null; title?: string | null; body?: string | null };

export type AmcCoverageBlockData = {
  blockType: 'amc-coverage';
  eyebrow?: string | null;
  heading?: string | null;
  lead?: string | null;
  cards?: CardItem[] | null;
};

export function AmcCoverageBlock({ block }: { block?: AmcCoverageBlockData | null }) {
  const defaults = DEFAULT_AMC_COVERAGE;
  const hasCms = blockHasCmsData(block);
  const eyebrow = cmsText(block?.eyebrow, defaults.eyebrow, hasCms);
  const heading = cmsText(block?.heading, defaults.heading, hasCms);
  const lead = cmsText(block?.lead, defaults.lead, hasCms);
  const [active, setActive] = useState<number | null>(null);
  const cards = cmsList(
    block?.cards,
    defaults.cards,
    hasCms,
    (card): card is CardItem & { title: string; body: string } => Boolean(card.title && card.body),
  );

  return (
    <section className="bg-surface">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-16 lg:px-[100px] lg:py-[120px]">
        <div className="max-w-[760px] space-y-4">
          {eyebrow ? (
            <div data-reveal-part>
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
          ) : null}
          {heading ? (
            <h2 className="font-heading text-[1.75rem] font-bold leading-[1.12] tracking-[-0.03em] text-text-primary md:text-4xl lg:text-[40px]">
              <HeadingLines text={heading} className="block" />
            </h2>
          ) : null}
          {lead ? (
            <p data-reveal-part className="text-base leading-relaxed text-text-secondary">
              {lead}
            </p>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => {
            const Icon = ICONS[(card.icon as keyof typeof ICONS) || 'package'] ?? Package;
            const on = active === index;
            return (
              <article
                key={card.title}
                data-reveal-item
                className="flex flex-col gap-2 rounded-none bg-surface-elevated px-[22px] py-6"
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
              >
                <span className="relative mb-2 flex size-9 items-center justify-center rounded-lg bg-brand-dim text-brand-primary">
                  {on ? (
                    <svg
                      viewBox="0 0 36 36"
                      className="absolute inset-0 size-9 text-brand-primary"
                      aria-hidden
                    >
                      <circle
                        cx="18"
                        cy="18"
                        r="15"
                        fill="none"
                        stroke="currentColor"
                        strokeOpacity="0.45"
                        strokeWidth="1.25"
                        strokeDasharray="6 5"
                        className="amc-ring-spin origin-center"
                      />
                    </svg>
                  ) : null}
                  <Icon className="relative size-[18px]" aria-hidden />
                </span>
                <h3 className="font-heading text-base font-bold text-text-primary">{card.title}</h3>
                <p className="text-[13px] leading-relaxed text-text-secondary">{card.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
