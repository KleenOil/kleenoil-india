import { SectionHeader } from '@/components/sections/SectionHeader';
import { caseStudyId, getPublishedCaseStudies, toCaseStudyCard } from '@/lib/cms/case-studies';
import type { CaseStudyListingCard } from '@/lib/cms/cs-listing';
import { DEFAULT_CS_INDEX } from '@/lib/cms/defaults';
import type { CaseStudy } from '@/payload-types';

import { CsIndexGrid } from './Grid';

export type CsIndexBlockData = {
  blockType: 'cs-index';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  hiddenStudies?: Array<{ study?: number | string | CaseStudy | null; id?: string | null }> | null;
};

type CsIndexBlockProps = {
  block?: CsIndexBlockData | null;
};

export async function CsIndexBlock({ block }: CsIndexBlockProps) {
  const eyebrow = block?.eyebrow || DEFAULT_CS_INDEX.eyebrow;
  const heading = block?.heading || DEFAULT_CS_INDEX.heading;
  const description = block?.description?.trim() || null;

  const hiddenIds = new Set(
    (block?.hiddenStudies ?? [])
      .map((row) => caseStudyId(row.study))
      .filter((id): id is number | string => id != null),
  );

  const published = await getPublishedCaseStudies();
  const visible = published.filter((study) => {
    const id = caseStudyId(study);
    return id != null && !hiddenIds.has(id);
  });

  const studies: CaseStudyListingCard[] =
    visible.length > 0
      ? visible.map((study) => toCaseStudyCard(study))
      : published.length > 0
        ? []
        : DEFAULT_CS_INDEX.caseStudies;

  return (
    <section id="cs-index" className="bg-surface">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 py-16 lg:gap-14 lg:px-[100px] lg:py-[100px]">
        <SectionHeader eyebrow={eyebrow} heading={heading} description={description} />
        <CsIndexGrid studies={studies} />
      </div>
    </section>
  );
}
