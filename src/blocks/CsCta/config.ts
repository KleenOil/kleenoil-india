import type { Block } from 'payload';

import { eyebrowField, headingField, linkArrayField } from '../shared';

export const CsCta: Block = {
  slug: 'cs-cta',
  labels: {
    singular: 'CS CTA',
    plural: 'CS CTAs',
  },
  fields: [
    eyebrowField,
    headingField,
    {
      name: 'subtext',
      type: 'textarea',
      label: 'Subtext',
    },
    linkArrayField({ name: 'ctas', label: 'CTAs', maxRows: 2 }),
  ],
};
