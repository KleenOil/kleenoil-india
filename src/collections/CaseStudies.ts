import type { CollectionConfig } from 'payload';

import { anyone, editorsAndAdmins } from '@/access/roles';
import { CASE_STUDY_SECTORS } from '@/lib/cms/cs-listing';
import { slugField } from '@/fields/slug';

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  labels: {
    singular: 'Case study',
    plural: 'Case studies',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'sector', 'publishedAt', 'updatedAt'],
    group: 'Content',
    description:
      'Plant results. New studies appear on the Case Studies page automatically unless hidden.',
  },
  access: {
    read: anyone,
    create: editorsAndAdmins,
    update: editorsAndAdmins,
    delete: editorsAndAdmins,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Card and featured headline unless you set a featured headline below.',
      },
    },
    slugField({ fallbackFrom: 'title' }),
    {
      name: 'sector',
      type: 'select',
      required: true,
      defaultValue: 'automotive',
      options: [...CASE_STUDY_SECTORS],
    },
    {
      name: 'tag',
      type: 'text',
      label: 'Card tag',
      admin: {
        description: 'e.g. CASE STUDY / AUTOMOTIVE. Defaults from the sector if empty.',
      },
    },
    {
      name: 'location',
      type: 'text',
      label: 'Site line',
      admin: {
        description: 'Shown on the featured card, e.g. Tier-1 OEM  ·  North India.',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Summary',
    },
    {
      name: 'featuredHeadline',
      type: 'textarea',
      label: 'Featured headline',
      admin: {
        description: 'Optional override used only in the CS Featured section.',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
    },
    {
      name: 'pdf',
      type: 'upload',
      relationTo: 'media',
      label: 'Case study PDF',
      filterOptions: {
        mimeType: { contains: 'pdf' },
      },
      admin: {
        description: 'Opened when a visitor clicks the card or Read the case study.',
      },
    },
    {
      name: 'metrics',
      type: 'array',
      label: 'Stats',
      maxRows: 3,
      fields: [
        { name: 'value', type: 'text', required: true, label: 'Value' },
        { name: 'label', type: 'text', required: true, label: 'Label' },
      ],
    },
    {
      name: 'href',
      type: 'text',
      label: 'Fallback link',
      admin: {
        description: 'Used only if no PDF is uploaded. Leave empty to keep cards unlinked.',
      },
    },
    {
      name: 'showOnListing',
      type: 'checkbox',
      label: 'Show on Case Studies page',
      defaultValue: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
  ],
};
