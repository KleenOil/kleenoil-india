import { cache as reactCache } from 'react';
import { unstable_cache } from 'next/cache';

/** Default ISR/data cache window — publish hooks bust tags immediately. */
export const CMS_CACHE_TTL_SECONDS = 120;

export const CMS_CACHE_TAGS = {
  siteChrome: 'site-chrome',
  pages: 'pages',
  products: 'products',
  posts: 'posts',
  jobs: 'jobs',
  caseStudies: 'case-studies',
  globals: 'globals',
  contact: 'contact',
} as const;

export type CmsCacheTag = (typeof CMS_CACHE_TAGS)[keyof typeof CMS_CACHE_TAGS];

/**
 * Cross-request cache with tags. Arguments passed to the returned function become
 * part of the cache key (Next unstable_cache).
 */
export function cachedCmsQuery<TArgs extends unknown[], TResult>(
  keyParts: string[],
  tags: CmsCacheTag[],
  fn: (...args: TArgs) => Promise<TResult>,
  revalidateSeconds: number = CMS_CACHE_TTL_SECONDS,
): (...args: TArgs) => Promise<TResult> {
  const cached = unstable_cache(
    // Cast keeps call-site arg types; Next's unstable_cache widens args to unknown[].
    fn as (...args: unknown[]) => Promise<TResult>,
    keyParts,
    {
      tags: [...tags],
      revalidate: revalidateSeconds,
    },
  );

  return ((...args: TArgs) => cached(...args)) as (...args: TArgs) => Promise<TResult>;
}

/** Same-request dedupe (metadata + page, multiple blocks, etc.). */
export function dedupeCmsQuery<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
): (...args: TArgs) => Promise<TResult> {
  return reactCache(fn);
}
