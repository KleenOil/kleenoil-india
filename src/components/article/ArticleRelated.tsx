import { ArticleCard, type ArticleCardData } from '@/components/cards/ArticleCard';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { DEFAULT_ARTICLE_PAGE } from '@/lib/cms/defaults';
import type { ResolvedLink } from '@/lib/cms/links';

type ArticleRelatedProps = {
  eyebrow?: string | null;
  heading?: string | null;
  viewAll?: ResolvedLink | null;
  articles: ArticleCardData[];
};

export function ArticleRelated({ eyebrow, heading, viewAll, articles }: ArticleRelatedProps) {
  if (articles.length === 0) {
    return null;
  }

  const related = DEFAULT_ARTICLE_PAGE.related;

  return (
    <section className="border-t border-border-subtle bg-surface">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 py-16 lg:px-[100px] lg:py-[100px]">
        <SectionHeader
          eyebrow={eyebrow?.trim() || related.eyebrow}
          heading={heading?.trim() || related.heading}
          cta={viewAll ?? related.viewAll}
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.href || article.title} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
