import type { Block } from 'payload';

import { sectionHeaderFields } from '../shared';

export const FeaturedIndustries: Block = {
  slug: 'featured-industries',
  labels: {
    singular: 'Featured Industries',
    plural: 'Featured Industries',
  },
  fields: [...sectionHeaderFields],
};
