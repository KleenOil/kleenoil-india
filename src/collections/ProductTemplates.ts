import type { CollectionConfig } from 'payload';

import { anyone, editorsAndAdmins } from '@/access/roles';
import { pdpTemplateBlocks } from '@/blocks/pdp';
import { slugField } from '@/fields/slug';

export const ProductTemplates: CollectionConfig = {
  slug: 'product-templates',
  labels: {
    singular: 'Product Template',
    plural: 'Product Templates',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'updatedAt'],
    group: 'Content',
    description:
      'Shared PDP section layouts. Products pick a template and override sections as needed.',
  },
  access: {
    read: anyone,
    create: editorsAndAdmins,
    update: editorsAndAdmins,
    delete: editorsAndAdmins,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    slugField({ fallbackFrom: 'name' }),
    {
      name: 'layout',
      type: 'blocks',
      label: 'PDP Sections',
      blocks: pdpTemplateBlocks,
      admin: {
        initCollapsed: true,
        description:
          'Common section content for products using this template. Section order here defines the PDP.',
      },
    },
  ],
};
