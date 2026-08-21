import type { Block } from 'payload';

import { sectionHeaderFields } from '../shared';

export const ArticlesFeatured: Block = {
  slug: 'articles-featured',
  labels: {
    singular: 'Articles Featured',
    plural: 'Articles Featured',
  },
  fields: [
    ...sectionHeaderFields,
    {
      name: 'featuredPost',
      type: 'relationship',
      relationTo: 'posts',
      label: 'Featured article',
      admin: {
        description: 'Optional. Leave empty to feature the latest article automatically.',
      },
    },
  ],
};
