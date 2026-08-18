import type { Block } from 'payload';

import { sectionHeaderFields } from '../shared';

export const FeaturedIndustries: Block = {
  slug: 'featured-industries',
  labels: {
    singular: 'Featured Industries',
    plural: 'Featured Industries',
  },
  fields: [
    ...sectionHeaderFields,
    {
      name: 'cards',
      type: 'array',
      label: 'Industry Cards',
      maxRows: 6,
      admin: {
        initCollapsed: true,
        description: 'Shown in two rows of three. Tag, title, description, image, and link.',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          label: 'Tag',
          admin: { description: 'e.g. 01 / INDUSTRY' },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'href',
          type: 'text',
          label: 'Link',
          admin: {
            description: 'Optional. Leave empty to keep the card as text only (not clickable).',
          },
        },
      ],
    },
  ],
};
