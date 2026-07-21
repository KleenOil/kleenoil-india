import type { Block } from 'payload';

import { linkField, sectionHeaderFields } from '../shared';

export const FeaturedProducts: Block = {
  slug: 'featured-products',
  labels: {
    singular: 'Featured Products',
    plural: 'Featured Products',
  },
  fields: [
    ...sectionHeaderFields,
    linkField({ name: 'cta', label: 'Section CTA', appearances: true }),
  ],
};
