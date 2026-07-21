import type { GlobalConfig } from 'payload';

import { superAdminOnly } from '@/access/roles';
import { linkField } from '@/fields/link';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
    update: superAdminOnly,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand',
          fields: [
            {
              name: 'companyName',
              type: 'text',
              required: true,
              defaultValue: 'Company Name',
            },
            {
              name: 'companyTagline',
              type: 'text',
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'logoMark',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo Mark',
            },
            {
              name: 'favicon',
              type: 'upload',
              relationTo: 'media',
            },
            linkField({ name: 'defaultCta', label: 'Default CTA', appearances: true }),
          ],
        },
        {
          label: 'Theme',
          fields: [
            {
              name: 'fonts',
              type: 'group',
              fields: [
                {
                  name: 'headingFont',
                  type: 'text',
                  defaultValue: 'Poppins',
                },
                {
                  name: 'bodyFont',
                  type: 'text',
                  defaultValue: 'Arimo',
                },
              ],
            },
            {
              name: 'theme',
              type: 'group',
              label: 'Brand Colors',
              fields: [
                {
                  name: 'brandPrimary',
                  type: 'text',
                  defaultValue: '#006633',
                  admin: { description: 'CSS color value (hex recommended).' },
                },
                {
                  name: 'brandDeep',
                  type: 'text',
                  defaultValue: '#004422',
                },
                {
                  name: 'brandBright',
                  type: 'text',
                  defaultValue: '#008844',
                },
                {
                  name: 'background',
                  type: 'text',
                  defaultValue: '#EBF2EE',
                },
                {
                  name: 'surface',
                  type: 'text',
                  defaultValue: '#DCE8E1',
                },
              ],
            },
          ],
        },
        {
          label: 'Social',
          fields: [
            {
              name: 'socialLinks',
              type: 'array',
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'X / Twitter', value: 'twitter' },
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'Other', value: 'other' },
                  ],
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'label',
                  type: 'text',
                  admin: {
                    condition: (_, siblingData) => siblingData?.platform === 'other',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Features',
          fields: [
            {
              name: 'features',
              type: 'group',
              fields: [
                { name: 'enableSearch', type: 'checkbox', defaultValue: true },
                { name: 'enableBlog', type: 'checkbox', defaultValue: true },
                { name: 'enableNewsletter', type: 'checkbox', defaultValue: false },
              ],
            },
          ],
        },
      ],
    },
  ],
  admin: {
    group: 'Configuration',
  },
};
