import type { Block } from 'payload';

import { linkArrayField, sectionHeaderFields } from '../shared';

export const CTA: Block = {
  slug: 'cta',
  labels: {
    singular: 'CTA',
    plural: 'CTAs',
  },
  fields: [
    ...sectionHeaderFields,
    {
      name: 'subtext',
      type: 'textarea',
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
