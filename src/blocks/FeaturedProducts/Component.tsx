import { CustomEngineeringCard } from '@/components/cards/CustomEngineeringCard';
import { ProductCard, type ProductCardData } from '@/components/cards/ProductCard';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { blockHasCmsData, cmsList, cmsText } from '@/lib/cms/block-content';
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

function mapCard(
  card: FeaturedProductCard,
  index: number,
  hasCms: boolean,
): ProductCardData | null {
  if (!card.title?.trim()) {
    return null;
  }

  return {
    tag: card.tag?.trim() || (hasCms ? '' : `0${(index % 9) + 1} / SYSTEM`),
    title: card.title.trim(),
    description: card.description?.trim() || '',
    href: resolveCardHref(card),
    imageUrl: getMediaUrl(card.image),
    imageAlt: getMediaAlt(card.image, card.title),
  };
}

export function FeaturedProductsBlock({ block }: FeaturedProductsBlockProps) {
  const hasCms = blockHasCmsData(block);
  const defaults = DEFAULT_FEATURED_PRODUCTS;
  const eyebrow = cmsText(block?.eyebrow, defaults.eyebrow, hasCms);
  const heading = cmsText(block?.heading, defaults.heading, hasCms);
  const description = cmsText(block?.description, defaults.description, hasCms);

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
      : defaults.cta;

  const products = cmsList(
    block?.cards?.map((card, index) => mapCard(card, index, hasCms)).filter(Boolean) as
      ProductCardData[] | undefined,
    defaults.products,
    hasCms,
    (): boolean => true,
  );
  const primaryRow = products.slice(0, 3);
  const secondaryRow = products.slice(3, 5);

  const customEngineering = hasCms
    ? {
        tag: block?.customEngineering?.tag?.trim() || '',
        title: block?.customEngineering?.title?.trim() || '',
        description: block?.customEngineering?.description?.trim() || '',
        ctaLabel: block?.customEngineering?.ctaLabel?.trim() || '',
        href: block?.customEngineering?.href?.trim() || '',
      }
    : {
        ...defaults.customEngineering,
        ...(block?.customEngineering ?? {}),
        href: block?.customEngineering
          ? block.customEngineering.href?.trim() || ''
          : defaults.customEngineering.href,
      };
  const showCustomEngineering = Boolean(
    customEngineering.tag ||
    customEngineering.title ||
    customEngineering.description ||
    customEngineering.ctaLabel,
  );

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
            {showCustomEngineering ? <CustomEngineeringCard card={customEngineering} /> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
