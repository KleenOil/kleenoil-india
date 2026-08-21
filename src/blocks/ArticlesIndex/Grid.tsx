'use client';

import { useMemo, useState } from 'react';

import { ArticleCard, type ArticleCardData } from '@/components/cards/ArticleCard';

type SortKey = 'newest' | 'oldest' | 'title';

type ArticlesIndexGridProps = {
  articles: ArticleCardData[];
};

const SORT_OPTIONS: Array<{ value: SortKey; label: string }> = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'title', label: 'Title A–Z' },
];

function parseDate(value?: string | null): number {
  if (!value) {
    return 0;
  }

  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

export function ArticlesIndexGrid({ articles }: ArticlesIndexGridProps) {
  const [sort, setSort] = useState<SortKey>('newest');

  const sorted = useMemo(() => {
    const next = [...articles];

    if (sort === 'title') {
      next.sort((a, b) => a.title.localeCompare(b.title));
      return next;
    }

    next.sort((a, b) => {
      const delta = parseDate(a.publishedAt || a.date) - parseDate(b.publishedAt || b.date);
      return sort === 'oldest' ? delta : -delta;
    });

    return next;
  }, [articles, sort]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-end">
        <label className="inline-flex items-center gap-3 font-mono text-[11px] font-bold tracking-[1.2px] text-text-tertiary uppercase">
          Sort
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            className="rounded-lg border border-border-subtle bg-surface-elevated px-3 py-2 font-body text-sm font-semibold tracking-normal text-text-primary normal-case"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {sorted.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sorted.map((article) => (
            <ArticleCard key={`${article.href}-${article.title}`} article={article} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-border-subtle bg-surface-elevated p-10 text-center">
          <p className="font-heading text-xl font-bold text-text-primary">
            No articles in this grid
          </p>
          <p className="mt-2 text-text-secondary">
            Publish an article in the CMS, or remove it from the hidden list on this block.
          </p>
        </div>
      )}
    </div>
  );
}
