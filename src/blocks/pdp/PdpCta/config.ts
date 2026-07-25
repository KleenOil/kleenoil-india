import type { Block, Field } from 'payload';

import { eyebrowField, headingField } from '../../shared';
import { linkArrayField, withDataSource } from '../shared';

const fields: Field[] = [
  eyebrowField,
  headingField,
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
];

function block(blockFields: Field[]): Block {
  return {
    slug: 'pdp-cta',
    labels: {
      singular: 'PDP CTA',
      plural: 'PDP CTAs',
    },
    fields: blockFields,
  };
}

export const PdpCtaTemplate = block(fields);
export const PdpCta = block(withDataSource(fields));
