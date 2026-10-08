import type { Block } from 'payload';

export const FaqTopics: Block = {
  slug: 'faq-topics',
  labels: {
    singular: 'FAQ Topics',
    plural: 'FAQ Topics',
  },
  fields: [
    {
      name: 'topics',
      type: 'array',
      label: 'Topics',
      fields: [
        { name: 'label', type: 'text', required: true },
        {
          name: 'items',
          type: 'array',
          label: 'Questions',
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
    },
  ],
};
