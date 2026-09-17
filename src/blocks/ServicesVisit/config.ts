import type { Block } from 'payload';

import { eyebrowField, headingField } from '../shared';

export const ServicesVisit: Block = {
  slug: 'services-visit',
  labels: {
    singular: 'Services Visit',
    plural: 'Services Visits',
  },
  fields: [
    eyebrowField,
    headingField,
    {
      name: 'steps',
      type: 'array',
      label: 'Visit steps',
      maxRows: 3,
      fields: [
        { name: 'n', type: 'text', label: 'Number', required: true },
        { name: 'icon', type: 'text', label: 'Icon key' },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
        },
      ],
    },
  ],
};
