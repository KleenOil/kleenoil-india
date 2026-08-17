import { getPayloadClient } from '@/lib/payload';
import type { Page } from '@/payload-types';

/** App routes that must not be claimed by CMS pages. */
export const RESERVED_PAGE_SLUGS = new Set([
  'admin',
  'api',
  'products',
  'services',
  'industries',
  'case-studies',
  'blog',
  'gallery',
  'testimonials',
  'resources',
  'process',
  'contact',
  'search',
  'home',
  'sitemap.xml',
  'robots.txt',
]);

export async function getPageBySlug(slug: string): Promise<Page | null> {
  if (!slug || RESERVED_PAGE_SLUGS.has(slug)) {
    return null;
  }

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'pages',
      where: {
        and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }],
      },
      limit: 1,
      depth: 2,
    });

    return (result.docs[0] as Page | undefined) ?? null;
  } catch (error) {
    console.error('[cms] getPageBySlug failed', error);
    return null;
  }
}

export async function getHomePage(): Promise<Page | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'pages',
      where: {
        and: [{ slug: { equals: 'home' } }, { _status: { equals: 'published' } }],
      },
      limit: 1,
      depth: 2,
    });

    return (result.docs[0] as Page | undefined) ?? null;
  } catch (error) {
    console.error('[cms] getHomePage failed', error);
    return null;
  }
}
