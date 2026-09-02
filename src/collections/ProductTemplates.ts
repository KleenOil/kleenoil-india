import type { CollectionConfig, CollectionBeforeChangeHook } from 'payload';

import { anyone, editorsAndAdmins } from '@/access/roles';
import { pdpTemplateBlocks } from '@/blocks/pdp';
import { slugField } from '@/fields/slug';

const NESTED_ARRAY_KEYS = new Set([
  'items',
  'quickSpecs',
  'configSpecs',
  'steps',
  'machines',
  'columns',
  'models',
  'results',
  'cards',
  'ctas',
  'trustBadges',
  'variants',
]);

function stripIdsFromRows(rows: unknown[]): void {
  for (const row of rows) {
    if (!row || typeof row !== 'object') {
      continue;
    }

    delete (row as { id?: unknown }).id;

    for (const [key, value] of Object.entries(row as Record<string, unknown>)) {
      if (NESTED_ARRAY_KEYS.has(key) && Array.isArray(value)) {
        stripIdsFromRows(value);
      }
    }
  }
}

function stripNestedArrayIds(layout: unknown): void {
  if (!Array.isArray(layout)) {
    return;
  }

  for (const block of layout) {
    if (!block || typeof block !== 'object') {
      continue;
    }

    for (const [key, value] of Object.entries(block as Record<string, unknown>)) {
      if (!NESTED_ARRAY_KEYS.has(key) || !Array.isArray(value)) {
        continue;
      }

      stripIdsFromRows(value);
    }
  }
}

const clearTemplateContaminationItems: CollectionBeforeChangeHook = async ({
  data,
  originalDoc,
  operation,
  req,
}) => {
  if (data) {
    stripNestedArrayIds(data.layout);
  }

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
