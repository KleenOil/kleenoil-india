import type { Metadata } from 'next';

import { RenderBlocks } from '@/blocks/RenderBlocks';
import { HomepageMotion } from '@/components/motion/HomepageMotion';
import { getPageBySlug } from '@/lib/cms/pages';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'High-performance hydraulics are acutely sensitive to fluid quality. Clean oil, regular samples, and scheduled care extend the life of the system.',
};

const FALLBACK_LAYOUT = [
  { blockType: 'resource-hero', variant: 'faq' },
  { blockType: 'faq-topics' },
  { blockType: 'faq-cta' },
];

export default async function FaqPage() {
  const page = await getPageBySlug('faq');
  const blocks = (page?.layout as Array<{ blockType: string; id?: string | null }> | null)?.length
    ? (page?.layout as Array<{ blockType: string; id?: string | null }>)
    : FALLBACK_LAYOUT;

  return (
    <HomepageMotion>
      <RenderBlocks blocks={blocks} motion />
    </HomepageMotion>
  );
}
