import type { Block } from 'payload';

import { headingField } from '../shared';

export const AmcIndustries: Block = {
  slug: 'amc-industries',
  labels: {
    singular: 'AMC Industries',
    plural: 'AMC Industries',
  },
  fields: [
    { name: 'kicker', type: 'text', label: 'Kicker' },
    headingField,
    {
      name: 'photos',
      type: 'array',
      label: 'Photos',
      maxRows: 4,
      fields: [
        { name: 'label', type: 'text', required: true },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
        },
      ],
    },
    {
      name: 'chips',
      type: 'array',
      label: 'Chips',
      fields: [{ name: 'label', type: 'text', required: true }],
    },
  ],
};
