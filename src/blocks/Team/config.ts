import type { Block } from 'payload';

import { sectionHeaderFields } from '../shared';

export const Team: Block = {
  slug: 'team',
  labels: {
    singular: 'Team',
    plural: 'Team',
  },
  fields: [
    ...sectionHeaderFields,
    {
      name: 'members',
      type: 'array',
      label: 'Team Members',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text', required: true },
        { name: 'photo', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
};
