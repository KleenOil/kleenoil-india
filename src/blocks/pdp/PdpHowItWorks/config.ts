import type { Block, Field } from 'payload';

import { eyebrowField, headingField, descriptionField } from '../../shared';
import { withDataSource } from '../shared';

const fields: Field[] = [
  eyebrowField,
  headingField,
  descriptionField,
  {
    name: 'steps',
    type: 'array',
    label: 'Steps',
    minRows: 1,
    maxRows: 6,
    fields: [
      { name: 'label', type: 'text', label: 'Step label', required: true },
      { name: 'title', type: 'text', required: true },
      { name: 'description', type: 'textarea' },
    ],
  },
];

function block(blockFields: Field[]): Block {
  return {
    slug: 'pdp-how-it-works',
    labels: {
      singular: 'PDP How It Works',
      plural: 'PDP How It Works',
    },
    fields: blockFields,
  };
}

export const PdpHowItWorksTemplate = block(fields);
export const PdpHowItWorks = block(withDataSource(fields));
