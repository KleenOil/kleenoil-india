import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload';

import {
  revalidateCaseStudiesContent,
  revalidateContactContent,
  revalidateJobsContent,
  revalidatePagesContent,
  revalidatePostsContent,
  revalidateProductsContent,
  revalidateSiteChrome,
} from '@/lib/cms/revalidate';

function safe(run: () => void) {
  try {
    run();
  } catch (error) {
    console.warn(
      '[revalidate] Failed to bust Next.js cache:',
      error instanceof Error ? error.message : error,
    );
  }
}

export const revalidatePageAfterChange: CollectionAfterChangeHook = ({ doc }) => {
  safe(() => revalidatePagesContent(typeof doc?.slug === 'string' ? doc.slug : null));
  return doc;
};

export const revalidatePageAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  safe(() => revalidatePagesContent(typeof doc?.slug === 'string' ? doc.slug : null));
  return doc;
};

export const revalidateProductAfterChange: CollectionAfterChangeHook = ({ doc }) => {
  safe(() => revalidateProductsContent(typeof doc?.slug === 'string' ? doc.slug : null));
  return doc;
};

export const revalidateProductAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  safe(() => revalidateProductsContent(typeof doc?.slug === 'string' ? doc.slug : null));
  return doc;
};

export const revalidatePostAfterChange: CollectionAfterChangeHook = ({ doc }) => {
  safe(() => revalidatePostsContent(typeof doc?.slug === 'string' ? doc.slug : null));
  return doc;
};

export const revalidatePostAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  safe(() => revalidatePostsContent(typeof doc?.slug === 'string' ? doc.slug : null));
  return doc;
};

export const revalidateJobAfterChange: CollectionAfterChangeHook = ({ doc }) => {
  safe(() => revalidateJobsContent());
  return doc;
};

export const revalidateJobAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  safe(() => revalidateJobsContent());
  return doc;
};

export const revalidateCaseStudyAfterChange: CollectionAfterChangeHook = ({ doc }) => {
  safe(() => revalidateCaseStudiesContent());
  return doc;
};

export const revalidateCaseStudyAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  safe(() => revalidateCaseStudiesContent());
  return doc;
};

export const revalidateSiteChromeGlobal: GlobalAfterChangeHook = ({ doc }) => {
  safe(() => revalidateSiteChrome());
  return doc;
};

export const revalidateContactGlobal: GlobalAfterChangeHook = ({ doc }) => {
  safe(() => revalidateContactContent());
  return doc;
};
