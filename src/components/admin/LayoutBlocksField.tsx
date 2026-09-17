'use client';

import { BlocksField } from '@payloadcms/ui';
import type { BlocksFieldClientComponent } from 'payload';

import { BlocksDrawerMultiSelect } from '@/components/admin/BlocksDrawerMultiSelect';

type ClientBlock = {
  slug?: string;
  labels?: {
    singular?: unknown;
  };
};

/**
 * Default Payload blocks field, plus multi-select support inside the Add Layout drawer.
 */
export const LayoutBlocksField: BlocksFieldClientComponent = (props) => {
  const path = props.path || props.field?.name || 'layout';
  const schemaPath = props.schemaPath || path;
  const rawBlocks = Array.isArray(props.field?.blocks) ? props.field.blocks : [];
  const blocks: ClientBlock[] = rawBlocks.map((block) => {
    if (typeof block === 'string') {
      return { slug: block };
    }
    return {
      slug: typeof block.slug === 'string' ? block.slug : undefined,
      labels: block.labels,
    };
  });

  return (
    <>
      <BlocksField {...props} />
      <BlocksDrawerMultiSelect blocks={blocks} path={path} schemaPath={schemaPath} />
    </>
  );
};
