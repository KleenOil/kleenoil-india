import Image from 'next/image';

import { CtaButton } from '@/components/ui/cta-button';
import { SectionHeader } from '@/components/sections/SectionHeader';
import {
  caseStudyId,
  getCaseStudyById,
  getPublishedCaseStudies,
  toCaseStudyCard,
} from '@/lib/cms/case-studies';
import { DEFAULT_CS_FEATURED } from '@/lib/cms/defaults';
import type { CaseStudy } from '@/payload-types';

export type CsFeaturedBlockData = {
  blockType: 'cs-featured';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  featuredStudy?: number | string | CaseStudy | null;
};

type CsFeaturedBlockProps = {
  block?: CsFeaturedBlockData | null;
};

export async function CsFeaturedBlock({ block }: CsFeaturedBlockProps) {
  const eyebrow = block?.eyebrow || DEFAULT_CS_FEATURED.eyebrow;
  const heading = block?.heading || DEFAULT_CS_FEATURED.heading;
  const description = block?.description || DEFAULT_CS_FEATURED.description;

  let study: CaseStudy | null = null;
  const featured = block?.featuredStudy;

  if (featured && typeof featured === 'object') {
    study = featured;
  } else {
    const id = caseStudyId(featured);
    if (id != null) {
      study = await getCaseStudyById(id);
    }
  }

  if (!study) {
    const latest = await getPublishedCaseStudies(1);
    study = latest[0] ?? null;
  }

  const card = study ? toCaseStudyCard(study) : null;
  const title = card?.title
    ? study?.featuredHeadline?.trim() || card.title
    : DEFAULT_CS_FEATURED.study.title;
  const tag = (card?.tag || DEFAULT_CS_FEATURED.study.tag).replace(/^CASE STUDY \/ /i, '');
  const location = card?.location || DEFAULT_CS_FEATURED.study.location;
  const excerpt = card?.description || DEFAULT_CS_FEATURED.study.excerpt;
  const imageUrl = card?.imageUrl || DEFAULT_CS_FEATURED.study.imageUrl;
  const imageAlt = card?.imageAlt || title;
  const href = card ? card.href : DEFAULT_CS_FEATURED.study.href;
  const openPdf = Boolean(card?.openInNewTab);
  const metrics = card?.metrics.length ? card.metrics : DEFAULT_CS_FEATURED.study.metrics;

  return (
    <section id="cs-featured" className="bg-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 py-16 lg:gap-14 lg:px-[100px] lg:py-[100px]">
        <SectionHeader eyebrow={eyebrow} heading={heading} description={description} />

        <article
          data-reveal-item
          className="grid overflow-hidden rounded-2xl border border-border-subtle bg-surface-elevated lg:grid-cols-2"
        >
          <div className="relative min-h-[280px] bg-brand-soft lg:min-h-[442px]">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : null}
          </div>

          <div className="flex flex-col justify-center gap-5 p-8 lg:p-12">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] font-bold tracking-[1.2px] text-text-tertiary uppercase">
              <span>{tag}</span>
              {location ? (
                <>
                  <span aria-hidden>·</span>
                  <span className="normal-case tracking-[0.4px] text-text-secondary">
                    {location}
                  </span>
                </>
              ) : null}
            </div>
            <h3 className="font-heading text-2xl font-bold leading-tight tracking-tight text-text-primary md:text-3xl lg:text-[32px]">
              {title}
            </h3>
            {excerpt ? (
              <p className="text-[15px] leading-relaxed text-text-secondary">{excerpt}</p>
            ) : null}

            <div className="flex flex-wrap gap-8 border-y border-border-subtle py-4">
              {metrics.map((metric) => (
                <div key={`${metric.value}-${metric.label}`} className="flex flex-col gap-1">
                  <p className="font-heading text-2xl font-bold tracking-tight text-brand-primary">
                    {metric.value}
                  </p>
                  <p className="font-mono text-[10px] font-bold tracking-[1.2px] text-text-tertiary uppercase">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <CtaButton href={href} appearance="ghost" openInNewTab={openPdf}>
                Read the case study
              </CtaButton>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
