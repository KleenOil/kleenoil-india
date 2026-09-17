import type { Block } from 'payload';

export const ServicesIndustries: Block = {
  slug: 'services-industries',
  labels: {
    singular: 'Services Industries',
    plural: 'Services Industries',
  },
  fields: [
    { name: 'kicker', type: 'text', label: 'Kicker' },
    { name: 'heading', type: 'text', label: 'Heading' },
    {
      name: 'photos',
      type: 'array',
      label: 'Photos',
      maxRows: 8,
      fields: [
        { name: 'label', type: 'text', required: true },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
        },
      ],
    },
    {
      name: 'chips',
      type: 'array',
      label: 'Industry chips',
      maxRows: 12,
      fields: [{ name: 'label', type: 'text', required: true }],
    },
  ],
};
