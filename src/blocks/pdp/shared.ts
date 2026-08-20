import type { Field } from 'payload';

import { eyebrowField, headingField, descriptionField, linkArrayField, linkField } from '../shared';
import { withClientCondition } from '@/fields/withClientCondition';

/** Common vs product-specific data toggle for every PDP section. */
export const dataSourceField: Field = {
  name: 'dataSource',
  type: 'select',
  label: 'Data source',
  defaultValue: 'common',
  required: true,
  options: [
    { label: 'Common (from template)', value: 'common' },
    { label: 'Custom (this product)', value: 'custom' },
  ],
  admin: {
    description:
      'Common uses the Product Template content for this section. Custom lets this product override it.',
  },
};

/** Hide content fields unless the product section uses Custom data. */
export function withDataSource(fields: Field[]): Field[] {
  return [
    dataSourceField,
    ...fields.map((field) => {
      if (!('name' in field) || field.name === 'dataSource') {
        return field;
      }

      return withClientCondition(field, { sibling: 'dataSource', equals: 'custom' });
    }),
  ];
}

export { eyebrowField, headingField, descriptionField, linkArrayField, linkField };
