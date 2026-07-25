import type { Metadata } from 'next';

import { ProductCard } from '@/components/cards/ProductCard';
import { Eyebrow } from '@/components/ui/eyebrow';
import { getMediaUrl } from '@/lib/cms/links';
import { getPublishedProducts } from '@/lib/cms/products';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Industrial filtration systems engineered for maximum equipment life.',
};

export default async function ProductsIndexPage() {
  const products = await getPublishedProducts();

  return (
    <section className="bg-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-16 lg:px-[100px] lg:py-[100px]">
        <div className="max-w-[720px] space-y-4">
          <Eyebrow>PRODUCT CATALOGUE</Eyebrow>
          <h1 className="font-heading text-4xl font-bold tracking-[-0.04em] text-text-primary lg:text-5xl">
            Filtration systems for every operational reality.
          </h1>
          <p className="text-lg text-text-secondary">
            Explore Kleenoil platforms for bypass filtration, dehydration and fluid conditioning.
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={{
                  tag: `0${(index % 9) + 1} / SYSTEM`,
                  title: product.name,
                  description: product.shortDescription || '',
                  href: `/products/${product.slug}`,
                  imageUrl: getMediaUrl(product.featuredImage),
                }}
              />
            ))}
          </div>
        ) : (
          <div className="surface-panel rounded-2xl p-10 text-center">
            <p className="font-heading text-xl font-bold text-text-primary">
              No products published yet
            </p>
            <p className="mt-2 text-text-secondary">
              Create a Product Template, then publish a Product in the CMS.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
