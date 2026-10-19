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
      maxRows: 5,
      admin: {
        initCollapsed: true,
        description:
          'Up to five industry cards. The sixth slot is the View all card below. Each card can use a PDF, a link, or both (PDF wins when both are set).',
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
            description:
              'Optional page or URL. Used when no PDF is uploaded. Leave both empty to keep the card as text only.',
          },
        },
        {
          name: 'pdf',
          type: 'upload',
          relationTo: 'media',
          label: 'PDF',
          filterOptions: {
            mimeType: { contains: 'pdf' },
          },
          admin: {
            description:
              'Optional. If set, the card opens this PDF in a new tab instead of the Link field.',
          },
        },
      ],
    },
    {
      name: 'viewAll',
      type: 'group',
      label: 'View all card',
      admin: {
        description: 'The sixth card — a distinct redirect to the full industries page.',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          label: 'Tag',
          admin: { description: 'e.g. 06 / LIBRARY' },
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'ctaLabel',
          type: 'text',
          label: 'CTA label',
          admin: { description: 'e.g. View all industries' },
        },
        {
          name: 'href',
          type: 'text',
          label: 'Link',
          admin: { description: 'Optional. Leave empty to keep the card not clickable.' },
        },
      ],
    },
  ],
};
