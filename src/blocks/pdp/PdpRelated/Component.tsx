import { ProductCard } from '@/components/cards/ProductCard';
import { Eyebrow } from '@/components/ui/eyebrow';
import { DEFAULT_PDP_RELATED } from '@/lib/cms/pdp-defaults';
import { getMediaUrl } from '@/lib/cms/links';
import type { Media, Product } from '@/payload-types';

type ManualCard = {
  title?: string | null;
  description?: string | null;
  href?: string | null;
  image?: number | Media | null;
};

export type PdpRelatedBlockData = {
  blockType: 'pdp-related';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  products?: (number | Product)[] | null;
  cards?: ManualCard[] | null;
};

export function PdpRelatedBlock({ block }: { block?: PdpRelatedBlockData | null }) {
  const eyebrow = block?.eyebrow || DEFAULT_PDP_RELATED.eyebrow;
  const heading = block?.heading || DEFAULT_PDP_RELATED.heading;
  const description = block?.description || DEFAULT_PDP_RELATED.description;

  const relatedProducts =
    block?.products
      ?.filter(
        (item): item is Product => typeof item === 'object' && item !== null && 'slug' in item,
      )
      .map((product, index) => ({
        tag: `0${index + 1} / SYSTEM`,
        title: product.name,
        description: product.shortDescription || '',
        href: `/products/${product.slug}`,
        imageUrl: getMediaUrl(product.featuredImage),
      })) ?? [];

  const manualCards =
    block?.cards
      ?.filter((card) => card.title)
      .map((card, index) => ({
        tag: `0${index + 1} / SYSTEM`,
        title: card.title!,
        description: card.description || '',
        href: card.href || '/products',
        imageUrl: getMediaUrl(card.image),
      })) ?? [];

  const cards =
    relatedProducts.length > 0
      ? relatedProducts
      : manualCards.length > 0
        ? manualCards
        : DEFAULT_PDP_RELATED.cards.map((card, index) => ({
            tag: `0${index + 1} / SYSTEM`,
            title: card.title,
            description: card.description,
            href: card.href,
            imageUrl: null as string | null,
          }));

  return (
    <section className="bg-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-16 lg:px-[100px] lg:py-[100px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[640px] space-y-4">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="font-heading text-3xl font-bold leading-[1.08] tracking-[-0.04em] text-text-primary lg:text-[40px]">
              {heading.split('\n').map((line, index) => (
                <span key={`${line}-${index}`} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>
          <p className="max-w-[420px] text-[15px] leading-relaxed text-text-secondary">
            {description}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <ProductCard key={card.href + card.title} product={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
