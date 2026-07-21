import Image from 'next/image';

import { TimelineItem } from '@/components/cards/TimelineItem';
import { SectionHeader } from '@/components/sections/SectionHeader';
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
  const eyebrow = block?.eyebrow || DEFAULT_ABOUT_STORY.eyebrow;
  const heading = block?.heading || DEFAULT_ABOUT_STORY.heading;
  const description = block?.description || DEFAULT_ABOUT_STORY.description;
  const quote = block?.quote || DEFAULT_ABOUT_STORY.quote;
  const quoteAuthor = block?.quoteAuthor || DEFAULT_ABOUT_STORY.quoteAuthor;
  const quoteRole = block?.quoteRole || DEFAULT_ABOUT_STORY.quoteRole;

  const imageUrl = getMediaUrl(block?.image) || DEFAULT_ABOUT_STORY.imageUrl;

  const timeline = block?.timeline?.filter((item) => item.title)?.length
    ? block.timeline
        .filter((item) => item.title)
        .map((item) => ({
          year: item.year || '',
          label: item.label || '',
          title: item.title!,
          description: item.description || '',
        }))
    : DEFAULT_ABOUT_STORY.timeline;

  return (
    <section className="bg-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-6 py-16 lg:gap-24 lg:px-[100px] lg:py-[160px]">
        <SectionHeader eyebrow={eyebrow} heading={heading} description={description} />

        <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
          <div data-reveal-column className="flex w-full flex-col gap-8 lg:max-w-[520px]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-border-subtle bg-brand-soft">
              <Image
                src={imageUrl}
                alt="Kleenoil engineering heritage"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 520px"
              />
            </div>

            <blockquote className="surface-card rounded-2xl border-l-2 border-brand-primary bg-surface-elevated/88 p-7">
              <p className="font-heading text-[22px] font-semibold leading-snug text-text-primary">
                &ldquo;{quote}&rdquo;
              </p>
              <footer className="mt-5 flex flex-col gap-0.5">
                <cite className="font-heading text-sm font-medium not-italic text-text-primary">
                  {quoteAuthor}
                </cite>
                <span className="font-mono text-[10px] tracking-[1.2px] text-text-tertiary uppercase">
                  {quoteRole}
                </span>
              </footer>
            </blockquote>
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
