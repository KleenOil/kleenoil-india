import { SectionHeader } from '@/components/sections/SectionHeader';
import { DEFAULT_ARTICLES_INDEX } from '@/lib/cms/defaults';
import { getPublishedPosts, postId, toArticleCard } from '@/lib/cms/posts';
import type { Post } from '@/payload-types';

import { ArticlesIndexGrid } from './Grid';

export type ArticlesIndexBlockData = {
  blockType: 'articles-index';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  hiddenPosts?: Array<{ post?: number | string | Post | null; id?: string | null }> | null;
};

type ArticlesIndexBlockProps = {
  block?: ArticlesIndexBlockData | null;
};

export async function ArticlesIndexBlock({ block }: ArticlesIndexBlockProps) {
  const eyebrow = block?.eyebrow || DEFAULT_ARTICLES_INDEX.eyebrow;
  const heading = block?.heading || DEFAULT_ARTICLES_INDEX.heading;
  const description = block?.description || DEFAULT_ARTICLES_INDEX.description;

  const hiddenIds = new Set(
    (block?.hiddenPosts ?? [])
      .map((row) => postId(row.post))
      .filter((id): id is number | string => id != null),
  );

  const published = await getPublishedPosts();
  const posts = published.filter((post) => {
    if (post.showInJournal === false) {
      return false;
    }

    const id = postId(post);
    return id != null && !hiddenIds.has(id);
  });

  const articles =
    posts.length > 0
      ? posts.map((post) => toArticleCard(post))
      : published.length > 0
        ? []
        : DEFAULT_ARTICLES_INDEX.articles;

  return (
    <section id="journal-index" className="border-b border-border-subtle bg-surface">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 py-16 lg:gap-14 lg:px-[100px] lg:py-[100px]">
        <SectionHeader eyebrow={eyebrow} heading={heading} description={description} />
        <ArticlesIndexGrid articles={articles} />
      </div>
    </section>
  );
}
