import type { Metadata } from 'next';

import { RenderBlocks } from '@/blocks/RenderBlocks';
import { HomepageMotion } from '@/components/motion/HomepageMotion';
import { getPageBySlug } from '@/lib/cms/pages';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Sustainability',
  description:
    'Sustainability through every cycle — extend oil life, reduce waste, and keep industrial fluids in circulation.',
};

const FALLBACK_LAYOUT = [
  { blockType: 'sustainability-hero' },
  { blockType: 'sustainability-impact' },
  { blockType: 'sustainability-circular' },
  { blockType: 'sustainability-drop' },
  { blockType: 'sustainability-numbers' },
  { blockType: 'sustainability-applications' },
  { blockType: 'sustainability-cta' },
];

export default async function SustainabilityPage() {
  const page = await getPageBySlug('sustainability');
  const blocks = (page?.layout as Array<{ blockType: string; id?: string | null }> | null)?.length
    ? (page?.layout as Array<{ blockType: string; id?: string | null }>)
    : FALLBACK_LAYOUT;

  return (
    <HomepageMotion>
      <RenderBlocks blocks={blocks} motion />
    </HomepageMotion>
  );
}
