import type { Block } from 'payload';

import { eyebrowField, headingField } from '../shared';

export const ContactHero: Block = {
  slug: 'contact-hero',
  labels: {
    singular: 'Contact Hero',
    plural: 'Contact Heroes',
  },
  fields: [
    eyebrowField,
    headingField,
    {
      name: 'subheadline',
      type: 'textarea',
      label: 'Subheadline',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Background image',
    },
    {
      name: 'phoneLabel',
      type: 'text',
      label: 'Phone label',
      admin: {
        description: 'Defaults to Prefer to call.',
      },
    },
    {
      name: 'phoneNumber',
      type: 'text',
      label: 'Phone number',
      admin: {
        description: 'Leave empty to use the first number in Contact Information.',
      },
    },
    {
      name: 'benefits',
      type: 'array',
      label: 'What they get',
      maxRows: 4,
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    {
      name: 'formTitle',
      type: 'text',
      label: 'Form title',
    },
    {
      name: 'formLead',
      type: 'textarea',
      label: 'Form intro',
    },
    {
      name: 'submitLabel',
      type: 'text',
      label: 'Submit label',
    },
    {
      name: 'finePrint',
      type: 'textarea',
      label: 'Fine print',
    },
  ],
};
