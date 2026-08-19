import type { Block, Field } from 'payload';

import { eyebrowField, headingField, descriptionField } from '../../shared';
import { withDataSource } from '../shared';

const fields: Field[] = [
  eyebrowField,
  headingField,
  descriptionField,
  {
    name: 'leftHeading',
    type: 'text',
    label: 'Left heading',
  },
  {
    name: 'leftDescription',
    type: 'textarea',
    label: 'Left description',
  },
  {
    name: 'rightHeading',
    type: 'text',
    label: 'Right heading',
  },
  {
    name: 'rightDescription',
    type: 'textarea',
    label: 'Right description',
  },
  {
    name: 'items',
    type: 'array',
    label: 'List items',
    labels: {
      singular: 'Item',
      plural: 'Items',
    },
    admin: {
      initCollapsed: true,
      description:
        'Each row is an icon + label. Leave the toggle off for the left column, on for the right.',
    },
    fields: [
      {
        name: 'icon',
        type: 'upload',
        relationTo: 'media',
        label: 'Icon',
      },
      {
        name: 'text',
        type: 'text',
        required: true,
        label: 'Text',
      },
      {
        name: 'onRight',
        type: 'checkbox',
        label: 'Place on right column',
        defaultValue: false,
      },
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
