import type { Block } from 'payload';

import { eyebrowField, headingField } from '../shared';

export const CareersHero: Block = {
  slug: 'careers-hero',
  labels: {
    singular: 'Careers Hero',
    plural: 'Careers Heroes',
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
      name: 'cities',
      type: 'text',
      label: 'Cities',
      admin: {
        description:
          'Shown in the open-roles panel, e.g. Gurugram  ·  Delhi  ·  Mumbai  ·  Chennai.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Background image',
    },
  ],
};
