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
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
    });

    return (result.docs[0] as Product | undefined) ?? null;
  } catch (error) {
    console.error('[cms] getProductBySlug failed', error);
    return null;
  }
}

export async function getPublishedProducts(limit = 24): Promise<Product[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'products',
      limit,
      depth: 1,
      sort: '-updatedAt',
    });

    return result.docs as Product[];
  } catch (error) {
    console.error('[cms] getPublishedProducts failed', error);
    return [];
  }
}

export async function getResolvedPdpLayout(product: Product): Promise<PdpLayoutBlock[]> {
  let template: ProductTemplate | null = null;

  const templateRef = product.template;
  const templateId = typeof templateRef === 'object' && templateRef ? templateRef.id : templateRef;

  if (templateId) {
    try {
      const payload = await getPayloadClient();
      // Depth 3 so related products inside template layout include featuredImage media.
      template = (await payload.findByID({
        collection: 'product-templates',
        id: templateId,
        depth: 3,
      })) as ProductTemplate;
    } catch (error) {
      console.error('[cms] getResolvedPdpLayout: template lookup failed', error);
      template =
        typeof templateRef === 'object' && templateRef ? (templateRef as ProductTemplate) : null;
    }
  }

  return resolvePdpLayout(product, template);
}
