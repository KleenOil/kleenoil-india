import type { Block } from 'payload';

import { headingField } from '../shared';

export const TrustIndicators: Block = {
  slug: 'trust-indicators',
  labels: {
    singular: 'Trust Indicators',
    plural: 'Trust Indicators',
  },
  fields: [
    headingField,
    {
      name: 'logos',
      type: 'array',
      label: 'Client Logos',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
          label: 'Optional link',
        },
      ],
    },
  ],
};
