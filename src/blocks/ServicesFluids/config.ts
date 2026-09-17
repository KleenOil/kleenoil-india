import type { Block } from 'payload';

export const ServicesFluids: Block = {
  slug: 'services-fluids',
  labels: {
    singular: 'Services Fluids',
    plural: 'Services Fluids',
  },
  fields: [
    { name: 'kicker', type: 'text', label: 'Kicker' },
    { name: 'note', type: 'textarea', label: 'Note' },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Banner image',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Fluids',
      maxRows: 8,
      fields: [
        { name: 'icon', type: 'text', label: 'Icon key' },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
};
