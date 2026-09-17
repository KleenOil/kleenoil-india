import type { Block } from 'payload';

import { descriptionField, eyebrowField, headingField } from '../shared';

export const ServicesProgram: Block = {
  slug: 'services-program',
  labels: {
    singular: 'Services Program',
    plural: 'Services Programs',
  },
  fields: [
    eyebrowField,
    headingField,
    descriptionField,
    {
      name: 'processImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Process image',
    },
    {
      name: 'questions',
      type: 'array',
      label: 'Four questions',
      maxRows: 4,
      fields: [
        { name: 'n', type: 'text', label: 'Number', required: true },
        { name: 'icon', type: 'text', label: 'Icon key' },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
    { name: 'focusKicker', type: 'text', label: 'Focus kicker' },
    { name: 'focusHeading', type: 'text', label: 'Focus heading' },
    { name: 'focusBody', type: 'textarea', label: 'Focus body' },
    {
      name: 'focusImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Focus image',
    },
    {
      name: 'commitments',
      type: 'array',
      label: 'Commitments',
      maxRows: 5,
      fields: [
        { name: 'n', type: 'text', label: 'Number', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
  ],
};
