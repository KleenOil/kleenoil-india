import type { Metadata } from 'next';

import { RenderBlocks } from '@/blocks/RenderBlocks';
import { HomepageMotion } from '@/components/motion/HomepageMotion';
import { getPageBySlug } from '@/lib/cms/pages';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Oil management without the guesswork — cleaning, reclamation, and rejuvenation for critical industrial oils.',
};

const FALLBACK_LAYOUT = [
  { blockType: 'services-hero' },
  { blockType: 'services-offerings' },
  { blockType: 'services-fluids' },
  { blockType: 'services-program' },
  { blockType: 'services-visit' },
  { blockType: 'services-industries' },
  { blockType: 'services-cta' },
];

export default async function ServicesPage() {
  const page = await getPageBySlug('services');
  const blocks = (page?.layout as Array<{ blockType: string; id?: string | null }> | null)?.length
    ? (page?.layout as Array<{ blockType: string; id?: string | null }>)
    : FALLBACK_LAYOUT;

  return (
    <HomepageMotion>
      <RenderBlocks blocks={blocks} motion />
    </HomepageMotion>
  );
}
