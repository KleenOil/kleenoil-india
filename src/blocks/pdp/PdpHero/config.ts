import type { Block, Field } from 'payload';

import { linkArrayField } from '../../shared';
import { dataSourceField } from '../shared';
import { withClientCondition } from '@/fields/withClientCondition';

const quickSpecFields: Field[] = [
  { name: 'value', type: 'text', required: true },
  { name: 'label', type: 'text', required: true },
  {
    name: 'animateCounter',
    type: 'checkbox',
    label: 'Animate value as counter',
    defaultValue: false,
    admin: {
      description:
        'When enabled, the value counts up when this spec scrolls into view (works best with numeric values like 99.9% or 5×).',
    },
  },
];

const configSpecFields: Field[] = [
  {
    name: 'label',
    type: 'text',
    required: true,
    admin: { description: 'e.g. Type or Pump Flow Rate' },
  },
  {
    name: 'value',
    type: 'text',
    required: true,
    admin: { description: 'e.g. Centrifugal — Standard' },
  },
];

const configSpecsField = (description: string): Field => ({
  name: 'configSpecs',
  type: 'array',
  label: 'Configuration specs',
  labels: { singular: 'Row', plural: 'Rows' },
  admin: {
    description,
    initCollapsed: true,
  },
  fields: configSpecFields,
});

const galleryField: Field = {
  name: 'gallery',
  type: 'upload',
  relationTo: 'media',
  hasMany: true,
  maxRows: 8,
  label: 'Gallery',
  admin: {
    description: 'Select or upload multiple images at once. Reorder as needed.',
    isSortable: true,
  },
};

const heroContentFields: Field[] = [
  {
    name: 'badge',
    type: 'text',
    label: 'Gallery badge',
    admin: { description: 'e.g. FLAGSHIP SYSTEM' },
  },
  {
    name: 'eyebrow',
    type: 'text',
    label: 'Eyebrow',
    admin: { description: 'e.g. 01 / OIL FILTRATION SYSTEMS' },
  },
  {
    name: 'title',
    type: 'textarea',
    label: 'Title',
    admin: { description: 'Use line breaks for multi-line titles.' },
  },
  {
    name: 'summary',
    type: 'textarea',
    label: 'Summary',
  },
  galleryField,
  {
    name: 'quickSpecsPerRow',
    type: 'select',
    label: 'Cards per row',
    defaultValue: 'auto',
    options: [
      { label: 'Auto', value: 'auto' },
      { label: '1', value: 'one' },
      { label: '2', value: 'two' },
      { label: '3', value: 'three' },
      { label: '4', value: 'four' },
    ],
    admin: {
      description:
        'Auto fills the row from how many specs you add (max 4, then wraps). 1–4 lock that many cards per row.',
    },
  },
  {
    name: 'quickSpecs',
    type: 'array',
    label: 'Quick Specs',
    maxRows: 8,
    fields: quickSpecFields,
  },
  configSpecsField('Label/value rows under the model picker. Variants can override these.'),
  linkArrayField({ name: 'ctas', label: 'CTAs', maxRows: 2 }),
];

const variantFields: Field[] = [
  {
    name: 'enableVariants',
    type: 'checkbox',
    label: 'Enable model variants',
    defaultValue: false,
    admin: {
      description:
        'When on, visitors pick a model and the gallery, title, summary, and configuration rows update to that variant.',
    },
  },
  withClientCondition(
    {
      name: 'selectorStyle',
      type: 'select',
      label: 'Variant selector',
      defaultValue: 'chips',
      options: [
        { label: 'Chips', value: 'chips' },
        { label: 'List', value: 'list' },
        { label: 'Dropdown', value: 'dropdown' },
      ],
      admin: {
        description: 'Chips = 2-column grid. List = full-width rows. Dropdown = compact select.',
      },
    },
    { sibling: 'enableVariants', truthy: true },
  ),
  withClientCondition(
    {
      name: 'selectorLabel',
      type: 'text',
      label: 'Selector label',
      admin: {
        description: 'Defaults to SELECT MODEL for chips, SELECT CONFIGURATION for list.',
      },
    },
    { sibling: 'enableVariants', truthy: true },
  ),
  withClientCondition(
    {
      name: 'configSpecsLabel',
      type: 'text',
      label: 'Configuration table label',
      admin: {
        description: 'Defaults to CONFIGURATION.',
      },
    },
    { sibling: 'enableVariants', truthy: true },
  ),
  withClientCondition(
    {
      name: 'variants',
      type: 'array',
      label: 'Models',
      labels: {
        singular: 'Model',
        plural: 'Models',
      },
      admin: {
        description:
          'Each model can have its own images and configuration rows. Leave a field empty to fall back to the Hero tab.',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Model name',
          admin: { description: 'e.g. KF-LC-200 Standard' },
        },
        {
          name: 'code',
          type: 'text',
          label: 'Code',
          admin: { hidden: true },
        },
        {
          name: 'series',
          type: 'text',
          label: 'Series',
          admin: { hidden: true },
        },
        {
          name: 'meta',
          type: 'text',
          label: 'Detail line',
          admin: { hidden: true },
        },
        {
          name: 'isDefault',
          type: 'checkbox',
          label: 'Default selected',
          defaultValue: false,
        },
        {
          name: 'badge',
          type: 'text',
          label: 'Gallery badge override',
        },
        {
          name: 'title',
          type: 'textarea',
          label: 'Title override',
        },
        {
          name: 'summary',
          type: 'textarea',
          label: 'Summary override',
        },
        {
          ...galleryField,
          label: 'Variant gallery',
          admin: {
            description: 'Images for this model. Leave empty to keep the Hero tab gallery.',
            isSortable: true,
          },
        },
        {
          name: 'quickSpecs',
          type: 'array',
          label: 'Quick specs override',
          maxRows: 8,
          admin: {
            hidden: true,
          },
          fields: quickSpecFields,
        },
        configSpecsField('Leave empty to keep the Hero tab configuration rows.'),
      ],
    },
    { sibling: 'enableVariants', truthy: true },
  ),
];

const pdpHeroFields: Field[] = [
  {
    type: 'tabs',
    tabs: [
      {
        label: 'Hero',
        description: 'Default copy, gallery, specs, and buttons.',
        fields: heroContentFields,
      },
      {
        label: 'Variants',
        description:
          'Optional models. Changing a model swaps images and the fields you fill per row.',
        fields: variantFields,
      },
    ],
  },
];

function heroBlock(fields: Field[]): Block {
  return {
    slug: 'pdp-hero',
    labels: {
      singular: 'PDP Hero',
      plural: 'PDP Heroes',
    },
    fields,
  };
}

function applyCustomCondition(fields: Field[]): Field[] {
  return fields.map((field) => {
    if (field.type === 'tabs' && 'tabs' in field) {
      return {
        ...field,
        tabs: field.tabs.map((tab) => ({
          ...tab,
          fields: applyCustomCondition(tab.fields),
        })),
      };
    }

    if (!('name' in field) || field.name === 'dataSource') {
      return field;
    }

    return withClientCondition(field, { sibling: 'dataSource', equals: 'custom' });
  });
}

/** Template editor — all fields always visible. */
export const PdpHeroTemplate = heroBlock(pdpHeroFields);

/** Product editor — Common/Custom toggle. */
export const PdpHero = heroBlock([dataSourceField, ...applyCustomCondition(pdpHeroFields)]);
