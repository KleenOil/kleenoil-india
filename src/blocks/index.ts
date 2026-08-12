import type { Block } from 'payload';

import { AboutOrigin } from './AboutOrigin/config';
import { AboutStory } from './AboutStory/config';
import { ContactPreview } from './ContactPreview/config';
import { CTA } from './CTA/config';
import { DistributionNetwork } from './DistributionNetwork/config';
import { FaqAccordion } from './FaqAccordion/config';
import { FeaturedCaseStudies } from './FeaturedCaseStudies/config';
import { FeaturedIndustries } from './FeaturedIndustries/config';
import { FeaturedProducts } from './FeaturedProducts/config';
import { FeaturedServices } from './FeaturedServices/config';
import { Hero } from './Hero/config';
import { Manifesto } from './Manifesto/config';
import { ProcessStory } from './ProcessStory/config';
import { RichContent } from './RichContent/config';
import { Statistics } from './Statistics/config';
import { Team } from './Team/config';
import { Testimonials } from './Testimonials/config';
import { TrustIndicators } from './TrustIndicators/config';
import { WhatsNew } from './WhatsNew/config';

/** Payload block configs registered on the Pages collection. */
export const pageBlocks: Block[] = [
  Hero,
  Manifesto,
  AboutOrigin,
  AboutStory,
  TrustIndicators,
  Team,
  WhatsNew,
  DistributionNetwork,
  FaqAccordion,
  CTA,
  Statistics,
  FeaturedProducts,
  FeaturedIndustries,
  FeaturedServices,
  ProcessStory,
  FeaturedCaseStudies,
  Testimonials,
  ContactPreview,
  RichContent,
];

export type PageBlockSlug = (typeof pageBlocks)[number]['slug'];
