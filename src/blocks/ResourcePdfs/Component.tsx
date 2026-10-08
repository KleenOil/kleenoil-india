import { ResourcePdfs } from '@/components/library/ResourcePdfs';
import { blockHasCmsData, cmsList, cmsText } from '@/lib/cms/block-content';
import {
  DEFAULT_RESOURCE_PDFS,
  type ResourcePdfCard,
  type ResourcePdfsVariant,
} from '@/lib/cms/library';

export type ResourcePdfsBlockData = {
  blockType: 'resource-pdfs';
  variant?: ResourcePdfsVariant | null;
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  cards?: Array<{ title?: string | null; meta?: string | null; href?: string | null }> | null;
};

function pdfsVariant(value: ResourcePdfsBlockData['variant']): ResourcePdfsVariant {
  if (value && value in DEFAULT_RESOURCE_PDFS) {
    return value;
  }
  return 'industries';
}

export function ResourcePdfsBlock({ block }: { block?: ResourcePdfsBlockData | null }) {
  const variant = pdfsVariant(block?.variant);
  const defaults = DEFAULT_RESOURCE_PDFS[variant];
  const hasCms = blockHasCmsData(block);
  const eyebrow = cmsText(block?.eyebrow, defaults.eyebrow, hasCms);
  const heading = cmsText(block?.heading, defaults.heading, hasCms);
  const description = cmsText(block?.description, defaults.description, hasCms);
  const cards: ResourcePdfCard[] = cmsList(block?.cards, defaults.cards, hasCms, (card) =>
    Boolean(card.title),
  ).map((card) => ({
    title: card.title as string,
    meta: card.meta ?? '',
    href: card.href ?? undefined,
  }));

  return (
    <ResourcePdfs eyebrow={eyebrow} heading={heading} description={description} cards={cards} />
  );
}
