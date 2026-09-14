import { AboutOriginBlock, type AboutOriginBlockData } from '@/blocks/AboutOrigin/Component';
import { AboutStoryBlock, type AboutStoryBlockData } from '@/blocks/AboutStory/Component';
import {
  ArticlesFeaturedBlock,
  type ArticlesFeaturedBlockData,
} from '@/blocks/ArticlesFeatured/Component';
import { ArticlesHeroBlock, type ArticlesHeroBlockData } from '@/blocks/ArticlesHero/Component';
import { ArticlesIndexBlock, type ArticlesIndexBlockData } from '@/blocks/ArticlesIndex/Component';
import { CareersHeroBlock, type CareersHeroBlockData } from '@/blocks/CareersHero/Component';
import { CareersIndexBlock, type CareersIndexBlockData } from '@/blocks/CareersIndex/Component';
import { CsCtaBlock, type CsCtaBlockData } from '@/blocks/CsCta/Component';
import { CsFeaturedBlock, type CsFeaturedBlockData } from '@/blocks/CsFeatured/Component';
import { CsHeroBlock, type CsHeroBlockData } from '@/blocks/CsHero/Component';
import { CsIndexBlock, type CsIndexBlockData } from '@/blocks/CsIndex/Component';
import {
  ContactChannelsBlock,
  type ContactChannelsBlockData,
} from '@/blocks/ContactChannels/Component';
import { ContactHeroBlock, type ContactHeroBlockData } from '@/blocks/ContactHero/Component';
import {
  ContactPreviewBlock,
  type ContactPreviewBlockData,
} from '@/blocks/ContactPreview/Component';
import {
  ContactProcessBlock,
  type ContactProcessBlockData,
} from '@/blocks/ContactProcess/Component';
import { CtaBlock, type CtaBlockData } from '@/blocks/CTA/Component';
import {
  DistributionNetworkBlock,
  type DistributionNetworkBlockData,
} from '@/blocks/DistributionNetwork/Component';
import { FaqAccordionBlock, type FaqAccordionBlockData } from '@/blocks/FaqAccordion/Component';
import {
  FeaturedCaseStudiesBlock,
  type FeaturedCaseStudiesBlockData,
} from '@/blocks/FeaturedCaseStudies/Component';
import {
  FeaturedIndustriesBlock,
  type FeaturedIndustriesBlockData,
} from '@/blocks/FeaturedIndustries/Component';
import {
  FeaturedProductsBlock,
  type FeaturedProductsBlockData,
} from '@/blocks/FeaturedProducts/Component';
import {
  FeaturedServicesBlock,
  type FeaturedServicesBlockData,
} from '@/blocks/FeaturedServices/Component';
import { HeroBlock, type HeroBlockData } from '@/blocks/Hero/Component';
import { ManifestoBlock, type ManifestoBlockData } from '@/blocks/Manifesto/Component';
import { ProcessStoryBlock, type ProcessStoryBlockData } from '@/blocks/ProcessStory/Component';
import { RichContentBlock, type RichContentBlockData } from '@/blocks/RichContent/Component';
import { StatisticsBlock, type StatisticsBlockData } from '@/blocks/Statistics/Component';
import {
  SustainabilityApplicationsBlock,
  type SustainabilityApplicationsBlockData,
} from '@/blocks/SustainabilityApplications/Component';
import {
  SustainabilityCircularBlock,
  type SustainabilityCircularBlockData,
} from '@/blocks/SustainabilityCircular/Component';
import {
  SustainabilityCtaBlock,
  type SustainabilityCtaBlockData,
} from '@/blocks/SustainabilityCta/Component';
import {
  SustainabilityDropBlock,
  type SustainabilityDropBlockData,
} from '@/blocks/SustainabilityDrop/Component';
import {
  SustainabilityHeroBlock,
  type SustainabilityHeroBlockData,
} from '@/blocks/SustainabilityHero/Component';
import {
  SustainabilityImpactBlock,
  type SustainabilityImpactBlockData,
} from '@/blocks/SustainabilityImpact/Component';
import {
  SustainabilityNumbersBlock,
  type SustainabilityNumbersBlockData,
} from '@/blocks/SustainabilityNumbers/Component';
import { TeamBlock, type TeamBlockData } from '@/blocks/Team/Component';
import { TestimonialsBlock, type TestimonialsBlockData } from '@/blocks/Testimonials/Component';
import {
  TrustIndicatorsBlock,
  type TrustIndicatorsBlockData,
} from '@/blocks/TrustIndicators/Component';
import { WhatsNewBlock, type WhatsNewBlockData } from '@/blocks/WhatsNew/Component';
import { RevealSection } from '@/components/motion/RevealSection';
import type { ReactNode } from 'react';

type LayoutBlock = {
  blockType: string;
  id?: string | null;
  [key: string]: unknown;
};

type RenderBlocksProps = {
  blocks: LayoutBlock[] | null | undefined;
  motion?: boolean;
  /** When true and blocks are empty, render the design homepage fallback. */
  fallbackToHomepage?: boolean;
};

type RevealOptions = {
  variant?: 'hero' | 'section' | 'cta';
  stagger?: boolean;
};

function wrapReveal(key: string, node: ReactNode, motion: boolean, options?: RevealOptions) {
  if (!motion) {
    return <div key={key}>{node}</div>;
  }

  return (
    <RevealSection key={key} variant={options?.variant} stagger={options?.stagger}>
      {node}
    </RevealSection>
  );
}

function HomepageFallback({ motion }: { motion: boolean }) {
  return (
    <>
      {wrapReveal('hero', <HeroBlock />, motion, { variant: 'hero' })}
      {wrapReveal('statistics', <StatisticsBlock />, motion, { stagger: true })}
      {wrapReveal('trust', <TrustIndicatorsBlock />, motion)}
      {wrapReveal('products', <FeaturedProductsBlock />, motion, { stagger: true })}
      {wrapReveal('industries', <FeaturedIndustriesBlock />, motion, { stagger: true })}
      {wrapReveal('process', <ProcessStoryBlock />, motion, { stagger: true })}
      {wrapReveal('case-studies', <FeaturedCaseStudiesBlock />, motion, { stagger: true })}
      {wrapReveal('about', <AboutStoryBlock />, motion, { stagger: true })}
      {wrapReveal('team', <TeamBlock />, motion, { stagger: true })}
      {wrapReveal('testimonials', <TestimonialsBlock />, motion, { stagger: true })}
      {wrapReveal('contact', <ContactPreviewBlock />, motion)}
      {wrapReveal('cta', <CtaBlock />, motion, { variant: 'cta' })}
    </>
  );
}

/**
 * Server Component block renderer.
 * All V1 homepage blocks are registered here.
 */
export function RenderBlocks({
  blocks,
  motion = false,
  fallbackToHomepage = false,
}: RenderBlocksProps) {
  if (!blocks?.length) {
    if (fallbackToHomepage) {
      return <HomepageFallback motion={motion} />;
    }

    return null;
  }

  return (
    <>
      {blocks.map((block, index) => {
        const key = `${block.blockType}-${index}-${block.id ?? 'block'}`;

        switch (block.blockType) {
          case 'hero':
            return wrapReveal(key, <HeroBlock block={block as HeroBlockData} />, motion, {
              variant: 'hero',
            });
          case 'articles-hero':
            return wrapReveal(
              key,
              <ArticlesHeroBlock block={block as ArticlesHeroBlockData} />,
              motion,
              { variant: 'hero' },
            );
          case 'articles-featured':
            return wrapReveal(
              key,
              <ArticlesFeaturedBlock block={block as ArticlesFeaturedBlockData} />,
              motion,
              { stagger: true },
            );
          case 'articles-index':
            return wrapReveal(
              key,
              <ArticlesIndexBlock block={block as ArticlesIndexBlockData} />,
              motion,
              { stagger: true },
            );
          case 'careers-hero':
            return wrapReveal(
              key,
              <CareersHeroBlock block={block as CareersHeroBlockData} />,
              motion,
              { variant: 'hero' },
            );
          case 'careers-index':
            return wrapReveal(
              key,
              <CareersIndexBlock block={block as CareersIndexBlockData} />,
              motion,
              { stagger: true },
            );
          case 'cs-hero':
            return wrapReveal(key, <CsHeroBlock block={block as CsHeroBlockData} />, motion, {
              variant: 'hero',
            });
          case 'cs-featured':
            return wrapReveal(
              key,
              <CsFeaturedBlock block={block as CsFeaturedBlockData} />,
              motion,
              { stagger: true },
            );
          case 'cs-index':
            return wrapReveal(key, <CsIndexBlock block={block as CsIndexBlockData} />, motion, {
              stagger: true,
            });
          case 'cs-cta':
            return wrapReveal(key, <CsCtaBlock block={block as CsCtaBlockData} />, motion, {
              variant: 'cta',
            });
          case 'contact-hero':
            return wrapReveal(
              key,
              <ContactHeroBlock block={block as ContactHeroBlockData} />,
              motion,
              { variant: 'hero' },
            );
          case 'contact-process':
            return wrapReveal(
              key,
              <ContactProcessBlock block={block as ContactProcessBlockData} />,
              motion,
              { stagger: true },
            );
          case 'contact-channels':
            return wrapReveal(
              key,
              <ContactChannelsBlock block={block as ContactChannelsBlockData} />,
              motion,
            );
          case 'manifesto':
            return wrapReveal(key, <ManifestoBlock block={block as ManifestoBlockData} />, motion, {
              stagger: true,
            });
          case 'about-origin':
            return wrapReveal(
              key,
              <AboutOriginBlock block={block as AboutOriginBlockData} />,
              motion,
              { stagger: true },
            );
          case 'about-story':
            return wrapReveal(
              key,
              <AboutStoryBlock block={block as AboutStoryBlockData} />,
              motion,
              { stagger: true },
            );
          case 'trust-indicators':
            return wrapReveal(
              key,
              <TrustIndicatorsBlock block={block as TrustIndicatorsBlockData} />,
              motion,
            );
          case 'team':
            return wrapReveal(key, <TeamBlock block={block as TeamBlockData} />, motion, {
              stagger: true,
            });
          case 'whats-new':
            return wrapReveal(key, <WhatsNewBlock block={block as WhatsNewBlockData} />, motion, {
              stagger: true,
            });
          case 'distribution-network':
            return wrapReveal(
              key,
              <DistributionNetworkBlock block={block as DistributionNetworkBlockData} />,
              motion,
              { stagger: true },
            );
          case 'faq-accordion':
            return wrapReveal(
              key,
              <FaqAccordionBlock block={block as FaqAccordionBlockData} />,
              motion,
              { stagger: true },
            );
          case 'cta':
            return wrapReveal(key, <CtaBlock block={block as CtaBlockData} />, motion, {
              variant: 'cta',
            });
          case 'statistics':
            return wrapReveal(
              key,
              <StatisticsBlock block={block as StatisticsBlockData} />,
              motion,
              {
                stagger: true,
              },
            );
          case 'featured-products':
            return wrapReveal(
              key,
              <FeaturedProductsBlock block={block as FeaturedProductsBlockData} />,
              motion,
              { stagger: true },
            );
          case 'featured-industries':
            return wrapReveal(
              key,
              <FeaturedIndustriesBlock block={block as FeaturedIndustriesBlockData} />,
              motion,
              { stagger: true },
            );
          case 'featured-services':
            return wrapReveal(
              key,
              <FeaturedServicesBlock block={block as FeaturedServicesBlockData} />,
              motion,
              { stagger: true },
            );
          case 'process-story':
            return wrapReveal(
              key,
              <ProcessStoryBlock block={block as ProcessStoryBlockData} />,
              motion,
              { stagger: true },
            );
          case 'featured-case-studies':
            return wrapReveal(
              key,
              <FeaturedCaseStudiesBlock block={block as FeaturedCaseStudiesBlockData} />,
              motion,
              { stagger: true },
            );
          case 'testimonials':
            return wrapReveal(
              key,
              <TestimonialsBlock block={block as TestimonialsBlockData} />,
              motion,
              { stagger: true },
            );
          case 'contact-preview':
            return wrapReveal(
              key,
              <ContactPreviewBlock block={block as ContactPreviewBlockData} />,
              motion,
            );
          case 'rich-content':
            return wrapReveal(
              key,
              <RichContentBlock block={block as RichContentBlockData} />,
              motion,
            );
          case 'sustainability-hero':
            return wrapReveal(
              key,
              <SustainabilityHeroBlock block={block as SustainabilityHeroBlockData} />,
              motion,
              { variant: 'hero' },
            );
          case 'sustainability-impact':
            return wrapReveal(
              key,
              <SustainabilityImpactBlock block={block as SustainabilityImpactBlockData} />,
              motion,
              { stagger: true },
            );
          case 'sustainability-circular':
            return wrapReveal(
              key,
              <SustainabilityCircularBlock block={block as SustainabilityCircularBlockData} />,
              motion,
            );
          case 'sustainability-drop':
            return wrapReveal(
              key,
              <SustainabilityDropBlock block={block as SustainabilityDropBlockData} />,
              motion,
            );
          case 'sustainability-numbers':
            return wrapReveal(
              key,
              <SustainabilityNumbersBlock block={block as SustainabilityNumbersBlockData} />,
              motion,
              { stagger: true },
            );
          case 'sustainability-applications':
            return wrapReveal(
              key,
              <SustainabilityApplicationsBlock
                block={block as SustainabilityApplicationsBlockData}
              />,
              motion,
              { stagger: true },
            );
          case 'sustainability-cta':
            return wrapReveal(
              key,
              <SustainabilityCtaBlock block={block as SustainabilityCtaBlockData} />,
              motion,
              { variant: 'cta' },
            );
          default:
            return (
              <section
                key={key}
                data-block={block.blockType}
                className="border-b border-border-subtle px-6 py-16"
              >
                <div className="mx-auto max-w-5xl">
                  <p className="mb-2 font-mono text-xs font-bold tracking-widest text-brand-primary uppercase">
                    {block.blockType}
                  </p>
                  <p className="text-sm text-text-secondary">
                    Unknown block type <code className="font-mono">{block.blockType}</code>.
                  </p>
                </div>
              </section>
            );
        }
      })}
    </>
  );
}
