import { Eyebrow } from '@/components/ui/eyebrow';
import { DEFAULT_CAREERS_INDEX, DEFAULT_JOB_APPLY, DEFAULT_JOBS } from '@/lib/cms/defaults';
import {
  detailsFromSections,
  getPublishedJobs,
  jobId,
  toJobPosting,
  type JobPosting,
} from '@/lib/cms/jobs';
import type { Job } from '@/payload-types';
import { Suspense } from 'react';

import { JobsBoard } from './Board';

export type CareersIndexBlockData = {
  blockType: 'careers-index';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  hiddenJobs?: Array<{ job?: number | string | Job | null; id?: string | null }> | null;
};

type CareersIndexBlockProps = {
  block?: CareersIndexBlockData | null;
};

function toFallbackJobs(): JobPosting[] {
  return DEFAULT_JOBS.map((job, index) => ({
    id: index + 1,
    slug: job.slug,
    title: job.title,
    department: job.department,
    location: job.location,
    employmentType: job.employmentType,
    excerpt: job.excerpt,
    details: detailsFromSections([
      { heading: 'About the role', body: job.aboutTheRole },
      { heading: 'What you will do', body: job.whatYouWillDo },
      { heading: 'What you bring', body: job.whatYouBring },
      { heading: 'What we offer', body: job.whatWeOffer },
    ]),
    apply: DEFAULT_JOB_APPLY,
  }));
}

export async function CareersIndexBlock({ block }: CareersIndexBlockProps) {
  const eyebrow = block?.eyebrow || DEFAULT_CAREERS_INDEX.eyebrow;
  const heading = block?.heading || DEFAULT_CAREERS_INDEX.heading;

  const hiddenIds = new Set(
    (block?.hiddenJobs ?? [])
      .map((row) => jobId(row.job))
      .filter((id): id is number | string => id != null),
  );

  const published = await getPublishedJobs();
  const visible = published.filter((job) => {
    if (job.showOnCareers === false) {
      return false;
    }

    const id = jobId(job);
    return id != null && !hiddenIds.has(id);
  });

  const jobs =
    visible.length > 0
      ? visible.map((job) => toJobPosting(job))
      : published.length > 0
        ? []
        : toFallbackJobs();

  const countLabel = `${jobs.length} opening${jobs.length === 1 ? '' : 's'}`;

  return (
    <section id="open-roles" className="bg-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 py-16 lg:gap-12 lg:px-[100px] lg:py-[100px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[720px] space-y-4">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="font-heading text-[1.625rem] font-bold leading-[1.05] tracking-[-0.04em] text-text-primary md:text-3xl lg:text-[40px]">
              {heading}
            </h2>
          </div>
          <p className="font-mono text-[12px] font-bold tracking-[1.4px] text-text-tertiary uppercase">
            {countLabel}
          </p>
        </div>

        {jobs.length > 0 ? (
          <Suspense>
            <JobsBoard jobs={jobs} />
          </Suspense>
        ) : (
          <div className="rounded-2xl border border-border-subtle bg-surface-elevated p-10 text-center">
            <p className="font-heading text-xl font-bold text-text-primary">
              No open roles right now
            </p>
            <p className="mt-2 text-text-secondary">
              Publish a job posting in the CMS, or remove it from the hidden list on this block.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
