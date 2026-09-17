import type { Block } from 'payload';

import { eyebrowField, headingField } from '../shared';

export const AmcVisit: Block = {
  slug: 'amc-visit',
  labels: {
    singular: 'AMC Visit',
    plural: 'AMC Visits',
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
        { name: 'icon', type: 'text', label: 'Icon' },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Photo',
        },
      ],
    },
  ],
};
