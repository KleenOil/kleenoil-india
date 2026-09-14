'use client';

import { useMemo, useState } from 'react';

import { CaseStudyCard, type CaseStudyCardData } from '@/components/cards/CaseStudyCard';
import { CASE_STUDY_SECTORS, type CaseStudySector } from '@/lib/cms/cs-listing';
import { cn } from '@/lib/utils';

type CsIndexGridProps = {
  studies: Array<CaseStudyCardData & { sector: CaseStudySector }>;
};

const PAGE_SIZE = 6;

export function CsIndexGrid({ studies }: CsIndexGridProps) {
  const [sector, setSector] = useState<CaseStudySector | 'all'>('all');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (sector === 'all') {
      return studies;
    }

    return studies.filter((study) => study.sector === sector);
  }, [studies, sector]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const visible = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const selectSector = (next: CaseStudySector | 'all') => {
    setSector(next);
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => selectSector('all')}
          className={cn(
            'rounded-full px-4 py-2.5 font-mono text-[11px] font-bold tracking-[1.2px] uppercase transition-colors',
            sector === 'all'
              ? 'bg-brand-primary text-white'
              : 'bg-brand-dim text-text-secondary hover:bg-brand-soft',
          )}
        >
          All
        </button>
        {CASE_STUDY_SECTORS.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => selectSector(item.value)}
            className={cn(
              'rounded-full px-4 py-2.5 font-mono text-[11px] font-bold tracking-[1.2px] uppercase transition-colors',
              sector === item.value
                ? 'bg-brand-primary text-white'
                : 'bg-brand-dim text-text-secondary hover:bg-brand-soft',
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {visible.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {visible.map((study) => (
            <CaseStudyCard
              key={`${study.tag}-${study.title}`}
              caseStudy={{
                tag: study.tag,
                title: study.title,
                description: study.description,
                href: study.href,
                openInNewTab: study.openInNewTab,
                metrics: study.metrics,
              }}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-border-subtle bg-surface-elevated p-10 text-center">
          <p className="font-heading text-xl font-bold text-text-primary">
            No results in this sector
          </p>
          <p className="mt-2 text-text-secondary">Try another sector, or check back later.</p>
        </div>
      )}

      {pageCount > 1 ? (
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            disabled={safePage <= 1}
            onClick={() => setPage((value) => Math.max(1, value - 1))}
            className="font-mono text-[11px] font-bold tracking-[1.4px] text-text-tertiary uppercase disabled:opacity-40"
          >
            Prev
          </button>
          {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
            <button
              key={number}
              type="button"
              onClick={() => setPage(number)}
              className={cn(
                'size-9 rounded-lg font-mono text-sm font-bold',
                number === safePage
                  ? 'bg-brand-primary text-white'
                  : 'bg-surface-elevated text-text-secondary',
              )}
            >
              {number}
            </button>
          ))}
          <button
            type="button"
            disabled={safePage >= pageCount}
            onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
            className="font-mono text-[11px] font-bold tracking-[1.4px] text-text-tertiary uppercase disabled:opacity-40"
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}
