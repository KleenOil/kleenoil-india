import type { Block } from 'payload';

import { sectionHeaderFields } from '../shared';

export const CsFeatured: Block = {
  slug: 'cs-featured',
  labels: {
    singular: 'CS Featured',
    plural: 'CS Featured',
  },
  fields: [
    ...sectionHeaderFields,
    {
      name: 'featuredStudy',
      type: 'relationship',
      relationTo: 'case-studies',
      label: 'Featured case study',
      admin: {
        description: 'Optional. Leave empty to feature the latest published study.',
      },
    },
  ],
};
