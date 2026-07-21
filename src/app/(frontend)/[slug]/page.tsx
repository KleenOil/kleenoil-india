import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { RenderBlocks } from '@/blocks/RenderBlocks';
import { HomepageMotion } from '@/components/motion/HomepageMotion';
import { getPageBySlug } from '@/lib/cms/pages';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return {
      title: 'Page not found',
    };
  }

  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription || undefined,
  };
}

export default async function CmsPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const blocks = (page.layout as Array<{ blockType: string; id?: string | null }> | null) ?? null;

  return (
    <HomepageMotion>
      <RenderBlocks blocks={blocks} motion />
    </HomepageMotion>
  );
}
