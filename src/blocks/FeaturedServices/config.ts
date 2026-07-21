import type { Block } from 'payload';

import { linkField, sectionHeaderFields } from '../shared';

export const FeaturedServices: Block = {
  slug: 'featured-services',
  labels: {
    singular: 'Featured Services',
    plural: 'Featured Services',
  },
  fields: [
    ...sectionHeaderFields,
    linkField({ name: 'cta', label: 'Section CTA', appearances: true }),
  ],
};
