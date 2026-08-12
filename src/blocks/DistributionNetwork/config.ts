import type { Block } from 'payload';

import { sectionHeaderFields } from '../shared';

export const DistributionNetwork: Block = {
  slug: 'distribution-network',
  labels: {
    singular: 'Distribution Network',
    plural: 'Distribution Networks',
  },
  fields: [
    ...sectionHeaderFields,
    {
      name: 'mapImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Map Image (optional override)',
      admin: {
        description:
          'Leave empty to use the interactive India map. Upload only if you want a static image instead.',
      },
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Network Stats',
      maxRows: 6,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      name: 'regionalOffices',
      type: 'array',
      label: 'Regional Offices',
      fields: [
        { name: 'city', type: 'text', required: true },
        { name: 'region', type: 'text', required: true },
        {
          name: 'kind',
          type: 'select',
          label: 'Pin type',
          defaultValue: 'hub',
          options: [
            { label: 'Headquarters', value: 'hq' },
            { label: 'Regional Hub', value: 'hub' },
            { label: 'Partner / Service', value: 'partner' },
          ],
        },
        {
          name: 'mapX',
          type: 'number',
          label: 'Map X (0–100)',
          admin: {
            description:
              'Optional horizontal pin override as % of map width (0–100). Leave blank for city preset.',
            step: 0.1,
          },
          min: 0,
          max: 100,
        },
        {
          name: 'mapY',
          type: 'number',
          label: 'Map Y (0–100)',
          admin: {
            description:
              'Optional vertical pin override as % of map height (0–100). Leave blank for city preset.',
            step: 0.1,
          },
          min: 0,
          max: 100,
        },
        {
          name: 'mapsUrl',
          type: 'text',
          label: 'Google Maps link',
          admin: {
            description:
              'Optional. Paste a Google Maps place or directions URL. Shows an open-in-maps button on the hub card.',
          },
        },
      ],
    },
    {
      name: 'hq',
      type: 'group',
      label: 'Headquarters',
      fields: [
        { name: 'label', type: 'text', label: 'Eyebrow' },
        { name: 'title', type: 'text', label: 'Title' },
        { name: 'address', type: 'textarea', label: 'Address' },
        { name: 'phone', type: 'text', label: 'Phone' },
        { name: 'mobile', type: 'text', label: 'Mobile' },
        { name: 'email', type: 'email', label: 'Email' },
      ],
    },
    {
      name: 'hqImage',
      type: 'upload',
      relationTo: 'media',
      label: 'HQ Image',
    },
  ],
};
