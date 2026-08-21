import { getMediaAlt, getMediaUrl } from '@/lib/cms/links';
import { getPayloadClient } from '@/lib/payload';
import type { Post } from '@/payload-types';

export type ArticleCardSource = {
  id?: number | string | null;
  title?: string | null;
  slug?: string | null;
  excerpt?: string | null;
  category?: string | null;
  publishedAt?: string | null;
  featuredImage?: Post['featuredImage'];
  showInJournal?: boolean | null;
};

export function postId(
  value: number | string | ArticleCardSource | null | undefined,
): number | string | null {
  if (typeof value === 'number' || typeof value === 'string') {
    return value;
  }

  if (value && typeof value === 'object' && 'id' in value) {
    return value.id ?? null;
  }

  return null;
}

export function formatArticleDate(value?: string | null): string | null {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function toArticleCard(post: ArticleCardSource) {
  return {
    tag: post.category?.trim() || 'ARTICLE',
    date: formatArticleDate(post.publishedAt),
    publishedAt: post.publishedAt ?? null,
    title: post.title?.trim() || 'Untitled article',
    excerpt: post.excerpt?.trim() || '',
    href: post.slug ? `/blog/${post.slug}` : '',
    imageUrl: getMediaUrl(post.featuredImage),
    imageAlt: getMediaAlt(post.featuredImage, post.title || 'Article'),
  };
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!slug) {
    return null;
  }

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'posts',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 3,
    });

    return (result.docs[0] as Post | undefined) ?? null;
  } catch (error) {
    console.error('[cms] getPostBySlug failed', error);
    return null;
  }
}

export async function getPostById(id: number | string): Promise<Post | null> {
  try {
    const payload = await getPayloadClient();
    return (await payload.findByID({
      collection: 'posts',
      id,
      depth: 1,
    })) as Post;
  } catch (error) {
    console.error('[cms] getPostById failed', error);
    return null;
  }
}

export async function getPublishedPosts(limit = 48): Promise<Post[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'posts',
      limit,
      depth: 1,
      sort: '-publishedAt',
    });

    return result.docs as Post[];
  } catch (error) {
    console.error('[cms] getPublishedPosts failed', error);
    return [];
  }
}

function isPopulatedPost(value: unknown): value is Post {
  return Boolean(value && typeof value === 'object' && 'title' in value);
}

/** Related articles picked on this post. Empty when the editor left the list blank. */
export function pickedRelatedPosts(post: Post): Post[] {
  const currentId = postId(post);

  return (post.relatedSection?.posts ?? [])
    .map((row) => row.post)
    .filter(isPopulatedPost)
    .filter((item) => postId(item) !== currentId)
    .slice(0, 3);
}

export async function getRelatedPosts(excludeId: number | string, limit = 3): Promise<Post[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'posts',
      where: {
        and: [{ id: { not_equals: excludeId } }, { showInJournal: { not_equals: false } }],
      },
      limit,
      depth: 1,
      sort: '-publishedAt',
    });

    return result.docs as Post[];
  } catch (error) {
    console.error('[cms] getRelatedPosts failed', error);
    return [];
  }
}

/** Use CMS picks when present; otherwise the latest other journal articles. */
export async function resolveRelatedPosts(post: Post, limit = 3): Promise<Post[]> {
  const picked = pickedRelatedPosts(post);
  if (picked.length > 0) {
    return picked.slice(0, limit);
  }

  const currentId = postId(post);
  if (currentId == null) {
    return [];
  }

  return getRelatedPosts(currentId, limit);
}
