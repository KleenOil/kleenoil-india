'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CircleCheck, Droplet, Truck } from 'lucide-react';

import { VisitPathSvg } from '@/components/services/VisitPathSvg';
import { HeadingLines } from '@/components/sustainability/HeadingLines';
import { Eyebrow } from '@/components/ui/eyebrow';
import { blockHasCmsData, cmsList, cmsText } from '@/lib/cms/block-content';
import { getMediaAlt, getMediaUrl } from '@/lib/cms/links';
import { DEFAULT_SERVICES_VISIT } from '@/lib/cms/services';
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

export type ServicesVisitBlockData = {
  blockType: 'services-visit';
  eyebrow?: string | null;
  heading?: string | null;
  steps?: StepItem[] | null;
};

export function ServicesVisitBlock({ block }: { block?: ServicesVisitBlockData | null }) {
  const defaults = DEFAULT_SERVICES_VISIT;
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
    <section id="visit" className="bg-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 py-16 lg:px-[100px] lg:py-[100px]">
        <div className="max-w-[760px] space-y-4">
          {eyebrow ? (
            <div data-reveal-part>
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
          ) : null}
          {heading ? (
            <h2 className="font-heading text-[1.75rem] font-bold leading-[1.05] tracking-[-0.04em] text-text-primary md:text-4xl lg:text-[40px]">
              <HeadingLines text={heading} className="block" />
            </h2>
          ) : null}
        </div>

        <div className="text-brand-primary">
          <VisitPathSvg activeIndex={active} />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = ICONS[(step.icon as keyof typeof ICONS) || 'droplet'] ?? Droplet;
            return (
              <article
                key={step.title}
                data-reveal-item
                className="flex flex-col gap-5"
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
                  ) : null}
                </div>
                <span className="flex size-11 items-center justify-center rounded-full bg-brand-soft text-brand-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <p className="font-mono text-[13px] font-bold tracking-[1.4px] text-brand-primary">
                  {step.n}
                </p>
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
