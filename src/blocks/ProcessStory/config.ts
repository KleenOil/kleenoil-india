import type { Block } from 'payload';

import { sectionHeaderFields } from '../shared';

export const ProcessStory: Block = {
  slug: 'process-story',
  labels: {
    singular: 'Process Story',
    plural: 'Process Stories',
  },
  fields: [
    ...sectionHeaderFields,
    {
      name: 'steps',
      type: 'array',
      label: 'Steps',
      minRows: 1,
      fields: [
        { name: 'year', type: 'text', label: 'Year / Label' },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
};
