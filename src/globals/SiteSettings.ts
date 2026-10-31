import type { GlobalConfig } from 'payload';

import { superAdminOnly } from '@/access/roles';
import { linkField } from '@/fields/link';
import { withClientCondition } from '@/fields/withClientCondition';
import { revalidateSiteChromeGlobal } from '@/hooks/revalidate';

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
              label: 'Logo',
              admin: {
                description:
                  'Full wordmark for the navbar and footer. When set, this image is used instead of the letter mark and is shown in full (not cropped).',
              },
            },
            {
              name: 'logoMark',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo mark',
              admin: {
                description:
                  'Used in the navbar and footer when no full logo is uploaded. Shown in full, not cropped.',
              },
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
                  defaultValue: 'Arial',
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
                withClientCondition(
                  {
                    name: 'label',
                    type: 'text',
                  },
                  { sibling: 'platform', equals: 'other' },
                ),
              ],
            },
          ],
        },
        {
          label: 'Leads',
          fields: [
            {
              name: 'leadNotificationEmail',
              type: 'text',
              label: 'Lead notification email',
              admin: {
                description:
                  'Inbox that receives consultation form submissions. Comma-separate for more than one. Falls back to EMAIL_TO_SALES in the environment if empty.',
              },
            },
          ],
        },
        {
          label: 'Loader',
          fields: [
            {
              name: 'loader',
              type: 'group',
              label: 'Page loader',
              admin: {
                description:
                  'Full-screen overlay shown when moving between pages. Desktop and mobile layouts follow the Kleenoil loading screens.',
              },
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: { description: 'Show the branded loader on in-site page changes.' },
                },
                {
                  name: 'showOnFirstLoad',
                  type: 'checkbox',
                  label: 'Show on first page load',
                  defaultValue: false,
                  admin: {
                    description:
                      'Also play the loader when someone first lands on the site. Off = navigation only.',
                  },
                },
                {
                  name: 'brandName',
                  type: 'text',
                  label: 'Wordmark',
                  defaultValue: 'KLEENOIL',
                  admin: {
                    description: 'Large name next to the letter mark. Defaults to KLEENOIL.',
                  },
                },
                {
                  name: 'statusText',
                  type: 'text',
                  label: 'Status line',
                  defaultValue: 'WARMING UP THE SYSTEM',
                },
                {
                  name: 'systemCode',
                  type: 'text',
                  label: 'Top-left code (desktop)',
                  defaultValue: 'SYS. 01  //  INITIALIZING',
                },
                {
                  name: 'systemCodeMobile',
                  type: 'text',
                  label: 'Top-left code (mobile)',
                  defaultValue: 'SYS. 01  //  INIT',
                },
                {
                  name: 'versionLabel',
                  type: 'text',
                  label: 'Version',
                  defaultValue: 'v2026.10',
                },
                {
                  name: 'cornerBrand',
                  type: 'text',
                  label: 'Bottom-right mark (desktop)',
                  defaultValue: 'KLEENOIL INDIA  —  EST. 1988',
                },
                {
                  name: 'cornerBrandMobile',
                  type: 'text',
                  label: 'Bottom-right mark (mobile)',
                  defaultValue: 'KLEENOIL  —  1988',
                },
                {
                  name: 'tagline',
                  type: 'text',
                  label: 'Logo tagline (desktop)',
                  defaultValue: 'INDIA  —  BYPASS FILTRATION SINCE 1988',
                },
                {
                  name: 'taglineMobile',
                  type: 'text',
                  label: 'Logo tagline (mobile)',
                  defaultValue: 'INDIA  —  BYPASS FILTRATION',
                },
                {
                  name: 'minDurationMs',
                  type: 'number',
                  label: 'Fade duration (ms)',
                  defaultValue: 700,
                  min: 400,
                  max: 2000,
                  admin: {
                    description:
                      'How long the fade in and fade out take. The overlay itself stays until the next page has loaded.',
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
  hooks: {
    afterChange: [revalidateSiteChromeGlobal],
  },
  admin: {
    group: 'Configuration',
  },
};
