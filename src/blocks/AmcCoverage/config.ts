import type { Block } from 'payload';

import { eyebrowField, headingField } from '../shared';

export const AmcCoverage: Block = {
  slug: 'amc-coverage',
  labels: {
    singular: 'AMC Coverage',
    plural: 'AMC Coverage',
  },
  fields: [
    eyebrowField,
    headingField,
    { name: 'lead', type: 'textarea', label: 'Lead' },
    {
      name: 'cards',
      type: 'array',
      label: 'Coverage cards',
      maxRows: 8,
      fields: [
        { name: 'icon', type: 'text', label: 'Icon' },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
  ],
};
