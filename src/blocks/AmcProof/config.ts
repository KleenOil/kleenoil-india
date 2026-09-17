import type { Block } from 'payload';

import { eyebrowField, headingField, linkArrayField } from '../shared';

export const AmcProof: Block = {
  slug: 'amc-proof',
  labels: {
    singular: 'AMC Proof',
    plural: 'AMC Proof',
  },
  fields: [
    eyebrowField,
    headingField,
    { name: 'lead', type: 'textarea', label: 'Lead' },
    linkArrayField({ name: 'ctas', label: 'CTAs', maxRows: 1 }),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
    },
  ],
};
