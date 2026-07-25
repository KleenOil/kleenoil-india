import type { Payload } from 'payload';

import { getDefaultPdpTemplateLayout } from '@/lib/cms/pdp-layout-presets';

export const DEFAULT_PRODUCT_TEMPLATE_SLUG = 'standard-pdp';

/**
 * Ensures a seeded Product Template exists with Pencil PDP section content.
 * Safe to call on every boot — no-ops when the slug already exists.
 */
export async function ensureDefaultProductTemplate(payload: Payload): Promise<void> {
  const existing = await payload.find({
    collection: 'product-templates',
    where: { slug: { equals: DEFAULT_PRODUCT_TEMPLATE_SLUG } },
    limit: 1,
    depth: 0,
  });

  if (existing.docs.length > 0) {
    return;
  }

  await payload.create({
    collection: 'product-templates',
    data: {
      name: 'Standard PDP',
      slug: DEFAULT_PRODUCT_TEMPLATE_SLUG,
      // Seeded from Pencil defaults; shape matches generated ProductTemplate layout union.
      layout: getDefaultPdpTemplateLayout() as never,
    },
  });

  payload.logger.info('Seeded default Product Template: Standard PDP');
}
