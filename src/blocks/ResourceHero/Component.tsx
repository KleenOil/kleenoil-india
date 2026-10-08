import { ResourceHero } from '@/components/library/ResourceHero';
import { blockHasCmsData, cmsList, cmsText } from '@/lib/cms/block-content';
import {
  DEFAULT_RESOURCE_HERO,
  type ResourceHeroVariant,
  type ResourcePreview,
  type ResourceStat,
} from '@/lib/cms/library';
import { getMediaAlt, getMediaUrl, resolveCtaList, type CmsLink } from '@/lib/cms/links';
import type { Media } from '@/payload-types';

type CtaItem = { link?: CmsLink | null };

export type ResourceHeroBlockData = {
  blockType: 'resource-hero';
  variant?: ResourceHeroVariant | null;
  eyebrow?: string | null;
  heading?: string | null;
  lead?: string | null;
  ctas?: CtaItem[] | null;
  image?: number | Media | null;
  quote?: string | null;
  attribution?: string | null;
  stats?: Array<{ n?: string | null; label?: string | null }> | null;
  previews?: Array<{ title?: string | null; kicker?: string | null }> | null;
};

function heroVariant(value: ResourceHeroBlockData['variant']): ResourceHeroVariant {
  if (value && value in DEFAULT_RESOURCE_HERO) {
    return value;
  }
  return 'industries';
}

export function ResourceHeroBlock({ block }: { block?: ResourceHeroBlockData | null }) {
  const variant = heroVariant(block?.variant);
  const defaults = DEFAULT_RESOURCE_HERO[variant];
  const hasCms = blockHasCmsData(block);
  const eyebrow = cmsText(block?.eyebrow, defaults.eyebrow, hasCms);
  const heading = cmsText(block?.heading, defaults.heading, hasCms);
  const lead = cmsText(block?.lead, defaults.lead, hasCms);
  const quote = cmsText(block?.quote, defaults.quote, hasCms);
  const attribution = cmsText(block?.attribution, defaults.attribution, hasCms);
  const ctas = resolveCtaList(block?.ctas, hasCms ? [] : defaults.cta ? [defaults.cta] : []);
  const stats: ResourceStat[] = cmsList(block?.stats, defaults.stats, hasCms, (stat) =>
    Boolean(stat.n && stat.label),
  ).map((stat) => ({ n: stat.n as string, label: stat.label as string }));
  const previews: ResourcePreview[] = cmsList(
    block?.previews,
    defaults.previews ?? [],
    hasCms,
    (item) => Boolean(item.title),
  ).map((item) => ({ title: item.title as string, kicker: item.kicker ?? '' }));
  const imageUrl = cmsText(getMediaUrl(block?.image) ?? '', defaults.imageUrl ?? '', hasCms);
  const imageAlt = getMediaAlt(block?.image, heading);

  return (
    <ResourceHero
      variant={variant}
      eyebrow={eyebrow}
      heading={heading}
      lead={lead}
      ctas={ctas}
      stats={stats}
      quote={quote || undefined}
      attribution={attribution || undefined}
      previews={previews}
      imageUrl={imageUrl || undefined}
      imageAlt={imageAlt}
    />
  );
}
