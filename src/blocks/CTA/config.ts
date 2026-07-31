import type { Block } from 'payload';

import { eyebrowField, headingField, linkArrayField } from '../shared';

export const CTA: Block = {
  slug: 'cta',
  labels: {
    singular: 'CTA',
    plural: 'CTAs',
  },
  fields: [
    eyebrowField,
    headingField,
    {
      name: 'subtext',
      type: 'textarea',
      label: 'Subtext',
      admin: {
        description: 'Supporting copy under the heading.',
      },
    },
    linkArrayField({ name: 'ctas', label: 'CTAs', maxRows: 2 }),
    {
      name: 'trustBadges',
      type: 'array',
      label: 'Trust Badges',
      fields: [{ name: 'label', type: 'text', required: true }],
    },
  ],
};
