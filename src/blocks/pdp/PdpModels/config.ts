import type { Block, Field } from 'payload';

import { eyebrowField, headingField, descriptionField } from '../../shared';
import { withDataSource } from '../shared';

const fields: Field[] = [
  eyebrowField,
  headingField,
  descriptionField,
  {
    name: 'columns',
    type: 'array',
    label: 'Table Columns',
    maxRows: 8,
    fields: [{ name: 'label', type: 'text', required: true }],
  },
  {
    name: 'models',
    type: 'array',
    label: 'Models',
    maxRows: 20,
    fields: [
      { name: 'name', type: 'text', required: true },
      {
        name: 'values',
        type: 'array',
        label: 'Cell Values',
        fields: [{ name: 'value', type: 'text', required: true }],
      },
    ],
  },
];

function block(blockFields: Field[]): Block {
  return {
    slug: 'pdp-models',
    labels: {
      singular: 'PDP Models',
      plural: 'PDP Models',
    },
    fields: blockFields,
  };
}

export const PdpModelsTemplate = block(fields);
export const PdpModels = block(withDataSource(fields));
