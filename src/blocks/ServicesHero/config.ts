import type { Block } from 'payload';

import { eyebrowField, headingField, linkArrayField } from '../shared';

export const ServicesHero: Block = {
  slug: 'services-hero',
  labels: {
    singular: 'Services Hero',
    plural: 'Services Heroes',
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
      label: 'Background image',
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Contract cards',
      maxRows: 3,
      fields: [
        { name: 'n', type: 'text', label: 'Number', required: true },
        { name: 'kicker', type: 'text', label: 'Kicker' },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
  ],
};
