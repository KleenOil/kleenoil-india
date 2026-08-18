import { ServiceCard, type ServiceCardData } from '@/components/cards/ServiceCard';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { DEFAULT_FEATURED_SERVICES } from '@/lib/cms/defaults';
import { resolveLink } from '@/lib/cms/links';

type ServiceCmsCard = {
  tag?: string | null;
  title?: string | null;
  description?: string | null;
  href?: string | null;
  id?: string | null;
};

export type FeaturedServicesBlockData = {
  blockType: 'featured-services';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  cards?: ServiceCmsCard[] | null;
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

function mapCard(card: ServiceCmsCard, index: number): ServiceCardData | null {
  if (!card.title?.trim()) {
    return null;
  }

  const fallback = DEFAULT_FEATURED_SERVICES.services[index];

  return {
    tag: card.tag?.trim() || fallback?.tag || `${String(index + 1).padStart(2, '0')} / SERVICE`,
    title: card.title.trim(),
    description: card.description?.trim() || fallback?.description || '',
    href: card.href?.trim() || '',
  };
}

export function FeaturedServicesBlock({ block }: FeaturedServicesBlockProps) {
  const eyebrow = block?.eyebrow || DEFAULT_FEATURED_SERVICES.eyebrow;
  const heading = block?.heading || DEFAULT_FEATURED_SERVICES.heading;
  const description = block?.description || DEFAULT_FEATURED_SERVICES.description;

  const resolvedCta = resolveLink(block?.cta);
  const sectionCta = resolvedCta
    ? {
        label: resolvedCta.label,
        href: resolvedCta.href,
        appearance: resolvedCta.appearance,
        openInNewTab: resolvedCta.openInNewTab,
      }
    : DEFAULT_FEATURED_SERVICES.cta;

  const cmsCards =
    block?.cards
      ?.map((card, index) => mapCard(card, index))
      .filter((card): card is ServiceCardData => Boolean(card)) ?? [];

  const services = cmsCards.length > 0 ? cmsCards : DEFAULT_FEATURED_SERVICES.services;

  return (
    <section className="border-y border-border-subtle bg-surface">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-16 lg:gap-20 lg:px-[100px] lg:py-[140px]">
        <SectionHeader
          eyebrow={eyebrow}
          heading={heading}
          description={description}
          cta={sectionCta}
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
