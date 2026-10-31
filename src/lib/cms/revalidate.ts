import { revalidatePath, revalidateTag } from 'next/cache';

import { CMS_CACHE_TAGS, type CmsCacheTag } from '@/lib/cms/cache';

export function revalidateCmsTags(tags: CmsCacheTag[]) {
  for (const tag of tags) {
    // Next.js requires a cacheLife profile; "max" busts the tagged entry immediately.
    revalidateTag(tag, 'max');
  }
}

export function revalidateSiteChrome() {
  revalidateCmsTags([CMS_CACHE_TAGS.siteChrome, CMS_CACHE_TAGS.globals]);
  revalidatePath('/', 'layout');
}

export function revalidatePagesContent(slug?: string | null) {
  revalidateCmsTags([CMS_CACHE_TAGS.pages]);
  revalidatePath('/');
  if (slug && slug !== 'home') {
    revalidatePath(`/${slug}`);
  } else {
    revalidatePath('/');
  }
}

export function revalidateProductsContent(slug?: string | null) {
  revalidateCmsTags([CMS_CACHE_TAGS.products, CMS_CACHE_TAGS.siteChrome]);
  revalidatePath('/products');
  if (slug) {
    revalidatePath(`/products/${slug}`);
  }
  revalidatePath('/', 'layout');
}

export function revalidatePostsContent(slug?: string | null) {
  revalidateCmsTags([CMS_CACHE_TAGS.posts]);
  revalidatePath('/blog');
  if (slug) {
    revalidatePath(`/blog/${slug}`);
  }
}

export function revalidateJobsContent() {
  revalidateCmsTags([CMS_CACHE_TAGS.jobs]);
  revalidatePath('/careers');
}

export function revalidateCaseStudiesContent() {
  revalidateCmsTags([CMS_CACHE_TAGS.caseStudies]);
  revalidatePath('/case-studies');
}

export function revalidateContactContent() {
  revalidateCmsTags([CMS_CACHE_TAGS.contact, CMS_CACHE_TAGS.globals]);
  revalidatePath('/contact');
}
