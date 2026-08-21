'use client';

import { useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { JobCardGrid } from '@/components/cards/JobCard';
import { JobModal } from '@/components/careers/JobModal';
import type { JobPosting } from '@/lib/cms/jobs';

type JobsBoardProps = {
  jobs: JobPosting[];
};

export function JobsBoard({ jobs }: JobsBoardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const openSlug = searchParams.get('job');

  const selected = useMemo(
    () => jobs.find((job) => job.slug === openSlug) ?? null,
    [jobs, openSlug],
  );

  const setJobParam = useCallback(
    (slug: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (slug) {
        params.set('job', slug);
      } else {
        params.delete('job');
      }
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return (
    <>
      <JobCardGrid jobs={jobs} onOpen={(slug) => setJobParam(slug)} />
      <JobModal job={selected} onClose={() => setJobParam(null)} />
    </>
  );
}
