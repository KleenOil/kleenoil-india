import type { CollectionConfig } from 'payload';

import { isSuperAdmin } from '@/access/roles';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    group: 'System',
  },
  auth: true,
  access: {
    // Only Super Admins can list/create/delete users.
    // Users can always read and update themselves.
    create: ({ req }) => isSuperAdmin({ req }),
    read: ({ req }) => {
      if (isSuperAdmin({ req })) return true;
      if (req.user) {
        return {
          id: {
            equals: req.user.id,
          },
        };
      }
      return false;
    },
    update: ({ req }) => {
      if (isSuperAdmin({ req })) return true;
      if (req.user) {
        return {
          id: {
            equals: req.user.id,
          },
        };
      }
      return false;
    },
    delete: ({ req }) => isSuperAdmin({ req }),
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Super Admin', value: 'super-admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        update: ({ req }) => isSuperAdmin({ req }),
      },
      admin: {
        description: 'Super Admins manage users and site configuration. Editors manage content.',
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        // First registered user becomes Super Admin automatically.
        if (operation === 'create' && data) {
          const existing = await req.payload.find({
            collection: 'users',
            limit: 1,
            depth: 0,
          });

          if (existing.totalDocs === 0) {
            data.role = 'super-admin';
          }
        }

        return data;
      },
    ],
  },
};
