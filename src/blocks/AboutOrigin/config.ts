import type { Block } from 'payload';

import { eyebrowField, headingField, linkField } from '../shared';

export const AboutOrigin: Block = {
  slug: 'about-origin',
  labels: {
    singular: 'About Origin',
    plural: 'About Origin',
  },
  fields: [
    eyebrowField,
    headingField,
    {
      name: 'body',
      type: 'textarea',
      label: 'Body paragraph 1',
    },
    {
      name: 'bodySecondary',
      type: 'textarea',
      label: 'Body paragraph 2',
    },
    linkField({ name: 'cta', label: 'CTA', appearances: true }),
    {
      name: 'milestones',
      type: 'array',
      label: 'Timeline milestones',
      minRows: 1,
      maxRows: 8,
      fields: [
        { name: 'year', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
      ],
    },
  ],
};
