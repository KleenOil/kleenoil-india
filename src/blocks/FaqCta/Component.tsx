import { ResourceCta } from '@/components/library/ResourceCta';
import { blockHasCmsData, cmsText } from '@/lib/cms/block-content';
import { DEFAULT_FAQ_CTA } from '@/lib/cms/library';
import { resolveCtaList, type CmsLink } from '@/lib/cms/links';

type CtaItem = { link?: CmsLink | null };

export type FaqCtaBlockData = {
  blockType: 'faq-cta';
  eyebrow?: string | null;
  heading?: string | null;
  ctas?: CtaItem[] | null;
};

export function FaqCtaBlock({ block }: { block?: FaqCtaBlockData | null }) {
  const hasCms = blockHasCmsData(block);
  const eyebrow = cmsText(block?.eyebrow, DEFAULT_FAQ_CTA.eyebrow, hasCms);
  const heading = cmsText(block?.heading, DEFAULT_FAQ_CTA.heading, hasCms);
  const ctas = resolveCtaList(block?.ctas, hasCms ? [] : DEFAULT_FAQ_CTA.ctas);

  return <ResourceCta eyebrow={eyebrow} heading={heading} ctas={ctas} />;
}
