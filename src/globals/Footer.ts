import type { GlobalConfig } from 'payload';

import { editorsAndAdmins } from '@/access/roles';
import { navItemFields } from '@/fields/link';

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: {
    read: () => true,
    update: editorsAndAdmins,
  },
  fields: [
    {
      name: 'columns',
      type: 'array',
      label: 'Link Columns',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          fields: navItemFields(1),
        },
      ],
    },
    {
      name: 'newsletter',
      type: 'group',
      label: 'Newsletter (UI only in V1)',
      fields: [
        { name: 'heading', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'placeholder', type: 'text', defaultValue: 'Enter your email' },
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Show newsletter UI. Submission backend is deferred.',
          },
        },
      ],
    },
    {
      name: 'bottomBar',
      type: 'group',
      fields: [
        {
          name: 'copyrightText',
          type: 'text',
          admin: {
            description: 'Use {{year}} to insert the current year automatically.',
          },
        },
        {
          name: 'legalLinks',
          type: 'array',
          fields: navItemFields(1),
        },
      ],
    },
    {
      name: 'certifications',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'url', type: 'text' },
      ],
    },
  ],
  admin: {
    group: 'Configuration',
  },
};
