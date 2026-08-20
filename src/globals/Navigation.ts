import type { GlobalConfig } from 'payload';

import { editorsAndAdmins } from '@/access/roles';
import { navItemFields } from '@/fields/link';

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  access: {
    read: () => true,
    update: editorsAndAdmins,
  },
  fields: [
    {
      name: 'mainMenu',
      type: 'array',
      label: 'Main Menu',
      fields: navItemFields(0, { allowMegaMenu: true }),
    },
    {
      name: 'utilityMenu',
      type: 'array',
      label: 'Utility Menu',
      admin: {
        description:
          'Right-side items such as Contact CTA. Search is controlled by Site Settings features.',
      },
      fields: navItemFields(1),
    },
    {
      name: 'mobileMenu',
      type: 'array',
      label: 'Mobile Menu Override',
      admin: {
        description: 'Optional. Leave empty to reuse the main menu on mobile.',
      },
      fields: navItemFields(),
    },
  ],
  admin: {
    group: 'Configuration',
  },
};
