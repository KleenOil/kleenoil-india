import type { Block } from 'payload';

import { descriptionField, eyebrowField, headingField } from '../shared';

export const SustainabilityNumbers: Block = {
  slug: 'sustainability-numbers',
  labels: {
    singular: 'Sustainability Numbers',
    plural: 'Sustainability Numbers',
  },
  fields: [
    eyebrowField,
    headingField,
    descriptionField,
    {
      name: 'stats',
      type: 'array',
      label: 'Figures',
      maxRows: 4,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      name: 'disclaimer',
      type: 'textarea',
      label: 'Disclaimer',
    },
  ],
};
