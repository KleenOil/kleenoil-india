import type { Block } from 'payload';

import { eyebrowField, headingField, linkArrayField } from '../shared';

export const AmcHero: Block = {
  slug: 'amc-hero',
  labels: {
    singular: 'AMC Hero',
    plural: 'AMC Heroes',
  },
  fields: [
    eyebrowField,
    headingField,
    { name: 'lead', type: 'textarea', label: 'Lead' },
    { name: 'note', type: 'text', label: 'Fine print' },
    linkArrayField({ name: 'ctas', label: 'CTAs', maxRows: 1 }),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero image',
    },
    {
      name: 'points',
      type: 'array',
      label: 'Contract points',
      maxRows: 3,
      fields: [
        { name: 'n', type: 'text', label: 'Number', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Year marks',
      maxRows: 3,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      name: 'quarters',
      type: 'array',
      label: 'Quarter bar',
      maxRows: 4,
      fields: [
        { name: 'code', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
};
