import type { Metadata } from 'next';

import { RenderBlocks } from '@/blocks/RenderBlocks';
import { HomepageMotion } from '@/components/motion/HomepageMotion';
import { getPageBySlug } from '@/lib/cms/pages';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Applications',
  description:
    'Injection moulding, die casting, presses, TBMs — download the note for the machine you run.',
};

const FALLBACK_LAYOUT = [
  { blockType: 'resource-hero', variant: 'applications' },
  { blockType: 'resource-pdfs', variant: 'applications' },
];

export default async function ApplicationsPage() {
  const page = await getPageBySlug('applications');
  const blocks = (page?.layout as Array<{ blockType: string; id?: string | null }> | null)?.length
    ? (page?.layout as Array<{ blockType: string; id?: string | null }>)
    : FALLBACK_LAYOUT;

  return (
    <HomepageMotion>
      <RenderBlocks blocks={blocks} motion />
    </HomepageMotion>
  );
}
