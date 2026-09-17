import Image from 'next/image';
import { Atom, Cylinder, RefreshCw, Shield } from 'lucide-react';

import { HeadingLines } from '@/components/sustainability/HeadingLines';
import { Eyebrow } from '@/components/ui/eyebrow';
import { blockHasCmsData, cmsList, cmsText } from '@/lib/cms/block-content';
import { getMediaAlt, getMediaUrl } from '@/lib/cms/links';
import { DEFAULT_SERVICES_PROGRAM } from '@/lib/cms/services';
import type { Media } from '@/payload-types';

const ICONS = {
  atom: Atom,
  shield: Shield,
  cylinder: Cylinder,
  'refresh-cw': RefreshCw,
} as const;

type QuestionItem = {
  n?: string | null;
  icon?: string | null;
  title?: string | null;
  body?: string | null;
};

type CommitmentItem = {
  n?: string | null;
  title?: string | null;
  body?: string | null;
};

export type ServicesProgramBlockData = {
  blockType: 'services-program';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  processImage?: number | Media | null;
  questions?: QuestionItem[] | null;
  focusKicker?: string | null;
  focusHeading?: string | null;
  focusBody?: string | null;
  focusImage?: number | Media | null;
  commitments?: CommitmentItem[] | null;
};

export function ServicesProgramBlock({ block }: { block?: ServicesProgramBlockData | null }) {
  const defaults = DEFAULT_SERVICES_PROGRAM;
  const hasCms = blockHasCmsData(block);
  const eyebrow = cmsText(block?.eyebrow, defaults.eyebrow, hasCms);
  const heading = cmsText(block?.heading, defaults.heading, hasCms);
  const lead = cmsText(block?.description, defaults.lead, hasCms);
  const questions = cmsList(
    block?.questions,
    defaults.questions,
    hasCms,
    (item): item is QuestionItem & { n: string; title: string; body: string } =>
      Boolean(item.n && item.title && item.body),
  );
  const commitments = cmsList(
    block?.commitments,
    defaults.commitments,
    hasCms,
    (item): item is CommitmentItem & { n: string; title: string; body: string } =>
      Boolean(item.n && item.title && item.body),
  );
  const focusKicker = cmsText(block?.focusKicker, defaults.focusKicker, hasCms);
  const focusHeading = cmsText(block?.focusHeading, defaults.focusHeading, hasCms);
  const focusBody = cmsText(block?.focusBody, defaults.focusBody, hasCms);
  const processUrl = cmsText(getMediaUrl(block?.processImage), defaults.processImageUrl, hasCms);
  const processAlt = getMediaAlt(
    block?.processImage,
    hasCms ? heading || '' : defaults.processImageAlt,
  );
  const focusUrl = cmsText(getMediaUrl(block?.focusImage), defaults.focusImageUrl, hasCms);
  const focusAlt = getMediaAlt(
    block?.focusImage,
    hasCms ? focusHeading || '' : defaults.focusImageAlt,
  );

  return (
    <section id="program" className="bg-background">
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
          {lead ? (
            <p
              data-reveal-part
              className="max-w-[640px] text-base leading-relaxed text-text-secondary"
            >
              {lead}
            </p>
          ) : null}
        </div>

        {processUrl ? (
          <div
            data-reveal-panel
            className="relative h-[200px] overflow-hidden rounded-2xl lg:h-[240px]"
          >
            <Image src={processUrl} alt={processAlt} fill className="object-cover" sizes="100vw" />
          </div>
        ) : null}

        {questions.length ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {questions.map((item) => {
              const Icon = ICONS[(item.icon as keyof typeof ICONS) || 'atom'] ?? Atom;
              return (
                <article
                  key={item.title}
                  data-reveal-item
                  className="flex flex-col gap-4 rounded-2xl border border-border-subtle bg-surface-elevated/90 p-6"
                >
                  <span className="flex size-11 items-center justify-center rounded-lg bg-brand-soft text-brand-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <p className="font-mono text-[13px] font-bold tracking-[1.4px] text-brand-primary">
                    {item.n}
                  </p>
                  <h3 className="font-heading text-lg font-bold tracking-[-0.03em] text-text-primary">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">{item.body}</p>
                </article>
              );
            })}
          </div>
        ) : null}

        <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div className="flex flex-col gap-6">
            {focusUrl ? (
              <div className="relative h-[240px] overflow-hidden rounded-2xl">
                <Image src={focusUrl} alt={focusAlt} fill className="object-cover" sizes="40vw" />
              </div>
            ) : null}
            {focusKicker ? (
              <p className="font-mono text-[12px] font-bold tracking-[1.8px] text-brand-primary uppercase">
                {focusKicker}
              </p>
            ) : null}
            {focusHeading ? (
              <h3 className="font-heading text-[28px] font-bold leading-[1.1] tracking-[-0.04em] text-text-primary">
                {focusHeading}
              </h3>
            ) : null}
            {focusBody ? (
              <p className="max-w-[420px] text-[15px] leading-relaxed text-text-secondary">
                {focusBody}
              </p>
            ) : null}
          </div>

          <ol className="flex flex-col">
            {commitments.map((item, index) => (
              <li
                key={item.title}
                data-reveal-item
                className="flex gap-5 border-t border-border-subtle py-5 first:border-t-0"
              >
                <span className="font-mono text-[13px] font-bold tracking-[1.4px] text-brand-primary">
                  {item.n}
                </span>
                <div className="space-y-1">
                  <h4 className="font-heading text-lg font-bold text-text-primary">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-text-secondary">{item.body}</p>
                </div>
                <span className="sr-only">
                  Step {index + 1} of {commitments.length}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
