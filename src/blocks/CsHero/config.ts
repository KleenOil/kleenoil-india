import type { Block } from 'payload';

import { eyebrowField, headingField, linkField } from '../shared';

export const CsHero: Block = {
  slug: 'cs-hero',
  labels: {
    singular: 'CS Banner',
    plural: 'CS Banners',
  },
  fields: [
    eyebrowField,
    headingField,
    {
      name: 'subheadline',
      type: 'textarea',
      label: 'Subheadline',
    },
    {
      name: 'watermark',
      type: 'text',
      label: 'Watermark',
      admin: {
        description: 'Large word behind the copy. Defaults to PROOF.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Background image',
    },
    linkField({ name: 'cta', label: 'CTA', appearances: true }),
    {
      name: 'stats',
      type: 'array',
      label: 'Ticker stats',
      maxRows: 4,
      admin: {
        description: 'Bar along the bottom of the banner. Up to four values.',
      },
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
};
