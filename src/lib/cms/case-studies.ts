import {
  CASE_STUDY_SECTORS,
  type CaseStudySector,
  type CaseStudyListingCard,
} from '@/lib/cms/cs-listing';
import { getMediaAlt, getMediaUrl } from '@/lib/cms/links';
import { getPayloadClient } from '@/lib/payload';
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

  const pdfUrl = getMediaUrl(study.pdf);
  const href = pdfUrl || study.href?.trim() || '';

  return {
    id: study.id,
    sector: (study.sector as CaseStudySector) || 'automotive',
    tag: study.tag?.trim() || `CASE STUDY / ${sectorLabel(study.sector)}`,
    title: study.title,
    description: study.excerpt?.trim() || '',
    href,
    openInNewTab: Boolean(pdfUrl) || /\.pdf($|\?)/i.test(href),
    location: study.location?.trim() || '',
    imageUrl: getMediaUrl(study.featuredImage),
    imageAlt: getMediaAlt(study.featuredImage, study.title),
    metrics,
  };
}

export async function getPublishedCaseStudies(limit = 48): Promise<CaseStudy[]> {
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
    console.error('[cms] getPublishedCaseStudies failed', error);
    return [];
  }
}

export async function getCaseStudyById(id: number | string): Promise<CaseStudy | null> {
  try {
    const payload = await getPayloadClient();
    return (await payload.findByID({
      collection: 'case-studies',
      id,
      depth: 1,
    })) as CaseStudy;
  } catch (error) {
    console.error('[cms] getCaseStudyById failed', error);
    return null;
  }
}
