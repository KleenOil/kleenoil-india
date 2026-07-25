import type { Block, Field } from 'payload';

import { eyebrowField, headingField, descriptionField } from '../../shared';
import { withDataSource } from '../shared';

const fields: Field[] = [
  eyebrowField,
  headingField,
  descriptionField,
  {
    name: 'cards',
    type: 'array',
    label: 'Problem Cards',
    maxRows: 6,
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'description', type: 'textarea' },
      { name: 'stat', type: 'text', label: 'Stat / callout' },
    ],
  },
];

function block(blockFields: Field[]): Block {
  return {
    slug: 'pdp-contamination',
    labels: {
      singular: 'PDP Contamination',
      plural: 'PDP Contamination',
    },
    fields: blockFields,
  };
}

export const PdpContaminationTemplate = block(fields);
export const PdpContamination = block(withDataSource(fields));
