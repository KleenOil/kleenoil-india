import { IndustryCard } from '@/components/cards/IndustryCard';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { DEFAULT_FEATURED_INDUSTRIES } from '@/lib/cms/defaults';

export type FeaturedIndustriesBlockData = {
  blockType: 'featured-industries';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  sourceMode?: 'manual' | 'auto' | null;
  layoutVariant?: 'grid' | 'cards' | null;
  industrySlugs?: Array<{ slug?: string | null; id?: string | null }> | null;
};

type FeaturedIndustriesBlockProps = {
  block?: FeaturedIndustriesBlockData | null;
};

export function FeaturedIndustriesBlock({ block }: FeaturedIndustriesBlockProps) {
  const eyebrow = block?.eyebrow || DEFAULT_FEATURED_INDUSTRIES.eyebrow;
  const heading = block?.heading || DEFAULT_FEATURED_INDUSTRIES.heading;
  const description = block?.description || DEFAULT_FEATURED_INDUSTRIES.description;

  // Industries collection not wired yet — use design fallbacks until CMS data exists.
  const industries = DEFAULT_FEATURED_INDUSTRIES.industries;
  const firstRow = industries.slice(0, 3);
  const secondRow = industries.slice(3, 6);

  return (
    <section className="border-y border-border-subtle bg-surface">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-16 lg:gap-20 lg:px-[100px] lg:py-[140px]">
        <SectionHeader eyebrow={eyebrow} heading={heading} description={description} />

        <div className="flex flex-col gap-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {firstRow.map((industry) => (
              <IndustryCard key={industry.title} industry={industry} />
            ))}
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {secondRow.map((industry) => (
              <IndustryCard key={industry.title} industry={industry} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
