import type { Block } from 'payload';

import { withClientCondition } from '@/fields/withClientCondition';
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
      name: 'questions',
      type: 'array',
      label: 'Form questions',
      labels: {
        singular: 'Question',
        plural: 'Questions',
      },
      admin: {
        initCollapsed: true,
        description:
          'Leave empty to use the default form. Include questions named name and email so submissions reach the lead inbox. Other named fields: company, plant, industry, timing, message.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
        },
        {
          name: 'name',
          type: 'text',
          label: 'Field name',
          admin: {
            description:
              'Optional. Use name, email, company, plant, industry, timing, or message to fill those lead columns. Leave empty to save the answer in the message.',
          },
        },
        {
          name: 'field',
          type: 'select',
          required: true,
          defaultValue: 'text',
          label: 'Field',
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Dropdown', value: 'dropdown' },
            { label: 'Text area', value: 'textarea' },
          ],
        },
        {
          name: 'width',
          type: 'select',
          required: true,
          defaultValue: 'full',
          label: 'Width',
          options: [
            { label: '50%', value: 'half' },
            { label: '100%', value: 'full' },
          ],
        },
        {
          name: 'required',
          type: 'checkbox',
          defaultValue: false,
          label: 'Required',
        },
        withClientCondition(
          {
            name: 'options',
            type: 'array',
            label: 'Dropdown options',
            labels: {
              singular: 'Option',
              plural: 'Options',
            },
            admin: {
              description: 'Shown when Field is Dropdown.',
            },
            fields: [
              {
                name: 'label',
                type: 'text',
                required: true,
                label: 'Label',
              },
              {
                name: 'value',
                type: 'text',
                label: 'Value',
                admin: {
                  description: 'Optional. Stored with the lead. Leave empty to use the label.',
                },
              },
            ],
          },
          { sibling: 'field', equals: 'dropdown' },
        ),
      ],
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
