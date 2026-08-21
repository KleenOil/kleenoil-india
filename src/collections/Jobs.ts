import type { CollectionConfig } from 'payload';

import { anyone, editorsAndAdmins } from '@/access/roles';
import { linkField } from '@/fields/link';
import { slugField } from '@/fields/slug';

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  labels: {
    singular: 'Job posting',
    plural: 'Job postings',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'department', 'location', 'publishedAt', 'updatedAt'],
    group: 'Content',
    description: 'Open roles. New postings appear on the Careers page automatically unless hidden.',
  },
  access: {
    read: anyone,
    create: editorsAndAdmins,
    update: editorsAndAdmins,
    delete: editorsAndAdmins,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Card',
          description: 'Shown on the Careers listing cards.',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                description:
                  'Job title on the card and in the modal, e.g. Service Engineer — Field.',
              },
            },
            {
              name: 'department',
              type: 'text',
              label: 'Department',
              admin: {
                description: 'Card tag, e.g. ENGINEERING or SALES.',
              },
            },
            {
              name: 'location',
              type: 'text',
              label: 'Location',
              admin: {
                description: 'e.g. Gurugram or New Delhi.',
              },
            },
            {
              name: 'employmentType',
              type: 'text',
              label: 'Employment type',
              defaultValue: 'Full-time',
              admin: {
                description: 'e.g. Full-time or Contract.',
              },
            },
            {
              name: 'excerpt',
              type: 'textarea',
              label: 'Card summary',
              admin: {
                description: 'Short copy on the card. Truncated to two lines on the site.',
              },
            },
          ],
        },
        {
          label: 'Modal details',
          description: 'Shown when someone clicks View details.',
          fields: [
            {
              name: 'details',
              type: 'richText',
              label: 'Details',
              admin: {
                description:
                  'Full job description for the modal. Use headings, lists, and links as needed.',
              },
            },
          ],
        },
        {
          label: 'Apply button',
          description: 'Fixed button at the bottom of the job modal.',
          fields: [linkField({ name: 'apply', label: 'Apply button' })],
        },
      ],
    },
    slugField({ fallbackFrom: 'title' }),
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Posted date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'showOnCareers',
      type: 'checkbox',
      label: 'Show on Careers page',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'On by default. Turn off to keep this posting but hide it from the grid.',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (!data) {
          return data;
        }

        if (operation === 'create' && !data.publishedAt) {
          data.publishedAt = new Date().toISOString();
        }

        if (operation === 'create' && data.showOnCareers == null) {
          data.showOnCareers = true;
        }

        if (operation === 'create' && !data.employmentType) {
          data.employmentType = 'Full-time';
        }

        return data;
      },
    ],
  },
};
