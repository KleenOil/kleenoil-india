import type { Block, Field } from 'payload';

import { eyebrowField, headingField, descriptionField } from '../../shared';
import { withDataSource } from '../shared';

const csvImportField: Field = {
  name: 'csvImport',
  type: 'ui',
  admin: {
    components: {
      Field: '/components/admin/PdpModelsCsvImport#PdpModelsCsvImport',
    },
  },
};

const fields: Field[] = [
  csvImportField,
  eyebrowField,
  headingField,
  descriptionField,
  {
    name: 'columns',
    type: 'array',
    label: 'Table Columns',
    maxRows: 12,
    admin: {
      description:
        'First column is the model name (MODEL). Extra columns are FLOW, RESERVOIR, POWER, and so on.',
    },
    fields: [{ name: 'label', type: 'text', required: true }],
  },
  {
    name: 'models',
    type: 'array',
    label: 'Models',
    maxRows: 80,
    admin: {
      description: 'Prefer Import models from CSV. Cell Values must match the columns after MODEL.',
    },
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
