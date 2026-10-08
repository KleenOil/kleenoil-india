import type { Metadata } from 'next';

import { RenderBlocks } from '@/blocks/RenderBlocks';
import { HomepageMotion } from '@/components/motion/HomepageMotion';
import { getPageBySlug } from '@/lib/cms/pages';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Industries',
  description:
    'Filtration for the plants that never stop — download the industry brief for the plant you run.',
};

const FALLBACK_LAYOUT = [
  { blockType: 'resource-hero', variant: 'industries' },
  { blockType: 'resource-pdfs', variant: 'industries' },
];

export default async function IndustriesPage() {
  const page = await getPageBySlug('industries');
  const blocks = (page?.layout as Array<{ blockType: string; id?: string | null }> | null)?.length
    ? (page?.layout as Array<{ blockType: string; id?: string | null }>)
    : FALLBACK_LAYOUT;

  return (
    <HomepageMotion>
      <RenderBlocks blocks={blocks} motion />
    </HomepageMotion>
  );
}
