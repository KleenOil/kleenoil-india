import type { GlobalConfig } from 'payload';

import { editorsAndAdmins } from '@/access/roles';

export const ContactInfo: GlobalConfig = {
  slug: 'contact-info',
  label: 'Contact Information',
  access: {
    read: () => true,
    update: editorsAndAdmins,
  },
  fields: [
    {
      name: 'addresses',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'street', type: 'text' },
        { name: 'city', type: 'text' },
        { name: 'state', type: 'text' },
        { name: 'country', type: 'text', defaultValue: 'India' },
        { name: 'pin', type: 'text', label: 'PIN / ZIP' },
        { name: 'mapLink', type: 'text', label: 'Map Link' },
      ],
    },
    {
      name: 'phones',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'number', type: 'text', required: true },
      ],
    },
    {
      name: 'emails',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'email', type: 'email', required: true },
      ],
    },
    {
      name: 'businessHours',
      type: 'richText',
      label: 'Business Hours',
    },
    {
      name: 'mapEmbed',
      type: 'textarea',
      label: 'Map Embed URL',
      admin: {
        description: 'Google Maps embed URL (not the full iframe HTML).',
      },
    },
  ],
  admin: {
    group: 'Configuration',
  },
};
