import { CaseStudyCard, type CaseStudyCardData } from '@/components/cards/CaseStudyCard';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { blockHasCmsData, cmsList, cmsText } from '@/lib/cms/block-content';
import { DEFAULT_FEATURED_CASE_STUDIES } from '@/lib/cms/defaults';
import { resolveLink } from '@/lib/cms/links';

type CaseStudyCmsMetric = {
  value?: string | null;
  label?: string | null;
  id?: string | null;
};

type CaseStudyCmsCard = {
  tag?: string | null;
  title?: string | null;
  description?: string | null;
  href?: string | null;
  metrics?: CaseStudyCmsMetric[] | null;
  id?: string | null;
};

export type FeaturedCaseStudiesBlockData = {
  blockType: 'featured-case-studies';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  cards?: CaseStudyCmsCard[] | null;
  cta?: {
    type?: 'page' | 'custom' | null;
    label?: string | null;
    url?: string | null;
    openInNewTab?: boolean | null;
    page?: number | { slug?: string | null } | null;
    appearance?: 'primary' | 'secondary' | 'ghost' | null;
  } | null;
};

type FeaturedCaseStudiesBlockProps = {
  block?: FeaturedCaseStudiesBlockData | null;
};

function mapCard(card: CaseStudyCmsCard, index: number, hasCms: boolean): CaseStudyCardData | null {
  if (!card.title?.trim()) {
    return null;
  }

  const fallback = hasCms ? undefined : DEFAULT_FEATURED_CASE_STUDIES.caseStudies[index];
  const cmsMetrics =
    card.metrics
      ?.filter((metric): metric is { value: string; label: string } =>
        Boolean(metric.value?.trim() && metric.label?.trim()),
      )
      .map((metric) => ({
        value: metric.value.trim(),
        label: metric.label.trim(),
      })) ?? [];

  return {
    tag: card.tag?.trim() || fallback?.tag || (hasCms ? '' : 'CASE STUDY'),
    title: card.title.trim(),
    description: card.description?.trim() || fallback?.description || '',
    href: card.href?.trim() || '',
    metrics: cmsMetrics.length > 0 ? cmsMetrics : (fallback?.metrics ?? []),
  };
}

export function FeaturedCaseStudiesBlock({ block }: FeaturedCaseStudiesBlockProps) {
  const hasCms = blockHasCmsData(block);
  const eyebrow = cmsText(block?.eyebrow, DEFAULT_FEATURED_CASE_STUDIES.eyebrow, hasCms);
  const heading = cmsText(block?.heading, DEFAULT_FEATURED_CASE_STUDIES.heading, hasCms);
  const description = cmsText(
    block?.description,
    DEFAULT_FEATURED_CASE_STUDIES.description,
    hasCms,
  );

  const resolvedCta = resolveLink(block?.cta);
  const sectionCta = resolvedCta
    ? {
        label: resolvedCta.label,
        href: resolvedCta.href,
        appearance: resolvedCta.appearance,
        openInNewTab: resolvedCta.openInNewTab,
      }
    : hasCms
      ? undefined
      : DEFAULT_FEATURED_CASE_STUDIES.cta;

  const caseStudies = cmsList(
    block?.cards?.map((card, index) => mapCard(card, index, hasCms)).filter(Boolean) as
      CaseStudyCardData[] | undefined,
    DEFAULT_FEATURED_CASE_STUDIES.caseStudies,
    hasCms,
    (): boolean => true,
  );
  const firstRow = caseStudies.slice(0, 2);
  const secondRow = caseStudies.slice(2, 4);

  return (
    <section className="border-y border-border-subtle bg-surface">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-16 lg:gap-20 lg:px-[100px] lg:py-[140px]">
        <SectionHeader
          eyebrow={eyebrow}
          heading={heading}
          description={description}
          cta={sectionCta}
        />

        <div className="flex flex-col gap-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {firstRow.map((caseStudy) => (
              <CaseStudyCard key={caseStudy.title} caseStudy={caseStudy} />
            ))}
          </div>
          {secondRow.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {secondRow.map((caseStudy) => (
                <CaseStudyCard key={caseStudy.title} caseStudy={caseStudy} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
