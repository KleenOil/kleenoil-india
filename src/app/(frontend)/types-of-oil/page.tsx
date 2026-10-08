import type { Metadata } from 'next';

import { RenderBlocks } from '@/blocks/RenderBlocks';
import { HomepageMotion } from '@/components/motion/HomepageMotion';
import { getPageBySlug } from '@/lib/cms/pages';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Types of Oil',
  description:
    'Hydraulic, gear, turbine, lube, cutting, glycol — download the fluid note for the oil already in your system.',
};

const FALLBACK_LAYOUT = [
  { blockType: 'resource-hero', variant: 'fluids' },
  { blockType: 'resource-pdfs', variant: 'fluids' },
];

export default async function TypesOfOilPage() {
  const page = await getPageBySlug('types-of-oil');
  const blocks = (page?.layout as Array<{ blockType: string; id?: string | null }> | null)?.length
    ? (page?.layout as Array<{ blockType: string; id?: string | null }>)
    : FALLBACK_LAYOUT;

  return (
    <HomepageMotion>
      <RenderBlocks blocks={blocks} motion />
    </HomepageMotion>
  );
}
