import type { CollectionConfig, CollectionBeforeChangeHook } from 'payload';

import { anyone, editorsAndAdmins } from '@/access/roles';
import { pdpTemplateBlocks } from '@/blocks/pdp';
import { slugField } from '@/fields/slug';

const clearTemplateContaminationItems: CollectionBeforeChangeHook = async ({
  data,
  originalDoc,
  operation,
  req,
}) => {
  if (operation !== 'update' || originalDoc?.id == null) {
    return data;
  }

  const db = req.payload.db as {
    pool?: { query: (query: string, params?: unknown[]) => Promise<unknown> };
  };

  if (typeof db.pool?.query === 'function') {
    try {
      await db.pool.query(
        `DELETE FROM product_templates_blocks_pdp_contamination_items
         WHERE _parent_id IN (
           SELECT id FROM product_templates_blocks_pdp_contamination WHERE _parent_id = $1
         )`,
        [originalDoc.id],
      );
    } catch (error) {
      req.payload.logger.warn(
        { err: error },
        'Could not clear contamination items before template save',
      );
    }
  }

  return data;
};

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
  hooks: {
    beforeChange: [clearTemplateContaminationItems],
  },
};
