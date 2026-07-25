import { getPayloadClient } from '@/lib/payload';
import { resolvePdpLayout, type PdpLayoutBlock } from '@/lib/cms/resolve-pdp-layout';
import type { Product, ProductTemplate } from '@/payload-types';

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!slug) {
    return null;
  }

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'products',
      where: {
        and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }],
      },
      limit: 1,
      depth: 2,
    });

    return (result.docs[0] as Product | undefined) ?? null;
  } catch {
    return null;
  }
}

export async function getPublishedProducts(limit = 24): Promise<Product[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'products',
      where: { _status: { equals: 'published' } },
      limit,
      depth: 1,
      sort: '-updatedAt',
    });

    return result.docs as Product[];
  } catch {
    return [];
  }
}

export async function getResolvedPdpLayout(product: Product): Promise<PdpLayoutBlock[]> {
  let template: ProductTemplate | null = null;

  if (product.template && typeof product.template === 'object') {
    template = product.template as ProductTemplate;
  } else if (product.template) {
    try {
      const payload = await getPayloadClient();
      template = (await payload.findByID({
        collection: 'product-templates',
        id: product.template,
        depth: 2,
      })) as ProductTemplate;
    } catch {
      template = null;
    }
  }

  return resolvePdpLayout(product, template);
}
