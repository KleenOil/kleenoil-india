import type { Block } from 'payload';

import { AboutOrigin } from './AboutOrigin/config';
import { AmcCoverage } from './AmcCoverage/config';
import { AmcCta } from './AmcCta/config';
import { AmcHero } from './AmcHero/config';
import { AmcIndustries } from './AmcIndustries/config';
import { AmcProof } from './AmcProof/config';
import { AmcVisit } from './AmcVisit/config';
import { AmcWhy } from './AmcWhy/config';
import { AboutStory } from './AboutStory/config';
import { ArticlesFeatured } from './ArticlesFeatured/config';
import { ArticlesHero } from './ArticlesHero/config';
import { ArticlesIndex } from './ArticlesIndex/config';
import { CareersHero } from './CareersHero/config';
import { CareersIndex } from './CareersIndex/config';
import { ContactChannels } from './ContactChannels/config';
import { ContactHero } from './ContactHero/config';
import { ContactPreview } from './ContactPreview/config';
import { ContactProcess } from './ContactProcess/config';
import { CsCta } from './CsCta/config';
import { CsFeatured } from './CsFeatured/config';
import { CsHero } from './CsHero/config';
import { CsIndex } from './CsIndex/config';
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
import { SustainabilityApplications } from './SustainabilityApplications/config';
import { SustainabilityCircular } from './SustainabilityCircular/config';
import { ServicesCta } from './ServicesCta/config';
import { ServicesFluids } from './ServicesFluids/config';
import { ServicesHero } from './ServicesHero/config';
import { ServicesIndustries } from './ServicesIndustries/config';
import { ServicesOfferings } from './ServicesOfferings/config';
import { ServicesProgram } from './ServicesProgram/config';
import { ServicesVisit } from './ServicesVisit/config';
import { SustainabilityCta } from './SustainabilityCta/config';
import { SustainabilityDrop } from './SustainabilityDrop/config';
import { SustainabilityHero } from './SustainabilityHero/config';
import { SustainabilityImpact } from './SustainabilityImpact/config';
import { SustainabilityNumbers } from './SustainabilityNumbers/config';
import { Team } from './Team/config';
import { Testimonials } from './Testimonials/config';
import { TrustIndicators } from './TrustIndicators/config';
import { WhatsNew } from './WhatsNew/config';

/** Payload block configs registered on the Pages collection.
 *  New entries need an idempotent `*_page_blocks` migration so local admin
 *  does not go blank (see ensurePageBlockTables). */
export const pageBlocks: Block[] = [
  Hero,
  ArticlesHero,
  ArticlesFeatured,
  ArticlesIndex,
  CareersHero,
  CareersIndex,
  CsHero,
  CsFeatured,
  CsIndex,
  CsCta,
  ContactHero,
  ContactProcess,
  ContactChannels,
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
  SustainabilityHero,
  SustainabilityImpact,
  SustainabilityCircular,
  SustainabilityDrop,
  SustainabilityNumbers,
  SustainabilityApplications,
  SustainabilityCta,
  ServicesHero,
  ServicesOfferings,
  ServicesFluids,
  ServicesProgram,
  ServicesVisit,
  ServicesIndustries,
  ServicesCta,
  AmcHero,
  AmcWhy,
  AmcCoverage,
  AmcVisit,
  AmcIndustries,
  AmcProof,
  AmcCta,
];

export type PageBlockSlug = (typeof pageBlocks)[number]['slug'];
