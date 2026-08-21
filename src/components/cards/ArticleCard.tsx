import Image from 'next/image';

import { MaybeLink, hasHref } from '@/components/ui/maybe-link';
import { cn } from '@/lib/utils';

export type ArticleCardData = {
  tag: string;
  date?: string | null;
  publishedAt?: string | null;
  title: string;
  excerpt: string;
  href?: string | null;
  imageUrl?: string | null;
  imageAlt?: string;
};

type ArticleCardProps = {
  article: ArticleCardData;
  className?: string;
};

export function ArticleCard({ article, className }: ArticleCardProps) {
  const linked = hasHref(article.href);

  return (
    <MaybeLink
      href={article.href}
      data-reveal-item
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface-elevated',
        className,
      )}
    >
      <div className="relative h-[200px] overflow-hidden bg-brand-soft sm:h-[220px]">
        {article.imageUrl ? (
          <Image
            src={article.imageUrl}
            alt={article.imageAlt || article.title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand-soft to-surface">
            <span className="px-6 text-center font-heading text-lg font-bold text-brand-deep">
              {article.title}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] font-bold tracking-[1.2px] text-text-tertiary uppercase">
          <span>{article.tag}</span>
          {article.date ? (
            <>
              <span aria-hidden>·</span>
              <span>{article.date}</span>
            </>
          ) : null}
        </div>
        <h3 className="font-heading text-xl font-bold leading-tight tracking-tight text-text-primary md:text-[22px]">
          {article.title}
        </h3>
        {article.excerpt ? (
          <p className="flex-1 text-sm leading-relaxed text-text-secondary">{article.excerpt}</p>
        ) : null}
        {linked ? (
          <p className="pt-1 font-heading text-sm font-bold text-brand-primary">Read article</p>
        ) : null}
      </div>
    </MaybeLink>
  );
}
