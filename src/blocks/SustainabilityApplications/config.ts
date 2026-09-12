import type { Block } from 'payload';

import { descriptionField, eyebrowField, headingField } from '../shared';

export const SustainabilityApplications: Block = {
  slug: 'sustainability-applications',
  labels: {
    singular: 'Sustainability Applications',
    plural: 'Sustainability Applications',
  },
  fields: [
    eyebrowField,
    headingField,
    descriptionField,
    {
      name: 'cards',
      type: 'array',
      label: 'Applications',
      maxRows: 6,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
  ],
};
