import type { Block } from 'payload';

import { sectionHeaderFields } from '../shared';

export const CsIndex: Block = {
  slug: 'cs-index',
  labels: {
    singular: 'CS Index',
    plural: 'CS Indexes',
  },
  fields: [
    ...sectionHeaderFields,
    {
      name: 'hiddenStudies',
      type: 'array',
      label: 'Hide case studies from this grid',
      admin: {
        description:
          'Every published study is included automatically. Add any study here to remove it from this section.',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'study',
          type: 'relationship',
          relationTo: 'case-studies',
          required: true,
          label: 'Case study',
        },
      ],
    },
  ],
};
