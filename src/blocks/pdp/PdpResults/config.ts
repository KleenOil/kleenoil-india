import type { Block, Field } from 'payload';

import { eyebrowField, headingField, descriptionField } from '../../shared';
import { withDataSource } from '../shared';

const fields: Field[] = [
  eyebrowField,
  headingField,
  descriptionField,
  {
    name: 'results',
    type: 'array',
    label: 'Result Cards',
    maxRows: 6,
    fields: [
      { name: 'tag', type: 'text' },
      { name: 'title', type: 'text', required: true },
      { name: 'description', type: 'textarea' },
      {
        name: 'metrics',
        type: 'array',
        maxRows: 4,
        fields: [
          { name: 'value', type: 'text', required: true },
          { name: 'label', type: 'text', required: true },
        ],
      },
    ],
  },
];

function block(blockFields: Field[]): Block {
  return {
    slug: 'pdp-results',
    labels: {
      singular: 'PDP Results',
      plural: 'PDP Results',
    },
    fields: blockFields,
  };
}

export const PdpResultsTemplate = block(fields);
export const PdpResults = block(withDataSource(fields));
