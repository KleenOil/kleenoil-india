import { CustomEngineeringCard } from '@/components/cards/CustomEngineeringCard';
import { ProductCard, type ProductCardData } from '@/components/cards/ProductCard';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { DEFAULT_FEATURED_PRODUCTS } from '@/lib/cms/defaults';
import { getMediaAlt, getMediaUrl, resolveLink } from '@/lib/cms/links';
import type { Media, Product } from '@/payload-types';

type FeaturedProductCard = {
  tag?: string | null;
  title?: string | null;
  description?: string | null;
  image?: number | Media | null;
  product?: number | Product | null;
  href?: string | null;
  id?: string | null;
};

type CustomEngineeringFields = {
  tag?: string | null;
  title?: string | null;
  description?: string | null;
  ctaLabel?: string | null;
  href?: string | null;
};

export type FeaturedProductsBlockData = {
  blockType: 'featured-products';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  cta?: {
    type?: 'page' | 'custom' | null;
    label?: string | null;
    url?: string | null;
    openInNewTab?: boolean | null;
    page?: number | { slug?: string | null } | null;
    appearance?: 'primary' | 'secondary' | 'ghost' | null;
  } | null;
  cards?: FeaturedProductCard[] | null;
  customEngineering?: CustomEngineeringFields | null;
};

type FeaturedProductsBlockProps = {
  block?: FeaturedProductsBlockData | null;
};

function resolveCardHref(card: FeaturedProductCard): string {
  if (card.product && typeof card.product === 'object' && card.product.slug) {
    return `/products/${card.product.slug}`;
  }

  if (typeof card.href === 'string' && card.href.trim()) {
    return card.href.trim();
  }

  return '';
}

function mapCard(card: FeaturedProductCard, index: number): ProductCardData | null {
  if (!card.title?.trim()) {
    return null;
  }

  return {
    tag: card.tag?.trim() || `0${(index % 9) + 1} / SYSTEM`,
    title: card.title.trim(),
    description: card.description?.trim() || '',
    href: resolveCardHref(card),
    imageUrl: getMediaUrl(card.image),
    imageAlt: getMediaAlt(card.image, card.title),
  };
}

export function FeaturedProductsBlock({ block }: FeaturedProductsBlockProps) {
  const eyebrow = block?.eyebrow || DEFAULT_FEATURED_PRODUCTS.eyebrow;
  const heading = block?.heading || DEFAULT_FEATURED_PRODUCTS.heading;
  const description = block?.description || DEFAULT_FEATURED_PRODUCTS.description;

  const resolvedCta = resolveLink(block?.cta);
  const sectionCta = resolvedCta
    ? {
        label: resolvedCta.label,
        href: resolvedCta.href,
        appearance: resolvedCta.appearance,
        openInNewTab: resolvedCta.openInNewTab,
      }
    : DEFAULT_FEATURED_PRODUCTS.cta;

  const cmsCards =
    block?.cards
      ?.map((card, index) => mapCard(card, index))
      .filter((card): card is ProductCardData => Boolean(card)) ?? [];

  const products = cmsCards.length > 0 ? cmsCards : DEFAULT_FEATURED_PRODUCTS.products;
  const primaryRow = products.slice(0, 3);
  const secondaryRow = products.slice(3, 5);

  const customEngineering = {
    ...DEFAULT_FEATURED_PRODUCTS.customEngineering,
    ...(block?.customEngineering ?? {}),
    href: block?.customEngineering
      ? block.customEngineering.href?.trim() || ''
      : DEFAULT_FEATURED_PRODUCTS.customEngineering.href,
  };

  return (
    <section className="bg-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-16 lg:gap-20 lg:px-[100px] lg:py-[140px]">
        <SectionHeader
          eyebrow={eyebrow}
          heading={heading}
          description={description}
          cta={sectionCta}
        />

        <div className="flex flex-col gap-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {primaryRow.map((product) => (
              <ProductCard key={product.title} product={product} />
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {secondaryRow.map((product) => (
              <ProductCard key={product.title} product={product} />
            ))}
            <CustomEngineeringCard card={customEngineering} />
          </div>
        </div>
      </div>
    </section>
  );
}
