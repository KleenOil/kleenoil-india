import type { Block } from 'payload';

import { eyebrowField, headingField, linkArrayField } from '../shared';

export const SustainabilityCta: Block = {
  slug: 'sustainability-cta',
  labels: {
    singular: 'Sustainability CTA',
    plural: 'Sustainability CTAs',
  },
  fields: [
    eyebrowField,
    headingField,
    {
      name: 'subtext',
      type: 'textarea',
      label: 'Subtext',
    },
    linkArrayField({ name: 'ctas', label: 'CTAs', maxRows: 1 }),
  ],
};
