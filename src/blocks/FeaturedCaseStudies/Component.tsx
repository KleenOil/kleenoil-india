import { CaseStudyCard } from '@/components/cards/CaseStudyCard';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { DEFAULT_FEATURED_CASE_STUDIES } from '@/lib/cms/defaults';
import { resolveLink } from '@/lib/cms/links';

export type FeaturedCaseStudiesBlockData = {
  blockType: 'featured-case-studies';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  sourceMode?: 'manual' | 'auto' | null;
  caseStudySlugs?: Array<{ slug?: string | null; id?: string | null }> | null;
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

export function FeaturedCaseStudiesBlock({ block }: FeaturedCaseStudiesBlockProps) {
  const eyebrow = block?.eyebrow || DEFAULT_FEATURED_CASE_STUDIES.eyebrow;
  const heading = block?.heading || DEFAULT_FEATURED_CASE_STUDIES.heading;
  const description = block?.description || DEFAULT_FEATURED_CASE_STUDIES.description;

  const resolvedCta = resolveLink(block?.cta);
  const sectionCta = resolvedCta
    ? {
        label: resolvedCta.label,
        href: resolvedCta.href,
        appearance: resolvedCta.appearance,
        openInNewTab: resolvedCta.openInNewTab,
      }
    : DEFAULT_FEATURED_CASE_STUDIES.cta;

  const caseStudies = DEFAULT_FEATURED_CASE_STUDIES.caseStudies;
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
          <div className="grid gap-6 lg:grid-cols-2">
            {secondRow.map((caseStudy) => (
              <CaseStudyCard key={caseStudy.title} caseStudy={caseStudy} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
