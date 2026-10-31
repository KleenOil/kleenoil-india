import { cachedCmsQuery, CMS_CACHE_TAGS, dedupeCmsQuery } from '@/lib/cms/cache';
import { getPayloadClient } from '@/lib/payload';
import { logCmsFailure } from '@/lib/cms/unavailable';
import type { Page } from '@/payload-types';

/** App routes that must not be claimed by CMS pages. */
export const RESERVED_PAGE_SLUGS = new Set([
  'admin',
  'api',
  'products',
  'case-studies',
  'blog',
  'gallery',
  'resources',
  'process',
  'contact',
  'search',
  'home',
  'sitemap.xml',
  'robots.txt',
]);

const fetchPageBySlug = cachedCmsQuery(
  ['cms', 'page', 'by-slug'],
  [CMS_CACHE_TAGS.pages],
  async (slug: string): Promise<Page | null> => {
    try {
      const payload = await getPayloadClient();
      const result = await payload.find({
        collection: 'pages',
        where: {
          slug: { equals: slug },
        },
        limit: 1,
        depth: 2,
      });

      return (result.docs[0] as Page | undefined) ?? null;
    } catch (error) {
      logCmsFailure('getPageBySlug', error);
      return null;
    }
  },
);

const fetchHomePage = cachedCmsQuery(
  ['cms', 'page', 'home'],
  [CMS_CACHE_TAGS.pages],
  async (): Promise<Page | null> => {
    try {
      const payload = await getPayloadClient();
      const result = await payload.find({
        collection: 'pages',
        where: {
          slug: { equals: 'home' },
        },
        limit: 1,
        depth: 2,
      });

      return (result.docs[0] as Page | undefined) ?? null;
    } catch (error) {
      logCmsFailure('getHomePage', error);
      return null;
    }
  },
);

export const getPageBySlug = dedupeCmsQuery(async (slug: string): Promise<Page | null> => {
  if (!slug || RESERVED_PAGE_SLUGS.has(slug)) {
    return null;
  }

  return fetchPageBySlug(slug);
});

export const getHomePage = dedupeCmsQuery(async (): Promise<Page | null> => fetchHomePage());
