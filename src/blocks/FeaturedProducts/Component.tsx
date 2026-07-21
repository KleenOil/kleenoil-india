import { CustomEngineeringCard } from '@/components/cards/CustomEngineeringCard';
import { ProductCard } from '@/components/cards/ProductCard';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { DEFAULT_FEATURED_PRODUCTS } from '@/lib/cms/defaults';
import { resolveLink } from '@/lib/cms/links';

export type FeaturedProductsBlockData = {
  blockType: 'featured-products';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  sourceMode?: 'manual' | 'auto' | null;
  limit?: number | null;
  productSlugs?: Array<{ slug?: string | null; id?: string | null }> | null;
  cta?: {
    type?: 'page' | 'custom' | null;
    label?: string | null;
    url?: string | null;
    openInNewTab?: boolean | null;
    page?: number | { slug?: string | null } | null;
    appearance?: 'primary' | 'secondary' | 'ghost' | null;
  } | null;
};

type FeaturedProductsBlockProps = {
  block?: FeaturedProductsBlockData | null;
};

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

  const customCardHref = sectionCta.href === '/products' ? '/contact' : sectionCta.href;

  // Products collection not wired yet — use design fallbacks until CMS data exists.
  const products = DEFAULT_FEATURED_PRODUCTS.products;
  const primaryRow = products.slice(0, 3);
  const secondaryRow = products.slice(3, 5);

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
            <CustomEngineeringCard href={customCardHref} />
          </div>
        </div>
      </div>
    </section>
  );
}
