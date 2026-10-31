import { cachedCmsQuery, CMS_CACHE_TAGS, dedupeCmsQuery } from '@/lib/cms/cache';
import { getMediaAlt, getMediaUrl } from '@/lib/cms/links';
import { getPayloadClient } from '@/lib/payload';
import { logCmsFailure } from '@/lib/cms/unavailable';
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

const fetchPostBySlug = cachedCmsQuery(
  ['cms', 'post', 'by-slug'],
  [CMS_CACHE_TAGS.posts],
  async (slug: string): Promise<Post | null> => {
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
      logCmsFailure('getPostBySlug', error);
      return null;
    }
  },
);

const fetchPostById = cachedCmsQuery(
  ['cms', 'post', 'by-id'],
  [CMS_CACHE_TAGS.posts],
  async (id: number | string): Promise<Post | null> => {
    try {
      const payload = await getPayloadClient();
      return (await payload.findByID({
        collection: 'posts',
        id,
        depth: 1,
      })) as Post;
    } catch (error) {
      logCmsFailure('getPostById', error);
      return null;
    }
  },
);

const fetchPublishedPosts = cachedCmsQuery(
  ['cms', 'posts', 'list'],
  [CMS_CACHE_TAGS.posts],
  async (limit: number): Promise<Post[]> => {
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
      logCmsFailure('getPublishedPosts', error);
      return [];
    }
  },
);

export const getPostBySlug = dedupeCmsQuery(async (slug: string): Promise<Post | null> => {
  if (!slug) {
    return null;
  }

  return fetchPostBySlug(slug);
});

export const getPostById = dedupeCmsQuery(async (id: number | string): Promise<Post | null> =>
  fetchPostById(id),
);

export const getPublishedPosts = dedupeCmsQuery(async (limit: number = 48): Promise<Post[]> =>
  fetchPublishedPosts(Number(limit) || 48),
);

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

const fetchRelatedPosts = cachedCmsQuery(
  ['cms', 'posts', 'related'],
  [CMS_CACHE_TAGS.posts],
  async (excludeId: number | string, limit: number): Promise<Post[]> => {
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
      logCmsFailure('getRelatedPosts', error);
      return [];
    }
  },
);

export const getRelatedPosts = dedupeCmsQuery(
  async (excludeId: number | string, limit: number = 3): Promise<Post[]> =>
    fetchRelatedPosts(excludeId, Number(limit) || 3),
);

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
