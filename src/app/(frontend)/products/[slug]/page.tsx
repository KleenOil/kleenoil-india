import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PdpRenderBlocks } from '@/blocks/pdp/PdpRenderBlocks';
import { HomepageMotion } from '@/components/motion/HomepageMotion';
import { getMediaUrl } from '@/lib/cms/links';
import { getProductBySlug, getResolvedPdpLayout } from '@/lib/cms/products';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: 'Product not found' };
  }

  return {
    title: product.seo?.metaTitle || product.name,
    description: product.seo?.metaDescription || product.shortDescription || undefined,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const layout = await getResolvedPdpLayout(product);

  return (
    <HomepageMotion>
      <PdpRenderBlocks
        blocks={layout}
        productName={product.name}
        featuredImageUrl={getMediaUrl(product.featuredImage)}
        motion
      />
    </HomepageMotion>
  );
}
