import { TestimonialCard } from '@/components/cards/TestimonialCard';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { blockHasCmsData, cmsList, cmsText } from '@/lib/cms/block-content';
import { DEFAULT_TESTIMONIALS } from '@/lib/cms/defaults';
import { getMediaAlt, getMediaUrl } from '@/lib/cms/links';
import type { Media } from '@/payload-types';

type TestimonialItem = {
  quote?: string | null;
  clientName?: string | null;
  company?: string | null;
  position?: string | null;
  photo?: number | Media | null;
};

export type TestimonialsBlockData = {
  blockType: 'testimonials';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  items?: TestimonialItem[] | null;
};

type TestimonialsBlockProps = {
  block?: TestimonialsBlockData | null;
};

export function TestimonialsBlock({ block }: TestimonialsBlockProps) {
  const hasCms = blockHasCmsData(block);
  const eyebrow = cmsText(block?.eyebrow, DEFAULT_TESTIMONIALS.eyebrow, hasCms);
  const heading = cmsText(block?.heading, DEFAULT_TESTIMONIALS.heading, hasCms);
  const description = cmsText(block?.description, DEFAULT_TESTIMONIALS.description, hasCms);

  const cmsItems =
    block?.items
      ?.filter((item) => item.quote && item.clientName)
      .map((item) => ({
        quote: item.quote!,
        clientName: item.clientName!,
        company: item.company,
        position: item.position,
        imageUrl: getMediaUrl(item.photo),
        imageAlt: getMediaAlt(item.photo, item.clientName || 'Client'),
      })) ?? [];

  const items = cmsList(
    cmsItems,
    DEFAULT_TESTIMONIALS.items.map((item) => ({
      ...item,
      imageUrl: null as string | null,
      imageAlt: item.clientName,
    })),
    hasCms,
    (item) => Boolean(item.quote && item.clientName),
  );

  return (
    <section className="bg-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-16 lg:gap-20 lg:px-[100px] lg:py-[140px]">
        <SectionHeader eyebrow={eyebrow} heading={heading} description={description} />

        <div className="grid gap-6 lg:grid-cols-3">
          {items.map((item) => (
            <TestimonialCard key={item.clientName + item.quote.slice(0, 24)} testimonial={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
