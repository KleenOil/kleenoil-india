import type { Block } from 'payload';

import { withClientCondition } from '@/fields/withClientCondition';
import { sectionHeaderFields } from '../shared';

export const Team: Block = {
  slug: 'team',
  labels: {
    singular: 'Team',
    plural: 'Team',
  },
  fields: [
    ...sectionHeaderFields,
    {
      name: 'members',
      type: 'array',
      label: 'Leadership (photo cards)',
      admin: {
        description: 'Portrait cards shown in the main row. Add a photo, name, and role.',
        initCollapsed: true,
      },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text', required: true },
        { name: 'photo', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'showExtraMembers',
      type: 'checkbox',
      label: 'Show extra members',
      defaultValue: false,
      admin: {
        description: 'Turn on to show the Operations & Specialists block grid below the portraits.',
      },
    },
    withClientCondition(
      {
        name: 'extraHeading',
        type: 'text',
        label: 'Extra members heading',
        defaultValue: 'OPERATIONS & SPECIALISTS',
        admin: {
          description: 'e.g. OPERATIONS & SPECIALISTS',
        },
      },
      { sibling: 'showExtraMembers', truthy: true },
    ),
    withClientCondition(
      {
        name: 'extraMembers',
        type: 'array',
        label: 'Extra members',
        labels: {
          singular: 'Member',
          plural: 'Members',
        },
        admin: {
          description: 'Text-only blocks: name and role. No photo.',
          initCollapsed: true,
        },
        fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'role', type: 'text', required: true },
        ],
      },
      { sibling: 'showExtraMembers', truthy: true },
    ),
  ],
};
