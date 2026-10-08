import type { Block } from 'payload';

import { RESOURCE_PDFS_VARIANTS } from '@/lib/cms/library';

import { descriptionField, eyebrowField, headingField } from '../shared';

export const ResourcePdfs: Block = {
  slug: 'resource-pdfs',
  labels: {
    singular: 'Resource PDFs',
    plural: 'Resource PDFs',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      label: 'Library',
      defaultValue: 'industries',
      options: [...RESOURCE_PDFS_VARIANTS],
    },
    eyebrowField,
    headingField,
    descriptionField,
    {
      name: 'cards',
      type: 'array',
      label: 'PDF cards',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'meta', type: 'text', label: 'Subtitle' },
        { name: 'href', type: 'text', label: 'Download URL' },
      ],
    },
  ],
};
