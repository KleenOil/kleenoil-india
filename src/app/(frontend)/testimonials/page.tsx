import type { Metadata } from 'next';

import { RenderBlocks } from '@/blocks/RenderBlocks';
import { HomepageMotion } from '@/components/motion/HomepageMotion';
import { getPageBySlug } from '@/lib/cms/pages';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Testimonials',
  description:
    'Plant reports, ROI notes, and performance certificates — the same documents our customers already signed.',
};

const FALLBACK_LAYOUT = [
  { blockType: 'resource-hero', variant: 'testimonials' },
  { blockType: 'resource-pdfs', variant: 'testimonials' },
];

export default async function TestimonialsPage() {
  const page = await getPageBySlug('testimonials');
  const blocks = (page?.layout as Array<{ blockType: string; id?: string | null }> | null)?.length
    ? (page?.layout as Array<{ blockType: string; id?: string | null }>)
    : FALLBACK_LAYOUT;

  return (
    <HomepageMotion>
      <RenderBlocks blocks={blocks} motion />
    </HomepageMotion>
  );
}
