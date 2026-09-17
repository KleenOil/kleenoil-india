import type { Block } from 'payload';

import { eyebrowField, headingField } from '../shared';

export const ServicesOfferings: Block = {
  slug: 'services-offerings',
  labels: {
    singular: 'Services Offerings',
    plural: 'Services Offerings',
  },
  fields: [
    eyebrowField,
    headingField,
    {
      name: 'cards',
      type: 'array',
      label: 'Offering cards',
      maxRows: 3,
      fields: [
        { name: 'n', type: 'text', label: 'Number', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
        { name: 'linkLabel', type: 'text', label: 'Link label' },
        { name: 'href', type: 'text', label: 'Link URL' },
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
