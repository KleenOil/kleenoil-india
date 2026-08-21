import { ArticleToc } from '@/components/article/ArticleToc';
import { CtaButton } from '@/components/ui/cta-button';
import { authorInitials, type ArticleHeading } from '@/lib/cms/article-content';
import { DEFAULT_ARTICLE_PAGE } from '@/lib/cms/defaults';
import type { ResolvedLink } from '@/lib/cms/links';

type ArticleSidebarProps = {
  authorName: string;
  authorRole: string;
  headings: ArticleHeading[];
  sidebarCta?: {
    heading: string;
    description: string;
    link: ResolvedLink;
  };
};

export function ArticleSidebar({
  authorName,
  authorRole,
  headings,
  sidebarCta,
}: ArticleSidebarProps) {
  const initials = authorInitials(authorName);
  const cta = sidebarCta ?? {
    heading: DEFAULT_ARTICLE_PAGE.sidebarCta.heading,
    description: DEFAULT_ARTICLE_PAGE.sidebarCta.description,
    link: DEFAULT_ARTICLE_PAGE.sidebarCta.link,
  };

  return (
    <aside className="flex w-full flex-col gap-5 lg:sticky lg:top-28 lg:w-[340px] lg:shrink-0">
      <div className="rounded-2xl border border-border-subtle bg-surface p-6">
        <p className="font-mono text-[11px] font-bold tracking-[1.4px] text-text-tertiary uppercase">
          Written by
        </p>
        <div className="mt-4 flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-deep font-heading text-sm font-bold text-white">
            {initials}
          </div>
          <div>
            <p className="font-heading text-base font-bold text-text-primary">{authorName}</p>
            <p className="text-sm text-text-secondary">{authorRole}</p>
          </div>
        </div>
      </div>

      {headings.length > 0 ? <ArticleToc headings={headings} /> : null}

      <div className="rounded-2xl bg-brand-deep p-6 text-white">
        <p className="font-heading text-xl font-bold tracking-tight">{cta.heading}</p>
        <p className="mt-3 text-sm leading-relaxed text-brand-soft">{cta.description}</p>
        <div className="mt-5">
          <CtaButton
            href={cta.link.href}
            appearance="secondary"
            openInNewTab={cta.link.openInNewTab}
            className="w-full border-transparent bg-brand-soft text-brand-deep hover:border-white hover:bg-transparent hover:text-white"
          >
            {cta.link.label}
          </CtaButton>
        </div>
      </div>
    </aside>
  );
}
