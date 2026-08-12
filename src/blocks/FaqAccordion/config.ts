import type { Block } from 'payload';

import { sectionHeaderFields } from '../shared';

export const FaqAccordion: Block = {
  slug: 'faq-accordion',
  labels: {
    singular: 'FAQ Accordion',
    plural: 'FAQ Accordions',
  },
  fields: [
    ...sectionHeaderFields,
    {
      name: 'items',
      type: 'array',
      label: 'FAQ Items',
      minRows: 1,
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
        {
          name: 'defaultOpen',
          type: 'checkbox',
          label: 'Open by default',
          defaultValue: false,
        },
      ],
    },
  ],
};
