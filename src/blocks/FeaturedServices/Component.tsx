import { IndustryCard, type IndustryCardData } from '@/components/cards/IndustryCard';
import { IndustryViewAllCard } from '@/components/cards/IndustryViewAllCard';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { blockHasCmsData, cmsList, cmsText } from '@/lib/cms/block-content';
import { DEFAULT_FEATURED_INDUSTRIES, DEFAULT_FEATURED_SERVICES } from '@/lib/cms/defaults';
import { getMediaAlt, getMediaUrl, resolveLink, resolvePdfHref } from '@/lib/cms/links';
import type { Media } from '@/payload-types';

type ServiceCmsCard = {
  tag?: string | null;
  title?: string | null;
  description?: string | null;
  image?: number | Media | null;
  href?: string | null;
  pdf?: number | Media | null;
  id?: string | null;
};

type ViewAllFields = {
  tag?: string | null;
  title?: string | null;
  description?: string | null;
  ctaLabel?: string | null;
  href?: string | null;
};

export type FeaturedServicesBlockData = {
  blockType: 'featured-services';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  cards?: ServiceCmsCard[] | null;
  viewAll?: ViewAllFields | null;
  cta?: {
    type?: 'page' | 'custom' | null;
    label?: string | null;
    url?: string | null;
    openInNewTab?: boolean | null;
    page?: number | { slug?: string | null } | null;
    appearance?: 'primary' | 'secondary' | 'ghost' | null;
  } | null;
};

type FeaturedServicesBlockProps = {
  block?: FeaturedServicesBlockData | null;
};

function mapCard(card: ServiceCmsCard, index: number, hasCms: boolean): IndustryCardData | null {
  if (!card.title?.trim()) {
    return null;
  }

  const fallback = hasCms ? undefined : DEFAULT_FEATURED_SERVICES.services[index];
  const resolved = resolvePdfHref({ pdf: card.pdf, href: card.href });
  const href = resolved.href || fallback?.href || '';

  return {
    tag:
      card.tag?.trim() ||
      fallback?.tag ||
      (hasCms ? '' : `${String(index + 1).padStart(2, '0')} / SERVICE`),
    title: card.title.trim(),
    description: card.description?.trim() || fallback?.description || '',
    href,
    openInNewTab: resolved.openInNewTab || Boolean(href && resolved.isPdf),
    isPdf: resolved.isPdf,
    imageUrl: getMediaUrl(card.image) || fallback?.imageUrl || null,
    imageAlt: getMediaAlt(card.image, card.title),
  };
}

export function FeaturedServicesBlock({ block }: FeaturedServicesBlockProps) {
  const hasCms = blockHasCmsData(block);
  const eyebrow = cmsText(block?.eyebrow, DEFAULT_FEATURED_SERVICES.eyebrow, hasCms);
  const heading = cmsText(block?.heading, DEFAULT_FEATURED_SERVICES.heading, hasCms);
  const description = cmsText(block?.description, DEFAULT_FEATURED_SERVICES.description, hasCms);

  const resolvedCta = resolveLink(block?.cta);
  const sectionCta = resolvedCta
    ? {
        label: resolvedCta.label,
        href: resolvedCta.href,
        appearance: resolvedCta.appearance,
        openInNewTab: resolvedCta.openInNewTab,
      }
    : hasCms
      ? undefined
      : DEFAULT_FEATURED_SERVICES.cta;

  const cards = cmsList(
    block?.cards?.map((card, index) => mapCard(card, index, hasCms)).filter(Boolean) as
      IndustryCardData[] | undefined,
    DEFAULT_FEATURED_SERVICES.services.map((service) => ({
      tag: service.tag,
      title: service.title,
      description: service.description,
      href: service.href,
      imageUrl: service.imageUrl,
    })),
    hasCms,
    (): boolean => true,
  ).slice(0, 5);
  const firstRow = cards.slice(0, 3);
  const secondRow = cards.slice(3, 5);

  const viewAllDefaults = DEFAULT_FEATURED_INDUSTRIES.viewAll;
  const viewAll = {
    tag: block?.viewAll?.tag?.trim() || viewAllDefaults.tag,
    title: block?.viewAll?.title?.trim() || viewAllDefaults.title,
    description: block?.viewAll?.description?.trim() || viewAllDefaults.description,
    ctaLabel: block?.viewAll?.ctaLabel?.trim() || viewAllDefaults.ctaLabel,
    href: block?.viewAll?.href?.trim() || viewAllDefaults.href,
  };

  return (
    <section className="border-y border-border-subtle bg-surface">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-16 lg:gap-20 lg:px-[100px] lg:py-[140px]">
        <SectionHeader
          eyebrow={eyebrow}
          heading={heading}
          description={description}
          cta={sectionCta}
        />

        <div className="flex flex-col gap-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {firstRow.map((card) => (
              <IndustryCard key={card.title} industry={card} />
            ))}
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {secondRow.map((card) => (
              <IndustryCard key={card.title} industry={card} />
            ))}
            <IndustryViewAllCard card={viewAll} />
          </div>
        </div>
      </div>
    </section>
  );
}
