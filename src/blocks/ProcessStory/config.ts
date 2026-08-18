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
        {
          name: 'spec',
          type: 'text',
          label: 'Spec badge',
          admin: {
            description: 'Pill under the description, e.g. PARTICULATE > 18μm.',
          },
        },
      ],
    },
  ],
};
