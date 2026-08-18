import type { Block } from 'payload';

import { linkField, sectionHeaderFields } from '../shared';

export const FeaturedCaseStudies: Block = {
  slug: 'featured-case-studies',
  labels: {
    singular: 'Featured Case Studies',
    plural: 'Featured Case Studies',
  },
  fields: [
    ...sectionHeaderFields,
    linkField({ name: 'cta', label: 'Section CTA', appearances: true }),
    {
      name: 'cards',
      type: 'array',
      label: 'Case Study Cards',
      maxRows: 4,
      admin: {
        initCollapsed: true,
        description:
          'Shown in two rows of two. Tag, title, description, link, and up to three stats.',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          label: 'Tag',
          admin: { description: 'e.g. CASE STUDY / AUTOMOTIVE' },
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
        {
          name: 'metrics',
          type: 'array',
          label: 'Stats',
          maxRows: 3,
          fields: [
            { name: 'value', type: 'text', required: true, label: 'Value' },
            { name: 'label', type: 'text', required: true, label: 'Label' },
          ],
        },
      ],
    },
  ],
};
