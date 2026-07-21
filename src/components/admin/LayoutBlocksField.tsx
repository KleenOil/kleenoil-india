'use client';

import { BlocksField } from '@payloadcms/ui';
import type { BlocksFieldClientComponent } from 'payload';

import { BlocksDrawerMultiSelect } from '@/components/admin/BlocksDrawerMultiSelect';

/**
 * Default Payload blocks field, plus multi-select support inside the Add Layout drawer.
 */
export const LayoutBlocksField: BlocksFieldClientComponent = (props) => {
  const path = props.path || props.field?.name || 'layout';
  const schemaPath = props.schemaPath || path;

  return (
    <>
      <BlocksField {...props} />
      <BlocksDrawerMultiSelect path={path} schemaPath={schemaPath} />
    </>
  );
};
