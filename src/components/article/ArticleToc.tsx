'use client';

import type { MouseEvent } from 'react';

import { prefersReducedMotion } from '@/lib/animations/prefers-reduced-motion';
import type { ArticleHeading } from '@/lib/cms/article-content';

type ArticleTocProps = {
  headings: ArticleHeading[];
};

function scrollToHeading(id: string) {
  const target = document.getElementById(id);
  if (!target) {
    return false;
  }

  const navOffset = 112;
  const top = target.getBoundingClientRect().top + window.scrollY - navOffset;
  window.scrollTo({
    top,
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  });

  window.history.replaceState(null, '', `#${id}`);
  return true;
}

export function ArticleToc({ headings }: ArticleTocProps) {
  const onClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (scrollToHeading(id)) {
      event.preventDefault();
    }
  };

  return (
    <nav
      aria-label="In this article"
      className="rounded-2xl border border-border-subtle bg-surface p-6"
    >
      <p className="font-mono text-[11px] font-bold tracking-[1.4px] text-text-tertiary uppercase">
        In this article
      </p>
      <ul className="mt-4 flex flex-col gap-3">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={(event) => onClick(event, heading.id)}
              className="text-sm font-semibold leading-snug text-text-primary transition-colors duration-200 hover:text-brand-primary"
            >
              {heading.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
