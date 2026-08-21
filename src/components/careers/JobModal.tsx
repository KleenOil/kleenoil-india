'use client';

import { RichText } from '@payloadcms/richtext-lexical/react';
import { useCallback, useEffect } from 'react';
import { X } from 'lucide-react';

import { CtaButton } from '@/components/ui/cta-button';
import { DEFAULT_JOB_APPLY } from '@/lib/cms/defaults';
import type { JobPosting } from '@/lib/cms/jobs';

type JobModalProps = {
  job: JobPosting | null;
  onClose: () => void;
};

export function JobModal({ job, onClose }: JobModalProps) {
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!job) {
      return;
    }

    document.addEventListener('keydown', onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [job, onKeyDown]);

  if (!job) {
    return null;
  }

  const apply = job.apply.label ? job.apply : DEFAULT_JOB_APPLY;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 py-10 sm:py-16">
      <button
        type="button"
        aria-label="Close job details"
        className="absolute inset-0 bg-[#003319]/85"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="job-modal-title"
        className="relative z-10 flex w-full max-w-[720px] flex-col overflow-hidden rounded-[20px] border border-border-subtle bg-surface-elevated shadow-[0_24px_80px_#00331955]"
      >
        <div className="flex flex-col gap-3.5 px-7 pt-7 pb-5">
          <div className="flex items-start justify-between gap-4">
            <h2
              id="job-modal-title"
              className="font-heading text-2xl font-bold tracking-[-0.03em] text-text-primary md:text-[28px]"
            >
              {job.title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="mt-1 shrink-0 text-text-tertiary transition-colors hover:text-text-primary"
              aria-label="Close"
            >
              <X className="size-[22px]" />
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full bg-brand-dim px-3 py-1.5 font-mono text-[11px] font-bold tracking-[1.1px] text-brand-primary uppercase">
              {job.department}
            </span>
            <span className="rounded-full bg-surface px-3 py-1.5 font-mono text-[11px] font-bold tracking-[1.1px] text-text-secondary uppercase">
              {job.location}
            </span>
            <span className="rounded-full bg-surface px-3 py-1.5 font-mono text-[11px] font-bold tracking-[1.1px] text-text-secondary uppercase">
              {job.employmentType}
            </span>
          </div>
        </div>

        <div className="flex max-h-[min(52vh,420px)] flex-col overflow-y-auto px-7 py-2">
          {job.details ? (
            <div className="rich-content article-prose">
              <RichText data={job.details} disableContainer />
            </div>
          ) : (
            <p className="text-[15px] leading-relaxed text-text-secondary">
              Details for this role will be added soon.
            </p>
          )}
        </div>

        <div className="sticky bottom-0 mt-auto border-t border-white/10 bg-brand-deep px-7 py-5">
          <CtaButton
            href={apply.href || '/contact'}
            appearance="primary"
            openInNewTab={apply.openInNewTab}
            className="w-full border-transparent bg-brand-soft text-brand-deep shadow-none hover:border-white hover:bg-transparent hover:text-white"
          >
            {apply.label}
          </CtaButton>
        </div>
      </div>
    </div>
  );
}
