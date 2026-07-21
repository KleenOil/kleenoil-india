import type { Block } from 'payload';

import { sectionHeaderFields } from '../shared';

export const Testimonials: Block = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonials',
    plural: 'Testimonials',
  },
  fields: [
    ...sectionHeaderFields,
    {
      name: 'items',
      type: 'array',
      label: 'Testimonials',
      fields: [
        { name: 'quote', type: 'textarea', required: true },
        { name: 'clientName', type: 'text', required: true },
        { name: 'company', type: 'text' },
        { name: 'position', type: 'text' },
        { name: 'photo', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
};
