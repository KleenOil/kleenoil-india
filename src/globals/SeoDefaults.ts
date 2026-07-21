import type { GlobalConfig } from 'payload';

import { superAdminOnly } from '@/access/roles';

export const SeoDefaults: GlobalConfig = {
  slug: 'seo-defaults',
  label: 'SEO Defaults',
  access: {
    read: () => true,
    update: superAdminOnly,
  },
  fields: [
    {
      name: 'siteTitle',
      type: 'text',
      label: 'Site Title Pattern',
      defaultValue: '%s | Company',
      admin: {
        description: 'Use %s as the page title placeholder.',
      },
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      label: 'Default Meta Description',
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Default Open Graph Image',
    },
    {
      name: 'twitterHandle',
      type: 'text',
      admin: {
        description: 'Without the @ symbol.',
      },
    },
    {
      name: 'googleSiteVerification',
      type: 'text',
      label: 'Google Site Verification',
    },
    {
      name: 'structuredData',
      type: 'group',
      label: 'Organization Schema',
      fields: [
        { name: 'organizationName', type: 'text' },
        { name: 'legalName', type: 'text' },
        { name: 'foundingDate', type: 'text', admin: { description: 'YYYY or YYYY-MM-DD' } },
        { name: 'url', type: 'text', label: 'Organization URL' },
        { name: 'logo', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
  admin: {
    group: 'Configuration',
  },
};
