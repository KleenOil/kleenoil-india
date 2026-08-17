import type { CollectionConfig } from 'payload';

import { anyone, editorsAndAdmins } from '@/access/roles';
import { pageBlocks } from '@/blocks';
import { seoField } from '@/fields/seo';
import { slugField } from '@/fields/slug';

/** Route segments reserved by the App Router — cannot be used as CMS page slugs. */
const RESERVED_SLUGS = new Set([
  'admin',
  'api',
  'products',
  'services',
  'industries',
  'case-studies',
  'blog',
  'gallery',
  'testimonials',
  'resources',
  'process',
  'contact',
  'search',
  'sitemap.xml',
  'robots.txt',
]);

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Content',
  },
  // Keep version history, but do not require a separate Publish click.
  // Drafts left Pages looking "blank" / disappearing on Vercel after save.
  versions: {
    maxPerDoc: 50,
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
    },
    slugField({ fallbackFrom: 'title' }),
    {
      name: 'layout',
      type: 'blocks',
      label: 'Layout',
      labels: {
        singular: 'Layout',
        plural: 'Layout',
      },
      blocks: pageBlocks,
      admin: {
        initCollapsed: true,
      },
    },
    seoField,
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.slug && RESERVED_SLUGS.has(String(data.slug).toLowerCase())) {
          throw new Error(
            `Slug "${data.slug}" is reserved by the application. Choose a different page slug.`,
          );
        }
        return data;
      },
    ],
  },
};
