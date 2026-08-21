import type { Block } from 'payload';

import { sectionHeaderFields } from '../shared';

export const ArticlesIndex: Block = {
  slug: 'articles-index',
  labels: {
    singular: 'Articles Index',
    plural: 'Articles Indexes',
  },
  fields: [
    ...sectionHeaderFields,
    {
      name: 'hiddenPosts',
      type: 'array',
      label: 'Hide articles from this grid',
      admin: {
        description:
          'Every published article is included automatically. Add any article here to remove it from this section.',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'post',
          type: 'relationship',
          relationTo: 'posts',
          required: true,
          label: 'Article',
        },
      ],
    },
  ],
};
