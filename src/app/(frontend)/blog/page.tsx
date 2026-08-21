import type { Metadata } from 'next';

import { RenderBlocks } from '@/blocks/RenderBlocks';
import { HomepageMotion } from '@/components/motion/HomepageMotion';
import { getPageBySlug } from '@/lib/cms/pages';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Field notes from Kleenoil engineers — oil cleanliness, downtime cost, and filtration practice.',
};

const FALLBACK_LAYOUT = [
  { blockType: 'articles-hero' },
  { blockType: 'articles-featured' },
  { blockType: 'articles-index' },
  { blockType: 'cta' },
];

export default async function ArticlesIndexPage() {
  const page = await getPageBySlug('articles');
  const blocks = (page?.layout as Array<{ blockType: string; id?: string | null }> | null)?.length
    ? (page?.layout as Array<{ blockType: string; id?: string | null }>)
    : FALLBACK_LAYOUT;

  return (
    <HomepageMotion>
      <RenderBlocks blocks={blocks} motion />
    </HomepageMotion>
  );
}
