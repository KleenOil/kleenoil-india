import type { Metadata } from 'next';

import { RenderBlocks } from '@/blocks/RenderBlocks';
import { HomepageMotion } from '@/components/motion/HomepageMotion';
import { getHomePage } from '@/lib/cms/pages';

export const dynamic = 'force-dynamic';

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
      <RenderBlocks blocks={blocks} motion fallbackToHomepage />
    </HomepageMotion>
  );
}
