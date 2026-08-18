import type { Block } from 'payload';

import { linkField, sectionHeaderFields } from '../shared';

export const FeaturedProducts: Block = {
  slug: 'featured-products',
  labels: {
    singular: 'Featured Products',
    plural: 'Featured Products',
  },
  fields: [
    ...sectionHeaderFields,
    linkField({ name: 'cta', label: 'Section CTA', appearances: true }),
    {
      name: 'cards',
      type: 'array',
      label: 'Product Cards',
      maxRows: 5,
      admin: {
        initCollapsed: true,
        description:
          'Build cards manually. Optionally link a Product so Explore goes to that PDP; otherwise use Custom link.',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          label: 'Tag',
          admin: { description: 'e.g. 01 / SYSTEM' },
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
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          label: 'Linked Product',
          admin: {
            description: 'Optional. When set, the card links to this product’s detail page.',
          },
        },
        {
          name: 'href',
          type: 'text',
          label: 'Custom link',
          admin: {
            description:
              'Optional URL when no product is linked. Leave empty to keep the card not clickable.',
            condition: (_, siblingData) => !siblingData?.product,
          },
        },
      ],
    },
    {
      name: 'customEngineering',
      type: 'group',
      label: 'Custom Engineering Card',
      admin: {
        description: 'The special card at the end of the second row.',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          label: 'Tag',
          admin: { description: 'e.g. 06 / Bespoke' },
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
          admin: { description: 'e.g. Speak with an engineer' },
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
