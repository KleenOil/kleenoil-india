import type { Block } from 'payload';

import { descriptionField, eyebrowField, headingField } from '../shared';

export const SustainabilityImpact: Block = {
  slug: 'sustainability-impact',
  labels: {
    singular: 'Sustainability Impact',
    plural: 'Sustainability Impact',
  },
  fields: [
    eyebrowField,
    headingField,
    descriptionField,
    {
      name: 'cards',
      type: 'array',
      label: 'Impact cards',
      maxRows: 4,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
  ],
};
