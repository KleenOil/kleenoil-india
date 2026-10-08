import type { Block } from 'payload';

import { RESOURCE_HERO_VARIANTS } from '@/lib/cms/library';

import { eyebrowField, headingField, linkArrayField } from '../shared';

export const ResourceHero: Block = {
  slug: 'resource-hero',
  labels: {
    singular: 'Resource Hero',
    plural: 'Resource Heroes',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      label: 'Page layout',
      defaultValue: 'industries',
      options: [...RESOURCE_HERO_VARIANTS],
      admin: {
        description: 'Industries, Applications, Types of Oil, Testimonials, or FAQ.',
      },
    },
    eyebrowField,
    headingField,
    { name: 'lead', type: 'textarea', label: 'Lead' },
    linkArrayField({ name: 'ctas', label: 'CTAs', maxRows: 1 }),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero image',
      admin: {
        description:
          'Full-bleed photo on Applications and Testimonials. Testimonials uses it behind the quote and PDF cards.',
      },
    },
    {
      name: 'quote',
      type: 'textarea',
      label: 'Quote (Testimonials)',
      admin: {
        description: 'Featured quote on the Testimonials banner, under the headline.',
      },
    },
    {
      name: 'attribution',
      type: 'text',
      label: 'Quote attribution',
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Stats',
      fields: [
        { name: 'n', type: 'text', label: 'Value', required: true },
        { name: 'label', type: 'text', label: 'Label', required: true },
      ],
    },
    {
      name: 'previews',
      type: 'array',
      label: 'Preview cards (Testimonials)',
      maxRows: 3,
      admin: {
        description:
          'Up to three PDF cards that float over the Testimonials banner photo on desktop.',
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'kicker', type: 'text' },
      ],
    },
  ],
};
