import type { Metadata } from 'next';

import { RenderBlocks } from '@/blocks/RenderBlocks';
import { HomepageMotion } from '@/components/motion/HomepageMotion';
import { getPayloadClient } from '@/lib/payload';
import type { Page } from '@/payload-types';

export const dynamic = 'force-dynamic';

async function getHomePage(): Promise<Page | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'pages',
      where: {
        and: [{ slug: { equals: 'home' } }, { _status: { equals: 'published' } }],
      },
      limit: 1,
      depth: 2,
    });

    return (result.docs[0] as Page | undefined) ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomePage();

  return {
    title:
      page?.seo?.metaTitle ||
      page?.title ||
      'Industrial Filtration Engineered For Maximum Equipment Life',
    description:
      page?.seo?.metaDescription ||
      'Precision oil purification and bypass filtration systems that extend equipment life by up to 5×.',
  };
}

export default async function HomePage() {
  const page = await getHomePage();
  const blocks = (page?.layout as Array<{ blockType: string; id?: string | null }> | null) ?? null;

  return (
    <HomepageMotion>
      <RenderBlocks blocks={blocks} motion />
    </HomepageMotion>
  );
}
