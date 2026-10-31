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
      admin: {
        initCollapsed: true,
        description:
          'Upload a PDF for each card (preferred). A download URL is only used when no file is uploaded.',
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'meta', type: 'text', label: 'Subtitle' },
        {
          name: 'pdf',
          type: 'upload',
          relationTo: 'media',
          label: 'PDF file',
          filterOptions: {
            mimeType: { contains: 'pdf' },
          },
          admin: {
            description: 'Upload a PDF. Opens in a new browser tab when clicked.',
          },
        },
        {
          name: 'href',
          type: 'text',
          label: 'Link (optional)',
          admin: {
            description: 'Used only when no PDF is uploaded. Prefer uploading a PDF file above.',
          },
        },
      ],
    },
  ],
};
