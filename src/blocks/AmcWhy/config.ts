import type { Block } from 'payload';

import { headingField } from '../shared';

export const AmcWhy: Block = {
  slug: 'amc-why',
  labels: {
    singular: 'AMC Why',
    plural: 'AMC Why',
  },
  fields: [
    { name: 'kicker', type: 'text', label: 'Kicker' },
    headingField,
    { name: 'lead', type: 'textarea', label: 'Lead' },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Illustration',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Benefits',
      maxRows: 5,
      fields: [
        { name: 'n', type: 'text', label: 'Number', required: true },
        { name: 'icon', type: 'text', label: 'Icon' },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
  ],
};
