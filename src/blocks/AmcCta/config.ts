import type { Block } from 'payload';

import { eyebrowField, headingField, linkArrayField } from '../shared';

export const AmcCta: Block = {
  slug: 'amc-cta',
  labels: {
    singular: 'AMC CTA',
    plural: 'AMC CTAs',
  },
  fields: [
    eyebrowField,
    headingField,
    { name: 'subtext', type: 'textarea', label: 'Subtext' },
    linkArrayField({ name: 'ctas', label: 'CTAs', maxRows: 2 }),
  ],
};
