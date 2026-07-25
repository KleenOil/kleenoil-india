import type { Product, ProductTemplate } from '@/payload-types';

export type PdpLayoutBlock = {
  blockType: string;
  dataSource?: 'common' | 'custom' | null;
  id?: string | null;
  [key: string]: unknown;
};

/**
 * Merge template (common) section content with product overrides.
 * Template defines order; product `dataSource: 'custom'` wins per blockType.
 */
export function resolvePdpLayout(
  product: Pick<Product, 'layout'> | null | undefined,
  template: Pick<ProductTemplate, 'layout'> | null | undefined,
): PdpLayoutBlock[] {
  const templateLayout = (template?.layout as PdpLayoutBlock[] | null | undefined) ?? [];
  const productLayout = (product?.layout as PdpLayoutBlock[] | null | undefined) ?? [];

  if (!templateLayout.length) {
    return productLayout.filter((block) => block.blockType);
  }

  const productByType = new Map<string, PdpLayoutBlock>();
  for (const block of productLayout) {
    if (block.blockType) {
      productByType.set(block.blockType, block);
    }
  }

  return templateLayout
    .filter((block) => block.blockType)
    .map((templateBlock) => {
      const blockType = String(templateBlock.blockType);
      const productBlock = productByType.get(blockType);

      if (productBlock?.dataSource === 'custom') {
        return { ...productBlock, blockType };
      }

      return { ...templateBlock, blockType, dataSource: 'common' as const };
    });
}
