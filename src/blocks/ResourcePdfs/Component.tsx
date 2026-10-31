import { ResourcePdfs } from '@/components/library/ResourcePdfs';
import { blockHasCmsData, cmsList, cmsText } from '@/lib/cms/block-content';
import {
  DEFAULT_RESOURCE_PDFS,
  type ResourcePdfCard,
  type ResourcePdfsVariant,
} from '@/lib/cms/library';
import { resolvePdfHref } from '@/lib/cms/links';
import type { Media } from '@/payload-types';

type ResourcePdfCmsCard = {
  title?: string | null;
  meta?: string | null;
  href?: string | null;
  pdf?: number | Media | null;
  id?: string | null;
};

export type ResourcePdfsBlockData = {
  blockType: 'resource-pdfs';
  variant?: ResourcePdfsVariant | null;
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  cards?: ResourcePdfCmsCard[] | null;
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
  ).map((card) => {
    const resolved = resolvePdfHref({
      pdf: 'pdf' in card ? (card.pdf as number | Media | null | undefined) : null,
      href: card.href,
    });
    return {
      title: card.title as string,
      meta: card.meta ?? '',
      href: resolved.href || undefined,
      openInNewTab: resolved.openInNewTab,
    };
  });

  return (
    <ResourcePdfs eyebrow={eyebrow} heading={heading} description={description} cards={cards} />
  );
}
