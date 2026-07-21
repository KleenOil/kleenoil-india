import Link from 'next/link';

import { cn } from '@/lib/utils';

export type CaseStudyMetric = {
  value: string;
  label: string;
};

export type CaseStudyCardData = {
  tag: string;
  title: string;
  description: string;
  href: string;
  metrics: CaseStudyMetric[];
};

type CaseStudyCardProps = {
  caseStudy: CaseStudyCardData;
  className?: string;
};

export function CaseStudyCard({ caseStudy, className }: CaseStudyCardProps) {
  return (
    <Link
      href={caseStudy.href}
      data-reveal-item
      className={cn(
        'group surface-card flex flex-col overflow-hidden rounded-2xl border-2 border-border-subtle bg-surface-elevated/70',
        className,
      )}
    >
      <div className="flex flex-col gap-6 bg-background/40 p-8 pb-7">
        <div className="inline-flex items-center gap-2.5">
          <span className="size-1.5 rounded-full bg-brand-primary" aria-hidden />
          <span className="font-mono text-[11px] font-medium tracking-[1.4px] text-text-secondary uppercase">
            {caseStudy.tag}
          </span>
        </div>
        <h3 className="font-heading text-2xl font-bold leading-tight tracking-tight text-text-primary sm:text-[30px]">
          {caseStudy.title}
        </h3>
        <p className="text-sm leading-relaxed text-text-secondary">{caseStudy.description}</p>
      </div>

      <div className="flex flex-wrap items-stretch gap-0 border-t border-border-subtle bg-background/75">
        {caseStudy.metrics.map((metric, index) => (
          <div key={`${metric.value}-${metric.label}`} className="flex flex-1 items-center">
            {index > 0 ? <span className="h-12 w-px bg-border-subtle" aria-hidden /> : null}
            <div className="flex min-w-[100px] flex-1 flex-col gap-1 px-6 py-6 sm:px-8">
              <p className="font-heading text-[32px] font-bold tracking-tight text-brand-primary">
                {metric.value}
              </p>
              <p className="font-mono text-[10px] font-bold tracking-[1.2px] text-text-tertiary uppercase">
                {metric.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Link>
  );
}
