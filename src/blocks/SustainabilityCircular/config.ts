import type { Block } from 'payload';

import { descriptionField, eyebrowField, headingField } from '../shared';

export const SustainabilityCircular: Block = {
  slug: 'sustainability-circular',
  labels: {
    singular: 'Sustainability Circular',
    plural: 'Sustainability Circular',
  },
  fields: [
    eyebrowField,
    headingField,
    descriptionField,
    {
      name: 'steps',
      type: 'array',
      label: 'Steps',
      maxRows: 4,
      fields: [
        { name: 'n', type: 'text', label: 'Number', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
  ],
};
