import type { Metadata } from 'next';

import { RenderBlocks } from '@/blocks/RenderBlocks';
import { HomepageMotion } from '@/components/motion/HomepageMotion';
import { getPageBySlug } from '@/lib/cms/pages';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Book a consultation',
  description:
    'Thirty minutes with a Kleenoil engineer. Tell us the plant, the oil, and the problem — get a written next step within one business day.',
};

const FALLBACK_LAYOUT = [
  { blockType: 'contact-hero' },
  { blockType: 'contact-process' },
  { blockType: 'contact-channels' },
];

export default async function ContactPage() {
  const page = await getPageBySlug('consult');
  const blocks = (page?.layout as Array<{ blockType: string; id?: string | null }> | null)?.length
    ? (page?.layout as Array<{ blockType: string; id?: string | null }>)
    : FALLBACK_LAYOUT;

  return (
    <HomepageMotion>
      <RenderBlocks blocks={blocks} motion />
    </HomepageMotion>
  );
}
