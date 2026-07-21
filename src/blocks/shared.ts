import type { Field } from 'payload';

import { linkArrayField, linkField } from '@/fields/link';

export const eyebrowField: Field = {
  name: 'eyebrow',
  type: 'text',
  label: 'Eyebrow',
};

export const headingField: Field = {
  name: 'heading',
  type: 'text',
  label: 'Heading',
};

export const descriptionField: Field = {
  name: 'description',
  type: 'textarea',
  label: 'Description',
};

/** Common section header fields used across content blocks. */
export const sectionHeaderFields: Field[] = [eyebrowField, headingField, descriptionField];

export { linkArrayField, linkField };
