import Image from 'next/image';

import { TimelineItem } from '@/components/cards/TimelineItem';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { blockHasCmsData, cmsList, cmsText } from '@/lib/cms/block-content';
import { DEFAULT_ABOUT_STORY } from '@/lib/cms/defaults';
import { getMediaUrl } from '@/lib/cms/links';
import type { Media } from '@/payload-types';

type TimelineEntry = {
  year?: string | null;
  label?: string | null;
  title?: string | null;
  description?: string | null;
};

export type AboutStoryBlockData = {
  blockType: 'about-story';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  quote?: string | null;
  quoteAuthor?: string | null;
  quoteRole?: string | null;
  image?: number | Media | null;
  timeline?: TimelineEntry[] | null;
};

type AboutStoryBlockProps = {
  block?: AboutStoryBlockData | null;
};

export function AboutStoryBlock({ block }: AboutStoryBlockProps) {
  const hasCms = blockHasCmsData(block);
  const eyebrow = cmsText(block?.eyebrow, DEFAULT_ABOUT_STORY.eyebrow, hasCms);
  const heading = cmsText(block?.heading, DEFAULT_ABOUT_STORY.heading, hasCms);
  const description = cmsText(block?.description, DEFAULT_ABOUT_STORY.description, hasCms);
  const quote = cmsText(block?.quote, DEFAULT_ABOUT_STORY.quote, hasCms);
  const quoteAuthor = cmsText(block?.quoteAuthor, DEFAULT_ABOUT_STORY.quoteAuthor, hasCms);
  const quoteRole = cmsText(block?.quoteRole, DEFAULT_ABOUT_STORY.quoteRole, hasCms);

  const imageUrl = cmsText(getMediaUrl(block?.image) ?? '', DEFAULT_ABOUT_STORY.imageUrl, hasCms);

  const timeline = cmsList(
    block?.timeline
      ?.filter((item) => item.title)
      .map((item) => ({
        year: item.year || '',
        label: item.label || '',
        title: item.title!,
        description: item.description || '',
      })),
    DEFAULT_ABOUT_STORY.timeline,
    hasCms,
    (item) => Boolean(item.title),
  );

  return (
    <section className="bg-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-6 py-16 lg:gap-24 lg:px-[100px] lg:py-[160px]">
        <SectionHeader eyebrow={eyebrow} heading={heading} description={description} />

        <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
          <div data-reveal-column className="flex w-full flex-col gap-8 lg:max-w-[520px]">
            {imageUrl ? (
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-border-subtle bg-brand-soft">
                <Image
                  src={imageUrl}
                  alt="Kleenoil engineering heritage"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 520px"
                />
              </div>
            ) : null}

            {quote || quoteAuthor || quoteRole ? (
              <blockquote className="surface-card rounded-2xl border-l-2 border-brand-primary bg-surface-elevated/88 p-7">
                {quote ? (
                  <p className="font-heading text-lg font-semibold leading-snug text-text-primary md:text-[22px]">
                    &ldquo;{quote}&rdquo;
                  </p>
                ) : null}
                {quoteAuthor || quoteRole ? (
                  <footer className="mt-5 flex flex-col gap-0.5">
                    {quoteAuthor ? (
                      <cite className="font-heading text-sm font-medium not-italic text-text-primary">
                        {quoteAuthor}
                      </cite>
                    ) : null}
                    {quoteRole ? (
                      <span className="font-mono text-[10px] tracking-[1.2px] text-text-tertiary uppercase">
                        {quoteRole}
                      </span>
                    ) : null}
                  </footer>
                ) : null}
              </blockquote>
            ) : null}
          </div>

          <div className="flex flex-1 flex-col gap-8 lg:gap-12">
            {timeline.map((item) => (
              <TimelineItem key={`${item.year}-${item.title}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
