import type { Block } from 'payload';

import { AboutStory } from './AboutStory/config';
import { ContactPreview } from './ContactPreview/config';
import { CTA } from './CTA/config';
import { FeaturedCaseStudies } from './FeaturedCaseStudies/config';
import { FeaturedIndustries } from './FeaturedIndustries/config';
import { FeaturedProducts } from './FeaturedProducts/config';
import { FeaturedServices } from './FeaturedServices/config';
import { Hero } from './Hero/config';
import { ProcessStory } from './ProcessStory/config';
import { RichContent } from './RichContent/config';
import { Statistics } from './Statistics/config';
import { Team } from './Team/config';
import { Testimonials } from './Testimonials/config';
import { TrustIndicators } from './TrustIndicators/config';

/** Payload block configs registered on the Pages collection. */
export const pageBlocks: Block[] = [
  Hero,
  TrustIndicators,
  Statistics,
  FeaturedProducts,
  FeaturedIndustries,
  FeaturedServices,
  ProcessStory,
  FeaturedCaseStudies,
  AboutStory,
  Testimonials,
  Team,
  CTA,
  ContactPreview,
  RichContent,
];

export type PageBlockSlug = (typeof pageBlocks)[number]['slug'];
