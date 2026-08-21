import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ArticleClosingCta } from '@/components/article/ArticleClosingCta';
import { ArticleContent } from '@/components/article/ArticleContent';
import { ArticleHero } from '@/components/article/ArticleHero';
import { ArticleRelated } from '@/components/article/ArticleRelated';
import { ArticleSidebar } from '@/components/article/ArticleSidebar';
import { HomepageMotion } from '@/components/motion/HomepageMotion';
import {
  extractArticleHeadings,
  estimateReadMinutes,
  resolveArticleToc,
} from '@/lib/cms/article-content';
import { DEFAULT_ARTICLE_PAGE } from '@/lib/cms/defaults';
import { getMediaAlt, getMediaUrl, resolveLink } from '@/lib/cms/links';
import {
  formatArticleDate,
  getPostBySlug,
  resolveRelatedPosts,
  toArticleCard,
} from '@/lib/cms/posts';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Article not found' };
  }

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt || undefined,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const imageUrl = getMediaUrl(post.featuredImage);
  const imageAlt = getMediaAlt(post.featuredImage, post.title);
  const date = formatArticleDate(post.publishedAt);
  const headings = resolveArticleToc(extractArticleHeadings(post.content), post.tableOfContents);
  const readMinutes = estimateReadMinutes(post.content);
  const related = (await resolveRelatedPosts(post, 3)).map((item) => toArticleCard(item));
  const authorName = post.authorName?.trim() || 'Kleenoil Engineering';
  const authorRole = post.authorRole?.trim() || 'Field notes from plant audits';
  const heroCta = resolveLink(post.heroCta) ?? DEFAULT_ARTICLE_PAGE.heroCta;
  const sidebarCta = {
    heading: post.sidebarCta?.heading?.trim() || DEFAULT_ARTICLE_PAGE.sidebarCta.heading,
    description:
      post.sidebarCta?.description?.trim() || DEFAULT_ARTICLE_PAGE.sidebarCta.description,
    link: resolveLink(post.sidebarCta?.link) ?? DEFAULT_ARTICLE_PAGE.sidebarCta.link,
  };
  const relatedViewAll =
    resolveLink(post.relatedSection?.viewAll) ?? DEFAULT_ARTICLE_PAGE.related.viewAll;

  return (
    <HomepageMotion>
      <article>
        <ArticleHero
          title={post.title}
          excerpt={post.excerpt}
          date={date}
          category={post.category}
          readMinutes={readMinutes}
          imageUrl={imageUrl}
          imageAlt={imageAlt}
          cta={heroCta}
        />

        <section className="bg-background">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-12 lg:flex-row lg:items-start lg:gap-16 lg:px-[100px] lg:py-[100px]">
            <div className="min-w-0 flex-1">
              <nav
                aria-label="Breadcrumb"
                className="mb-8 flex flex-wrap items-center gap-2.5 font-mono text-[11px] font-bold tracking-[1.1px] uppercase"
              >
                <Link href="/" className="text-text-tertiary hover:text-brand-primary">
                  Home
                </Link>
                <span className="text-text-tertiary">/</span>
                <Link href="/blog" className="text-text-tertiary hover:text-brand-primary">
                  Articles
                </Link>
                <span className="text-text-tertiary">/</span>
                <span className="text-text-primary">{post.title}</span>
              </nav>

              {post.content ? (
                <ArticleContent content={post.content} />
              ) : (
                <p className="text-lg leading-relaxed text-text-secondary">
                  {post.excerpt || 'This article has no body copy yet.'}
                </p>
              )}
            </div>

            <ArticleSidebar
              authorName={authorName}
              authorRole={authorRole}
              headings={headings}
              sidebarCta={sidebarCta}
            />
          </div>
        </section>

        <ArticleRelated
          eyebrow={post.relatedSection?.eyebrow}
          heading={post.relatedSection?.heading}
          viewAll={relatedViewAll}
          articles={related}
        />

        <ArticleClosingCta
          eyebrow={post.closingCta?.eyebrow}
          heading={post.closingCta?.heading}
          description={post.closingCta?.description}
          ctas={post.closingCta?.ctas}
        />
      </article>
    </HomepageMotion>
  );
}
