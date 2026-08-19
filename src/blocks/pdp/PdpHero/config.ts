import type { Block, Field } from 'payload';

import { linkArrayField } from '../../shared';
import { withDataSource } from '../shared';

const pdpHeroFields: Field[] = [
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
  {
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
  },
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
    fields: [
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
    ],
  },
  linkArrayField({ name: 'ctas', label: 'CTAs', maxRows: 2 }),
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

/** Template editor — all fields always visible. */
export const PdpHeroTemplate = heroBlock(pdpHeroFields);

/** Product editor — Common/Custom toggle. */
export const PdpHero = heroBlock(withDataSource(pdpHeroFields));
