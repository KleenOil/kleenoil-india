import { Briefcase, MapPin } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { JobPosting } from '@/lib/cms/jobs';

type JobCardProps = {
  job: JobPosting;
  onOpen: (slug: string) => void;
};

export function JobCard({ job, onOpen }: JobCardProps) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-2xl border border-border-subtle bg-surface-elevated p-7">
      <p className="font-mono text-[11px] font-bold tracking-[1.4px] text-brand-primary uppercase">
        {job.department}
      </p>
      <h3 className="line-clamp-2 min-h-[2.6em] font-heading text-[22px] font-bold leading-tight tracking-tight text-text-primary">
        {job.title}
      </h3>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-text-secondary">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="size-3.5 text-text-tertiary" aria-hidden />
          {job.location}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Briefcase className="size-3.5 text-text-tertiary" aria-hidden />
          {job.employmentType}
        </span>
      </div>
      <p className="line-clamp-2 min-h-[2.7em] flex-1 text-sm leading-relaxed text-text-secondary">
        {job.excerpt}
      </p>
      <button
        type="button"
        onClick={() => onOpen(job.slug)}
        className="self-start pt-1 font-heading text-sm font-bold text-brand-primary transition-opacity hover:opacity-80"
      >
        View details
        <span aria-hidden> →</span>
      </button>
    </article>
  );
}

type JobCardGridProps = {
  jobs: JobPosting[];
  onOpen: (slug: string) => void;
  className?: string;
};

export function JobCardGrid({ jobs, onOpen, className }: JobCardGridProps) {
  return (
    <div className={cn('grid gap-6 md:grid-cols-2', className)}>
      {jobs.map((job) => (
        <JobCard key={job.slug || String(job.id)} job={job} onOpen={onOpen} />
      ))}
    </div>
  );
}
