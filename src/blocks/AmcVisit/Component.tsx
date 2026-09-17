'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CircleCheck, Droplet, Truck } from 'lucide-react';

import { AmcVisitPathSvg } from '@/components/amc/AmcVisitPathSvg';
import { HeadingLines } from '@/components/sustainability/HeadingLines';
import { Eyebrow } from '@/components/ui/eyebrow';
import { blockHasCmsData, cmsList, cmsText } from '@/lib/cms/block-content';
import { DEFAULT_AMC_VISIT } from '@/lib/cms/amc';
import { getMediaAlt, getMediaUrl } from '@/lib/cms/links';
import type { Media } from '@/payload-types';

const ICONS = {
  truck: Truck,
  droplet: Droplet,
  'circle-check': CircleCheck,
} as const;

type StepItem = {
  n?: string | null;
  icon?: string | null;
  title?: string | null;
  body?: string | null;
  image?: number | Media | null;
};

export type AmcVisitBlockData = {
  blockType: 'amc-visit';
  eyebrow?: string | null;
  heading?: string | null;
  steps?: StepItem[] | null;
};

export function AmcVisitBlock({ block }: { block?: AmcVisitBlockData | null }) {
  const defaults = DEFAULT_AMC_VISIT;
  const hasCms = blockHasCmsData(block);
  const eyebrow = cmsText(block?.eyebrow, defaults.eyebrow, hasCms);
  const heading = cmsText(block?.heading, defaults.heading, hasCms);
  const [active, setActive] = useState<number | null>(null);
  const steps = cmsList(
    block?.steps?.map((step, index) => {
      const fallback = hasCms ? undefined : defaults.steps[index];
      if (!step.title?.trim() || !step.body?.trim()) return null;
      return {
        n: step.n?.trim() || fallback?.n || String(index + 1).padStart(2, '0'),
        icon: step.icon || fallback?.icon || 'droplet',
        title: step.title.trim(),
        body: step.body.trim(),
        imageUrl: getMediaUrl(step.image) || fallback?.imageUrl || null,
        imageAlt: getMediaAlt(step.image, step.title),
      };
    }),
    defaults.steps,
    hasCms,
    (step) => Boolean(step.title && step.body),
  );

  return (
    <section className="bg-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-16 lg:px-[100px] lg:py-[100px]">
        <div className="max-w-[720px] space-y-4">
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
        </div>

        <div className="text-brand-primary">
          <AmcVisitPathSvg activeIndex={active} />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = ICONS[(step.icon as keyof typeof ICONS) || 'droplet'] ?? Droplet;
            return (
              <article
                key={step.title}
                data-reveal-item
                className="flex flex-col gap-4"
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
              >
                <div className="relative h-[220px] overflow-hidden rounded-2xl">
                  {step.imageUrl ? (
                    <Image
                      src={step.imageUrl}
                      alt={step.imageAlt || step.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 33vw, 100vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-surface" />
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-brand-dim text-brand-primary">
                    <Icon className="size-7" aria-hidden />
                  </span>
                  <p className="font-heading text-[13px] font-bold text-brand-primary">{step.n}</p>
                </div>
                <h3 className="font-heading text-[22px] font-bold tracking-[-0.03em] text-text-primary">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">{step.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
