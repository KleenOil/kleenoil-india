import type { CollectionConfig, CollectionBeforeChangeHook } from 'payload';

import { anyone, editorsAndAdmins } from '@/access/roles';
import { pdpBlocks } from '@/blocks/pdp';
import { seoField } from '@/fields/seo';
import { slugField } from '@/fields/slug';

type LayoutBlock = {
  blockType?: string;
  dataSource?: 'common' | 'custom' | null;
  id?: string | null;
  [key: string]: unknown;
};

function templateId(value: unknown): number | string | null {
  if (typeof value === 'number' || typeof value === 'string') {
    return value;
  }
  if (value && typeof value === 'object' && 'id' in value) {
    const id = (value as { id?: number | string }).id;
    return id ?? null;
  }
  return null;
}

const syncLayoutFromTemplate: CollectionBeforeChangeHook = async ({ data, originalDoc, req }) => {
  if (!data) {
    return data;
  }

  const nextTemplateId = templateId(data.template);
  const prevTemplateId = templateId(originalDoc?.template);

  if (!nextTemplateId) {
    return data;
  }

  const templateChanged = String(nextTemplateId) !== String(prevTemplateId ?? '');
  const layoutEmpty = !Array.isArray(data.layout) || data.layout.length === 0;

  if (!templateChanged && !layoutEmpty) {
    return data;
  }

  const template = await req.payload.findByID({
    collection: 'product-templates',
    id: nextTemplateId,
    depth: 0,
    req,
  });

  const templateLayout = (template?.layout as LayoutBlock[] | null | undefined) ?? [];
  if (!templateLayout.length) {
    return data;
  }

  const existing = (Array.isArray(data.layout) ? data.layout : []) as LayoutBlock[];
  const customByType = new Map<string, LayoutBlock>();

  for (const block of existing) {
    if (block.blockType && block.dataSource === 'custom') {
      customByType.set(block.blockType, block);
    }
  }

  data.layout = templateLayout.map((block) => {
    const blockType = String(block.blockType ?? '');
    const custom = customByType.get(blockType);
    if (custom) {
      return custom;
    }

    return {
      blockType,
      dataSource: 'common' as const,
    };
  });

  return data;
};

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: 'Product',
    plural: 'Products',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'template', 'updatedAt'],
    group: 'Content',
  },
  // Products publish immediately on save. Drafts were causing new products to
  // "disappear" from the site because editors saved without ever clicking
  // "Publish". Keep version history (no drafts) so past edits are recoverable.
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
      name: 'name',
      type: 'text',
      required: true,
    },
    slugField({ fallbackFrom: 'name' }),
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Short Description',
      admin: {
        description: 'Used on product cards and listings.',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Highlight in listings and homepage modules.',
      },
    },
    {
      name: 'template',
      type: 'relationship',
      relationTo: 'product-templates',
      required: true,
      admin: {
        description: 'PDP section order and common content come from this template.',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'PDP Sections',
      blocks: pdpBlocks,
      admin: {
        initCollapsed: true,
        description:
          'Per-section Common/Custom toggle. Common pulls content from the selected template.',
      },
    },
    seoField,
  ],
  hooks: {
    beforeChange: [syncLayoutFromTemplate],
  },
};
