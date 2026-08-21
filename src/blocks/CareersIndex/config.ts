import type { Block } from 'payload';

import { sectionHeaderFields } from '../shared';

export const CareersIndex: Block = {
  slug: 'careers-index',
  labels: {
    singular: 'Careers Index',
    plural: 'Careers Indexes',
  },
  fields: [
    ...sectionHeaderFields,
    {
      name: 'hiddenJobs',
      type: 'array',
      label: 'Hide jobs from this grid',
      admin: {
        description:
          'Every posted role is included automatically. Add a job here to remove it from this section.',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'job',
          type: 'relationship',
          relationTo: 'jobs',
          required: true,
          label: 'Job posting',
        },
      ],
    },
  ],
};
