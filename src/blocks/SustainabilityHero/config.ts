import type { Block } from 'payload';

import { eyebrowField, headingField, linkArrayField } from '../shared';

export const SustainabilityHero: Block = {
  slug: 'sustainability-hero',
  labels: {
    singular: 'Sustainability Hero',
    plural: 'Sustainability Heroes',
  },
  fields: [
    eyebrowField,
    headingField,
    {
      name: 'lead',
      type: 'textarea',
      label: 'Lead',
    },
    {
      name: 'body',
      type: 'textarea',
      label: 'Body',
    },
    linkArrayField({ name: 'ctas', label: 'CTAs', maxRows: 1 }),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Background image',
    },
    {
      name: 'pills',
      type: 'array',
      label: 'Bottom pills',
      maxRows: 4,
      fields: [
        { name: 'n', type: 'text', label: 'Number', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
};
