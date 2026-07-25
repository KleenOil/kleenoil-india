import type { Block } from 'payload';

import { PdpContamination, PdpContaminationTemplate } from './PdpContamination/config';
import { PdpCta, PdpCtaTemplate } from './PdpCta/config';
import { PdpHero, PdpHeroTemplate } from './PdpHero/config';
import { PdpHowItWorks, PdpHowItWorksTemplate } from './PdpHowItWorks/config';
import { PdpMachines, PdpMachinesTemplate } from './PdpMachines/config';
import { PdpModels, PdpModelsTemplate } from './PdpModels/config';
import { PdpRelated, PdpRelatedTemplate } from './PdpRelated/config';
import { PdpResults, PdpResultsTemplate } from './PdpResults/config';

/** Blocks for Product documents — includes Common/Custom data source. */
export const pdpBlocks: Block[] = [
  PdpHero,
  PdpContamination,
  PdpHowItWorks,
  PdpMachines,
  PdpModels,
  PdpResults,
  PdpRelated,
  PdpCta,
];

/** Blocks for Product Template documents — all content fields always editable. */
export const pdpTemplateBlocks: Block[] = [
  PdpHeroTemplate,
  PdpContaminationTemplate,
  PdpHowItWorksTemplate,
  PdpMachinesTemplate,
  PdpModelsTemplate,
  PdpResultsTemplate,
  PdpRelatedTemplate,
  PdpCtaTemplate,
];

export type PdpBlockSlug = (typeof pdpBlocks)[number]['slug'];
