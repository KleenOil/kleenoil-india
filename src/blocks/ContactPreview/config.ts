import type { Block } from 'payload';

import { sectionHeaderFields } from '../shared';

export const ContactPreview: Block = {
  slug: 'contact-preview',
  labels: {
    singular: 'Contact Preview',
    plural: 'Contact Previews',
  },
  fields: [
    ...sectionHeaderFields,
    {
      name: 'showContactInfo',
      type: 'checkbox',
      label: 'Show Contact Information from global settings',
      defaultValue: true,
    },
    {
      name: 'showForm',
      type: 'checkbox',
      label: 'Show contact form',
      defaultValue: true,
      admin: {
        description: 'Form UI will wire to the submission API in a later milestone.',
      },
    },
  ],
};
