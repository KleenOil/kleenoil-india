import type { Block } from 'payload';

import { linkField, sectionHeaderFields } from '../shared';

export const WhatsNew: Block = {
  slug: 'whats-new',
  labels: {
    singular: 'Whats New',
    plural: 'Whats New',
  },
  fields: [
    ...sectionHeaderFields,
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      minRows: 1,
      maxRows: 6,
      fields: [
        { name: 'badge', type: 'text', label: 'Badge' },
        { name: 'title', type: 'text', required: true, label: 'Title' },
        { name: 'description', type: 'textarea', label: 'Description' },
        linkField({ name: 'link', label: 'Link', appearances: false }),
      ],
    },
  ],
};
