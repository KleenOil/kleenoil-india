import type { Block, Field } from 'payload';

import { eyebrowField, headingField, descriptionField } from '../../shared';
import { withDataSource } from '../shared';

const fields: Field[] = [
  eyebrowField,
  headingField,
  descriptionField,
  {
    name: 'machines',
    type: 'array',
    label: 'Machines',
    maxRows: 12,
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'description', type: 'textarea' },
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
      },
    ],
  },
];

function block(blockFields: Field[]): Block {
  return {
    slug: 'pdp-machines',
    labels: {
      singular: 'PDP Machines',
      plural: 'PDP Machines',
    },
    fields: blockFields,
  };
}

export const PdpMachinesTemplate = block(fields);
export const PdpMachines = block(withDataSource(fields));
