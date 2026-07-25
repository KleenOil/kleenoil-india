import type { Block, Field } from 'payload';

import { eyebrowField, headingField, descriptionField } from '../../shared';
import { withDataSource } from '../shared';

const fields: Field[] = [
  eyebrowField,
  headingField,
  descriptionField,
  {
    name: 'products',
    type: 'relationship',
    relationTo: 'products',
    hasMany: true,
    label: 'Related Products',
    admin: {
      description: 'Pick products to feature. Falls back to manual cards if empty.',
    },
  },
  {
    name: 'cards',
    type: 'array',
    label: 'Manual Cards',
    maxRows: 6,
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'description', type: 'textarea' },
      { name: 'href', type: 'text' },
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
    slug: 'pdp-related',
    labels: {
      singular: 'PDP Related',
      plural: 'PDP Related',
    },
    fields: blockFields,
  };
}

export const PdpRelatedTemplate = block(fields);
export const PdpRelated = block(withDataSource(fields));
