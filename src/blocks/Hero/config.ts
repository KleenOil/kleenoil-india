import type { Block } from 'payload';

import { withClientCondition } from '@/fields/withClientCondition';
import { eyebrowField, linkArrayField } from '../shared';

export const Hero: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      label: 'Layout',
      defaultValue: 'panel',
      options: [
        { label: 'Panel (homepage)', value: 'panel' },
        { label: 'Immersive (About)', value: 'immersive' },
        { label: 'Slider (auto-play)', value: 'slider' },
      ],
      admin: {
        description:
          'Panel = split content + image. Immersive = full-bleed. Slider = automatic specimen-rail slides.',
      },
    },
    withClientCondition(eyebrowField, { sibling: 'variant', notEquals: 'slider' }),
    withClientCondition(
      {
        name: 'headline',
        type: 'textarea',
        admin: {
          description: 'Primary hero headline. Use line breaks for multi-line titles.',
        },
      },
      { sibling: 'variant', notEquals: 'slider' },
    ),
    withClientCondition(
      {
        name: 'subheadline',
        type: 'textarea',
      },
      { sibling: 'variant', notEquals: 'slider' },
    ),
    withClientCondition(
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
      },
      { sibling: 'variant', notEquals: 'slider' },
    ),
    withClientCondition(linkArrayField({ name: 'ctas', label: 'CTAs', maxRows: 2 }), {
      sibling: 'variant',
      notEquals: 'slider',
    }),
    withClientCondition(
      {
        name: 'metaStats',
        type: 'array',
        label: 'Meta Stats',
        maxRows: 4,
        fields: [
          { name: 'value', type: 'text', required: true },
          { name: 'label', type: 'text', required: true },
        ],
      },
      { sibling: 'variant', notEquals: 'slider' },
    ),
    withClientCondition(
      {
        name: 'slideInterval',
        type: 'select',
        label: 'Auto-play interval',
        defaultValue: '6',
        options: [
          { label: '4 seconds', value: '4' },
          { label: '6 seconds', value: '6' },
          { label: '8 seconds', value: '8' },
          { label: '10 seconds', value: '10' },
          { label: 'Off (arrows only)', value: '0' },
        ],
        admin: {
          description: 'How long each slide stays before advancing. Visitors can still use arrows.',
        },
      },
      { sibling: 'variant', equals: 'slider' },
    ),
    withClientCondition(
      {
        name: 'slides',
        type: 'array',
        label: 'Slides',
        minRows: 1,
        maxRows: 6,
        admin: {
          description: 'The rail at the bottom uses index label + stat.',
        },
        fields: [
          { name: 'indexLabel', type: 'text', required: true, label: 'Rail label' },
          { name: 'stat', type: 'text', required: true, label: 'Rail stat' },
          { name: 'eyebrow', type: 'text' },
          { name: 'headline', type: 'textarea', required: true },
          { name: 'subheadline', type: 'textarea' },
          { name: 'image', type: 'upload', relationTo: 'media' },
          linkArrayField({ name: 'ctas', label: 'CTAs', maxRows: 2 }),
        ],
      },
      { sibling: 'variant', equals: 'slider' },
    ),
  ],
};
