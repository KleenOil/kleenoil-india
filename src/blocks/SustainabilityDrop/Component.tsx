import Image from 'next/image';

import { HeadingLines } from '@/components/sustainability/HeadingLines';
import { Eyebrow } from '@/components/ui/eyebrow';
import { getMediaAlt, getMediaUrl } from '@/lib/cms/links';
import { DEFAULT_SUSTAINABILITY_DROP } from '@/lib/cms/sustainability';
import type { Media } from '@/payload-types';

type ParagraphItem = { text?: string | null };

export type SustainabilityDropBlockData = {
  blockType: 'sustainability-drop';
  eyebrow?: string | null;
  heading?: string | null;
  paragraphs?: ParagraphItem[] | null;
  image?: number | Media | null;
};

export function SustainabilityDropBlock({ block }: { block?: SustainabilityDropBlockData | null }) {
  const defaults = DEFAULT_SUSTAINABILITY_DROP;
  const eyebrow = block?.eyebrow || defaults.eyebrow;
  const heading = block?.heading || defaults.heading;
  const cmsParagraphs =
    block?.paragraphs?.map((item) => item.text).filter((text): text is string => Boolean(text)) ??
    [];
  const paragraphs = cmsParagraphs.length ? cmsParagraphs : defaults.paragraphs;
  const imageUrl = getMediaUrl(block?.image) || defaults.imageUrl;
  const imageAlt = getMediaAlt(block?.image, defaults.imageAlt);

  return (
    <section className="grid overflow-hidden bg-background lg:grid-cols-2">
      <div
        data-reveal-panel
        className="relative min-h-[320px] bg-brand-deep md:min-h-[420px] lg:min-h-[560px]"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        ) : null}
      </div>

      <div className="flex flex-col justify-center gap-5 px-6 py-16 md:px-12 lg:px-[72px] lg:py-[88px]">
        <div data-reveal-part>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <h2 className="max-w-[568px] font-heading text-[1.75rem] font-bold leading-[1.05] tracking-[-0.04em] text-text-primary md:text-4xl lg:text-[44px]">
          <HeadingLines text={heading} className="block" />
        </h2>
        <span aria-hidden className="motion-line-grow h-0.5 w-10 bg-brand-primary" />
        {paragraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 24)}
            data-reveal-part
            className="max-w-[568px] text-[15px] leading-relaxed text-text-secondary"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
