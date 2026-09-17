import type { Metadata } from 'next';

import { RenderBlocks } from '@/blocks/RenderBlocks';
import { HomepageMotion } from '@/components/motion/HomepageMotion';
import { getPageBySlug } from '@/lib/cms/pages';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'AMC',
  description:
    'The Kleenoil Oil Management Contract keeps filtration machines in spec all year — so your team runs the plant, not the failure.',
};

const FALLBACK_LAYOUT = [
  { blockType: 'amc-hero' },
  { blockType: 'amc-why' },
  { blockType: 'amc-coverage' },
  { blockType: 'amc-visit' },
  { blockType: 'amc-industries' },
  { blockType: 'amc-proof' },
  { blockType: 'amc-cta' },
];

export default async function AmcPage() {
  const page = await getPageBySlug('amc');
  const blocks = (page?.layout as Array<{ blockType: string; id?: string | null }> | null)?.length
    ? (page?.layout as Array<{ blockType: string; id?: string | null }>)
    : FALLBACK_LAYOUT;

  return (
    <HomepageMotion>
      <RenderBlocks blocks={blocks} motion />
    </HomepageMotion>
  );
}
