import type { Block } from 'payload';

import { DEFAULT_FEATURED_INDUSTRIES } from '@/lib/cms/defaults';

import { sectionHeaderFields } from '../shared';

const viewAllDefaults = DEFAULT_FEATURED_INDUSTRIES.viewAll;

export const FeaturedIndustries: Block = {
  slug: 'featured-industries',
  labels: {
    singular: 'Featured Industries',
    plural: 'Featured Industries',
  },
  fields: [
    ...sectionHeaderFields,
    {
      name: 'viewAll',
      type: 'group',
      label: 'View all card (6th slot)',
      admin: {
        description:
          'Always the sixth card — a distinct redirect to the industries library. This is not one of the five industry cards below.',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          label: 'Tag',
          defaultValue: viewAllDefaults.tag,
          admin: { description: 'e.g. 06 / LIBRARY' },
        },
        {
          name: 'title',
          type: 'text',
          defaultValue: viewAllDefaults.title,
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: viewAllDefaults.description,
        },
        {
          name: 'ctaLabel',
          type: 'text',
          label: 'Button label',
          defaultValue: viewAllDefaults.ctaLabel,
          admin: { description: 'e.g. Browse industry notes' },
        },
        {
          name: 'href',
          type: 'text',
          label: 'Link',
          defaultValue: viewAllDefaults.href,
          admin: { description: 'Where the sixth card should go, e.g. /industries' },
        },
      ],
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Industry cards (max 5)',
      labels: {
        singular: 'Industry card',
        plural: 'Industry cards',
      },
      maxRows: 5,
      admin: {
        initCollapsed: true,
        description:
          'Up to five industry cards. Extra rows above five are ignored on the site — delete them. Each card can use a PDF, a link, or both (PDF wins when both are set).',
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
          name: 'pdf',
          type: 'upload',
          relationTo: 'media',
          label: 'PDF file',
          filterOptions: {
            mimeType: { contains: 'pdf' },
          },
          admin: {
            description: 'Upload a PDF. If set, the card opens this file in a new tab.',
          },
        },
        {
          name: 'href',
          type: 'text',
          label: 'Link',
          admin: {
            description: 'Page path or URL. Used when no PDF is uploaded.',
          },
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
      ],
    },
  ],
};
