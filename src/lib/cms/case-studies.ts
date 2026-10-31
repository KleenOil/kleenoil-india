import { cachedCmsQuery, CMS_CACHE_TAGS, dedupeCmsQuery } from '@/lib/cms/cache';
import {
  CASE_STUDY_SECTORS,
  type CaseStudySector,
  type CaseStudyListingCard,
} from '@/lib/cms/cs-listing';
import { getMediaAlt, getMediaUrl, resolvePdfHref } from '@/lib/cms/links';
import { getPayloadClient } from '@/lib/payload';
import { logCmsFailure } from '@/lib/cms/unavailable';
import type { CaseStudy } from '@/payload-types';

export function caseStudyId(
  value: number | string | { id?: number | string | null } | null | undefined,
): number | string | null {
  if (typeof value === 'number' || typeof value === 'string') {
    return value;
  }

  if (value && typeof value === 'object' && 'id' in value) {
    return value.id ?? null;
  }

  return null;
}

function sectorLabel(sector?: string | null): string {
  const match = CASE_STUDY_SECTORS.find((item) => item.value === sector);
  return match?.label.toUpperCase() || 'INDUSTRY';
}

export function toCaseStudyCard(study: CaseStudy): CaseStudyListingCard {
  const metrics =
    study.metrics
      ?.filter((metric) => metric.value?.trim() && metric.label?.trim())
      .map((metric) => ({
        value: metric.value.trim(),
        label: metric.label.trim(),
      })) ?? [];

  const resolved = resolvePdfHref({ pdf: study.pdf, href: study.href });
  const href = resolved.href;

  return {
    id: study.id,
    sector: (study.sector as CaseStudySector) || 'automotive',
    tag: study.tag?.trim() || `CASE STUDY / ${sectorLabel(study.sector)}`,
    title: study.title,
    description: study.excerpt?.trim() || '',
    href,
    openInNewTab: resolved.openInNewTab,
    location: study.location?.trim() || '',
    imageUrl: getMediaUrl(study.featuredImage),
    imageAlt: getMediaAlt(study.featuredImage, study.title),
    metrics,
  };
}

const fetchPublishedCaseStudies = cachedCmsQuery(
  ['cms', 'case-studies', 'list'],
  [CMS_CACHE_TAGS.caseStudies],
  async (limit: number): Promise<CaseStudy[]> => {
    try {
      const payload = await getPayloadClient();
      const result = await payload.find({
        collection: 'case-studies',
        limit,
        depth: 1,
        sort: '-publishedAt',
      });

      return (result.docs as CaseStudy[]).filter((study) => study.showOnListing !== false);
    } catch (error) {
      logCmsFailure('getPublishedCaseStudies', error);
      return [];
    }
  },
);

const fetchCaseStudyById = cachedCmsQuery(
  ['cms', 'case-study', 'by-id'],
  [CMS_CACHE_TAGS.caseStudies],
  async (id: number | string): Promise<CaseStudy | null> => {
    try {
      const payload = await getPayloadClient();
      return (await payload.findByID({
        collection: 'case-studies',
        id,
        depth: 1,
      })) as CaseStudy;
    } catch (error) {
      logCmsFailure('getCaseStudyById', error);
      return null;
    }
  },
);

export const getPublishedCaseStudies = dedupeCmsQuery(
  async (limit: number = 48): Promise<CaseStudy[]> =>
    fetchPublishedCaseStudies(Number(limit) || 48),
);

export const getCaseStudyById = dedupeCmsQuery(
  async (id: number | string): Promise<CaseStudy | null> => fetchCaseStudyById(id),
);
