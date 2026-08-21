import type { Block } from 'payload';

import { eyebrowField, headingField, linkField } from '../shared';

export const ArticlesHero: Block = {
  slug: 'articles-hero',
  labels: {
    singular: 'Articles Hero',
    plural: 'Articles Heroes',
  },
  fields: [
    eyebrowField,
    headingField,
    {
      name: 'subheadline',
      type: 'textarea',
      label: 'Subheadline',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Background image',
    },
    linkField({ name: 'cta', label: 'CTA', appearances: true }),
  ],
};
