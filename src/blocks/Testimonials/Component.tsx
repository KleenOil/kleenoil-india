import { TestimonialCard } from '@/components/cards/TestimonialCard';
import { SectionHeader } from '@/components/sections/SectionHeader';
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
  const eyebrow = block?.eyebrow || DEFAULT_TESTIMONIALS.eyebrow;
  const heading = block?.heading || DEFAULT_TESTIMONIALS.heading;
  const description = block?.description || DEFAULT_TESTIMONIALS.description;

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

  const items = cmsItems.length > 0 ? cmsItems : DEFAULT_TESTIMONIALS.items;

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
