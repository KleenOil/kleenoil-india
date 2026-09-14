import { IndustryCard, type IndustryCardData } from '@/components/cards/IndustryCard';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { blockHasCmsData, cmsList, cmsText } from '@/lib/cms/block-content';
import { DEFAULT_FEATURED_INDUSTRIES } from '@/lib/cms/defaults';
import { getMediaAlt, getMediaUrl } from '@/lib/cms/links';
import type { Media } from '@/payload-types';

type IndustryCmsCard = {
  tag?: string | null;
  title?: string | null;
  description?: string | null;
  image?: number | Media | null;
  href?: string | null;
  id?: string | null;
};

export type FeaturedIndustriesBlockData = {
  blockType: 'featured-industries';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  cards?: IndustryCmsCard[] | null;
};

type FeaturedIndustriesBlockProps = {
  block?: FeaturedIndustriesBlockData | null;
};

function mapCard(card: IndustryCmsCard, index: number, hasCms: boolean): IndustryCardData | null {
  if (!card.title?.trim()) {
    return null;
  }

  const fallback = hasCms ? undefined : DEFAULT_FEATURED_INDUSTRIES.industries[index];

  return {
    tag:
      card.tag?.trim() ||
      fallback?.tag ||
      (hasCms ? '' : `${String(index + 1).padStart(2, '0')} / INDUSTRY`),
    title: card.title.trim(),
    description: card.description?.trim() || fallback?.description || '',
    href: card.href?.trim() || '',
    imageUrl: getMediaUrl(card.image) || fallback?.imageUrl || null,
    imageAlt: getMediaAlt(card.image, card.title),
  };
}

export function FeaturedIndustriesBlock({ block }: FeaturedIndustriesBlockProps) {
  const hasCms = blockHasCmsData(block);
  const eyebrow = cmsText(block?.eyebrow, DEFAULT_FEATURED_INDUSTRIES.eyebrow, hasCms);
  const heading = cmsText(block?.heading, DEFAULT_FEATURED_INDUSTRIES.heading, hasCms);
  const description = cmsText(block?.description, DEFAULT_FEATURED_INDUSTRIES.description, hasCms);

  const industries = cmsList(
    block?.cards?.map((card, index) => mapCard(card, index, hasCms)).filter(Boolean) as
      IndustryCardData[] | undefined,
    DEFAULT_FEATURED_INDUSTRIES.industries,
    hasCms,
    (): boolean => true,
  );
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
          {secondRow.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-3">
              {secondRow.map((industry) => (
                <IndustryCard key={industry.title} industry={industry} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
