import type { Block } from 'payload';

import { eyebrowField, headingField } from '../shared';

export const ContactProcess: Block = {
  slug: 'contact-process',
  labels: {
    singular: 'Contact Process',
    plural: 'Contact Processes',
  },
  fields: [
    eyebrowField,
    headingField,
    {
      name: 'steps',
      type: 'array',
      label: 'Steps',
      minRows: 1,
      maxRows: 4,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
  ],
};
