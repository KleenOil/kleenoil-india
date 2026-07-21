import type { Block } from 'payload';

import { eyebrowField, linkArrayField } from '../shared';

export const Hero: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  fields: [
    eyebrowField,
    {
      name: 'headline',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Primary hero headline. Use line breaks for multi-line titles.',
      },
    },
    {
      name: 'subheadline',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    linkArrayField({ name: 'ctas', label: 'CTAs', maxRows: 2 }),
    {
      name: 'metaStats',
      type: 'array',
      label: 'Meta Stats',
      maxRows: 4,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
};
