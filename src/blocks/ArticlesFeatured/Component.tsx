import Image from 'next/image';

import { CtaButton } from '@/components/ui/cta-button';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { DEFAULT_ARTICLES_FEATURED } from '@/lib/cms/defaults';
import { getMediaAlt } from '@/lib/cms/links';
import { getPostById, getPublishedPosts, postId, toArticleCard } from '@/lib/cms/posts';
import type { Post } from '@/payload-types';

export type ArticlesFeaturedBlockData = {
  blockType: 'articles-featured';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  featuredPost?: number | string | Post | null;
};

type ArticlesFeaturedBlockProps = {
  block?: ArticlesFeaturedBlockData | null;
};

export async function ArticlesFeaturedBlock({ block }: ArticlesFeaturedBlockProps) {
  const eyebrow = block?.eyebrow || DEFAULT_ARTICLES_FEATURED.eyebrow;
  const heading = block?.heading || DEFAULT_ARTICLES_FEATURED.heading;
  const description = block?.description || DEFAULT_ARTICLES_FEATURED.description;

  let post: Post | null = null;
  const featured = block?.featuredPost;

  if (featured && typeof featured === 'object') {
    post = featured;
  } else {
    const id = postId(featured);
    if (id != null) {
      post = await getPostById(id);
    }
  }

  if (!post) {
    const latest = await getPublishedPosts(1);
    post = latest[0] ?? null;
  }

  const article = post
    ? toArticleCard(post)
    : {
        tag: DEFAULT_ARTICLES_FEATURED.article.tag,
        date: DEFAULT_ARTICLES_FEATURED.article.date,
        title: DEFAULT_ARTICLES_FEATURED.article.title,
        excerpt: DEFAULT_ARTICLES_FEATURED.article.excerpt,
        href: DEFAULT_ARTICLES_FEATURED.article.href,
        imageUrl: DEFAULT_ARTICLES_FEATURED.article.imageUrl,
        imageAlt: DEFAULT_ARTICLES_FEATURED.article.title,
      };

  const imageUrl = article.imageUrl;
  const imageAlt = getMediaAlt(post?.featuredImage, article.imageAlt || article.title);

  return (
    <section className="border-b border-border-subtle bg-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 py-16 lg:gap-14 lg:px-[100px] lg:py-[100px]">
        <SectionHeader eyebrow={eyebrow} heading={heading} description={description} />

        <article
          data-reveal-item
          className="grid overflow-hidden rounded-2xl border border-border-subtle bg-surface-elevated lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="relative min-h-[280px] bg-brand-soft lg:min-h-[420px]">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            ) : null}
          </div>

          <div className="flex flex-col justify-center gap-5 p-8 lg:p-12">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] font-bold tracking-[1.2px] text-text-tertiary uppercase">
              <span>{article.tag}</span>
              {article.date ? (
                <>
                  <span aria-hidden>·</span>
                  <span>{article.date}</span>
                </>
              ) : null}
            </div>
            <h3 className="font-heading text-2xl font-bold leading-tight tracking-tight text-text-primary md:text-3xl lg:text-[36px]">
              {article.title}
            </h3>
            {article.excerpt ? (
              <p className="text-[15px] leading-relaxed text-text-secondary">{article.excerpt}</p>
            ) : null}
            <div>
              <CtaButton href={article.href} appearance="ghost">
                Read the article
              </CtaButton>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
