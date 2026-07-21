import type { Block } from 'payload';

import { linkField, sectionHeaderFields } from '../shared';

export const FeaturedCaseStudies: Block = {
  slug: 'featured-case-studies',
  labels: {
    singular: 'Featured Case Studies',
    plural: 'Featured Case Studies',
  },
  fields: [
    ...sectionHeaderFields,
    linkField({ name: 'cta', label: 'Section CTA', appearances: true }),
  ],
};
