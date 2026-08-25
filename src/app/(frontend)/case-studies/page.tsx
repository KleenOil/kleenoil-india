import type { Metadata } from 'next';

import { RenderBlocks } from '@/blocks/RenderBlocks';
import { HomepageMotion } from '@/components/motion/HomepageMotion';
import { getPageBySlug } from '@/lib/cms/pages';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Measured results from OEMs, steel mills, and fleets running Kleenoil bypass filtration.',
};

const FALLBACK_LAYOUT = [
  { blockType: 'cs-hero' },
  { blockType: 'cs-featured' },
  { blockType: 'cs-index' },
  { blockType: 'cs-cta' },
];

export default async function CaseStudiesPage() {
  const page = await getPageBySlug('cs');
  const blocks = (page?.layout as Array<{ blockType: string; id?: string | null }> | null)?.length
    ? (page?.layout as Array<{ blockType: string; id?: string | null }>)
    : FALLBACK_LAYOUT;

  return (
    <HomepageMotion>
      <RenderBlocks blocks={blocks} motion />
    </HomepageMotion>
  );
}
