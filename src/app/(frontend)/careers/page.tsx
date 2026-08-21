import type { Metadata } from 'next';

import { RenderBlocks } from '@/blocks/RenderBlocks';
import { HomepageMotion } from '@/components/motion/HomepageMotion';
import { getPageBySlug } from '@/lib/cms/pages';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Open roles at Kleenoil India — engineers, technicians and field specialists who keep plants running.',
};

const FALLBACK_LAYOUT = [{ blockType: 'careers-hero' }, { blockType: 'careers-index' }];

export default async function CareersPage() {
  const page = await getPageBySlug('careers');
  const blocks = (page?.layout as Array<{ blockType: string; id?: string | null }> | null)?.length
    ? (page?.layout as Array<{ blockType: string; id?: string | null }>)
    : FALLBACK_LAYOUT;

  return (
    <HomepageMotion>
      <RenderBlocks blocks={blocks} motion />
    </HomepageMotion>
  );
}
