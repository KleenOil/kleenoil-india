import type { Block } from 'payload';

import { linkField, sectionHeaderFields } from '../shared';

export const FeaturedServices: Block = {
  slug: 'featured-services',
  labels: {
    singular: 'Featured Services',
    plural: 'Featured Services',
  },
  fields: [
    ...sectionHeaderFields,
    linkField({ name: 'cta', label: 'Section CTA', appearances: true }),
    {
      name: 'cards',
      type: 'array',
      label: 'Service Cards',
      maxRows: 6,
      admin: {
        initCollapsed: true,
        description: 'Tag, title, description, and link for each card.',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          label: 'Tag',
          admin: { description: 'e.g. 01 / CONSULT' },
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
