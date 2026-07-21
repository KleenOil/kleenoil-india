import type { Block } from 'payload';

import { sectionHeaderFields } from '../shared';

export const AboutStory: Block = {
  slug: 'about-story',
  labels: {
    singular: 'About Story',
    plural: 'About Stories',
  },
  fields: [
    ...sectionHeaderFields,
    {
      name: 'quote',
      type: 'textarea',
      label: 'Founder Quote',
    },
    {
      name: 'quoteAuthor',
      type: 'text',
      label: 'Quote Author',
    },
    {
      name: 'quoteRole',
      type: 'text',
      label: 'Quote Author Role',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Heritage Image',
    },
    {
      name: 'timeline',
      type: 'array',
      label: 'Company Timeline',
      fields: [
        { name: 'year', type: 'text', label: 'Year' },
        { name: 'label', type: 'text', label: 'Era Label' },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
};
