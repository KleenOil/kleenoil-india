import type { Block } from 'payload';

import { eyebrowField, headingField } from '../shared';

export const SustainabilityDrop: Block = {
  slug: 'sustainability-drop',
  labels: {
    singular: 'Sustainability Drop',
    plural: 'Sustainability Drop',
  },
  fields: [
    eyebrowField,
    headingField,
    {
      name: 'paragraphs',
      type: 'array',
      label: 'Paragraphs',
      maxRows: 3,
      fields: [{ name: 'text', type: 'textarea', required: true }],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Artwork',
    },
  ],
};
