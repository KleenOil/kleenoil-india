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
    <section className="bg-background">
      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:px-[100px] lg:py-[80px]">
        <div
          data-reveal-panel
          className="relative min-h-[320px] overflow-hidden rounded-3xl bg-brand-deep lg:min-h-[420px]"
        >
          {imageUrl ? (
            <Image src={imageUrl} alt={imageAlt} fill className="object-cover" sizes="50vw" />
          ) : null}
        </div>

        <div className="flex max-w-[520px] flex-col gap-5">
          <div data-reveal-part>
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <h2 className="font-heading text-[1.75rem] font-bold leading-[1.05] tracking-[-0.04em] text-text-primary md:text-4xl lg:text-[44px]">
            <HeadingLines text={heading} className="block" />
          </h2>
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              data-reveal-part
              className="text-[15px] leading-relaxed text-text-secondary"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
