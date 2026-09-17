import type { Block } from 'payload';

import { eyebrowField, headingField, linkArrayField } from '../shared';

export const ServicesCta: Block = {
  slug: 'services-cta',
  labels: {
    singular: 'Services CTA',
    plural: 'Services CTAs',
  },
  fields: [
    eyebrowField,
    headingField,
    { name: 'subtext', type: 'textarea', label: 'Subtext' },
    linkArrayField({ name: 'ctas', label: 'CTAs', maxRows: 2 }),
  ],
};
