import type { Block } from 'payload';

export const Manifesto: Block = {
  slug: 'manifesto',
  labels: {
    singular: 'Manifesto',
    plural: 'Manifestos',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      label: 'Quote',
      required: true,
    },
    {
      name: 'attribution',
      type: 'text',
      label: 'Attribution',
    },
  ],
};
