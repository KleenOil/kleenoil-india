export type PdpLayoutBlock = {
  blockType: string;
  dataSource?: 'common' | 'custom' | null;
  id?: string | null;
  [key: string]: unknown;
};

function usableBlocks(blocks: PdpLayoutBlock[] | null | undefined): PdpLayoutBlock[] {
  return (blocks ?? []).filter((block) => Boolean(block?.blockType));
}

function groupByType(blocks: PdpLayoutBlock[]): Map<string, PdpLayoutBlock[]> {
  const grouped = new Map<string, PdpLayoutBlock[]>();

  for (const block of blocks) {
    const type = String(block.blockType);
    const list = grouped.get(type) ?? [];
    list.push(block);
    grouped.set(type, list);
  }

  return grouped;
}

/**
 * Product layout is the source of truth for which sections appear and in what
 * order, including duplicate block types. Common blocks pull content from the
 * matching template section (same type, same occurrence). Custom blocks keep
 * the product's own fields.
 */
export function resolvePdpLayout(
  product: { layout?: unknown } | null | undefined,
  template: { layout?: unknown } | null | undefined,
): PdpLayoutBlock[] {
  const templateLayout = usableBlocks(template?.layout as PdpLayoutBlock[] | null | undefined);
  const productLayout = usableBlocks(product?.layout as PdpLayoutBlock[] | null | undefined);

  if (!productLayout.length) {
    return templateLayout.map((block) => ({ ...block, dataSource: 'common' as const }));
  }

  if (!templateLayout.length) {
    return productLayout;
  }

  const templateByType = groupByType(templateLayout);
  const occurrence = new Map<string, number>();

  return productLayout.map((productBlock) => {
    const blockType = String(productBlock.blockType);
    const index = occurrence.get(blockType) ?? 0;
    occurrence.set(blockType, index + 1);

    if (productBlock.dataSource === 'custom') {
      return { ...productBlock, blockType };
    }

    const matches = templateByType.get(blockType) ?? [];
    const templateBlock = matches[index] ?? matches[0];
    if (!templateBlock) {
      return { ...productBlock, blockType };
    }

    return {
      ...templateBlock,
      id: productBlock.id ?? templateBlock.id,
      blockType,
      dataSource: 'common' as const,
    };
  });
}
