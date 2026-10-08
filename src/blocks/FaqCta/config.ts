import type { Block } from 'payload';

import { eyebrowField, headingField, linkArrayField } from '../shared';

export const FaqCta: Block = {
  slug: 'faq-cta',
  labels: {
    singular: 'FAQ CTA',
    plural: 'FAQ CTAs',
  },
  fields: [eyebrowField, headingField, linkArrayField({ name: 'ctas', label: 'CTAs', maxRows: 1 })],
};
