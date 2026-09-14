import type { ReactNode } from 'react';

import {
  PdpContaminationBlock,
  type PdpContaminationBlockData,
} from '@/blocks/pdp/PdpContamination/Component';
import { PdpCtaBlock, type PdpCtaBlockData } from '@/blocks/pdp/PdpCta/Component';
import { PdpHeroBlock, type PdpHeroBlockData } from '@/blocks/pdp/PdpHero/Component';
import {
  PdpHowItWorksBlock,
  type PdpHowItWorksBlockData,
} from '@/blocks/pdp/PdpHowItWorks/Component';
import { PdpMachinesBlock, type PdpMachinesBlockData } from '@/blocks/pdp/PdpMachines/Component';
import { PdpModelsBlock, type PdpModelsBlockData } from '@/blocks/pdp/PdpModels/Component';
import { PdpRelatedBlock, type PdpRelatedBlockData } from '@/blocks/pdp/PdpRelated/Component';
import { PdpResultsBlock, type PdpResultsBlockData } from '@/blocks/pdp/PdpResults/Component';
import { RevealSection } from '@/components/motion/RevealSection';
import type { PdpLayoutBlock } from '@/lib/cms/resolve-pdp-layout';

type PdpRenderBlocksProps = {
  blocks: PdpLayoutBlock[] | null | undefined;
  productName?: string | null;
  featuredImageUrl?: string | null;
  motion?: boolean;
};

type RevealVariant = 'hero' | 'section' | 'cta';

function wrap(
  key: string,
  node: ReactNode,
  motion: boolean,
  stagger = true,
  variant: RevealVariant = 'section',
) {
  if (!motion) {
    return <div key={key}>{node}</div>;
  }

  return (
    <RevealSection key={key} variant={variant} stagger={stagger}>
      {node}
    </RevealSection>
  );
}

export function PdpRenderBlocks({
  blocks,
  productName,
  featuredImageUrl,
  motion = false,
}: PdpRenderBlocksProps) {
  if (!blocks?.length) {
    return (
      <>
        {wrap(
          'pdp-hero',
          <PdpHeroBlock productName={productName} featuredImageUrl={featuredImageUrl} />,
          motion,
        )}
        {wrap('pdp-contamination', <PdpContaminationBlock />, motion)}
        {wrap('pdp-how-it-works', <PdpHowItWorksBlock />, motion)}
        {wrap('pdp-machines', <PdpMachinesBlock />, motion)}
        {wrap('pdp-models', <PdpModelsBlock />, motion, false)}
        {wrap('pdp-results', <PdpResultsBlock />, motion)}
        {wrap('pdp-related', <PdpRelatedBlock />, motion)}
        {wrap('pdp-cta', <PdpCtaBlock />, motion, false, 'cta')}
      </>
    );
  }

  return (
    <>
      {blocks.map((block, index) => {
        const key = `${block.blockType}-${index}-${block.id ?? 'block'}`;

        switch (block.blockType) {
          case 'pdp-hero':
            return wrap(
              key,
              <PdpHeroBlock
                block={block as PdpHeroBlockData}
                productName={productName}
                featuredImageUrl={featuredImageUrl}
              />,
              motion,
            );
          case 'pdp-contamination':
            return wrap(
              key,
              <PdpContaminationBlock block={block as PdpContaminationBlockData} />,
              motion,
            );
          case 'pdp-how-it-works':
            return wrap(
              key,
              <PdpHowItWorksBlock block={block as PdpHowItWorksBlockData} />,
              motion,
            );
          case 'pdp-machines':
            return wrap(key, <PdpMachinesBlock block={block as PdpMachinesBlockData} />, motion);
          case 'pdp-models':
            return wrap(key, <PdpModelsBlock block={block as PdpModelsBlockData} />, motion, false);
          case 'pdp-results':
            return wrap(key, <PdpResultsBlock block={block as PdpResultsBlockData} />, motion);
          case 'pdp-related':
            return wrap(key, <PdpRelatedBlock block={block as PdpRelatedBlockData} />, motion);
          case 'pdp-cta':
            return wrap(
              key,
              <PdpCtaBlock block={block as PdpCtaBlockData} />,
              motion,
              false,
              'cta',
            );
          default:
            return null;
        }
      })}
    </>
  );
}
