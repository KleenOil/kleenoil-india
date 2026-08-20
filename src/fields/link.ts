import type { Field } from 'payload';

import { withClientCondition } from '@/fields/withClientCondition';

/** Shared nav/footer link fields (internal page or custom URL). */
export const linkFields: Field[] = [
  {
    name: 'type',
    type: 'radio',
    required: true,
    defaultValue: 'custom',
    options: [
      { label: 'Internal Page', value: 'page' },
      { label: 'Custom URL', value: 'custom' },
    ],
    admin: {
      layout: 'horizontal',
    },
  },
  {
    name: 'label',
    type: 'text',
  },
  withClientCondition(
    {
      name: 'page',
      type: 'relationship',
      relationTo: 'pages',
    },
    { sibling: 'type', equals: 'page' },
  ),
  withClientCondition(
    {
      name: 'url',
      type: 'text',
      label: 'Custom URL',
      admin: {
        description:
          'Optional. Absolute URL or site path (e.g. /products). Leave empty to keep this as text only.',
      },
    },
    { sibling: 'type', equals: 'custom' },
  ),
  {
    name: 'openInNewTab',
    type: 'checkbox',
    label: 'Open in new tab',
    defaultValue: false,
  },
];

type LinkFieldOptions = {
  name?: string;
  label?: string;
  appearances?: boolean;
};

export function linkField(options: LinkFieldOptions = {}): Field {
  const { name = 'link', label = 'Link', appearances = false } = options;

  const fields: Field[] = [...linkFields];

  if (appearances) {
    fields.push({
      name: 'appearance',
      type: 'select',
      defaultValue: 'primary',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Ghost', value: 'ghost' },
      ],
    });
  }

  return {
    name,
    type: 'group',
    label,
    admin: {
      hideGutter: true,
    },
    fields,
  };
}

export function linkArrayField(
  options: {
    name?: string;
    label?: string;
    maxRows?: number;
    appearances?: boolean;
  } = {},
): Field {
  const { name = 'links', label = 'Links', maxRows, appearances = true } = options;

  return {
    name,
    type: 'array',
    label,
    maxRows,
    admin: {
      initCollapsed: true,
    },
    fields: [linkField({ appearances })],
  };
}

type NavItemFieldOptions = {
  allowMegaMenu?: boolean;
};

/** Nested menu item used by Navigation and Footer globals. */
export function navItemFields(depth = 0, options: NavItemFieldOptions = {}): Field[] {
  const fields: Field[] = [
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'radio',
      required: true,
      defaultValue: 'custom',
      options: [
        { label: 'Internal Page', value: 'page' },
        { label: 'Custom URL', value: 'custom' },
      ],
      admin: {
        layout: 'horizontal',
      },
    },
    withClientCondition(
      {
        name: 'page',
        type: 'relationship',
        relationTo: 'pages',
      },
      { sibling: 'type', equals: 'page' },
    ),
    withClientCondition(
      {
        name: 'url',
        type: 'text',
      },
      { sibling: 'type', equals: 'custom' },
    ),
    {
      name: 'openInNewTab',
      type: 'checkbox',
      defaultValue: false,
    },
  ];

  if (depth < 1 && options.allowMegaMenu) {
    fields.push(
      {
        name: 'enableMegaMenu',
        type: 'checkbox',
        label: 'Mega dropdown',
        defaultValue: false,
        admin: {
          description:
            'Desktop: product grid with hover image swap. Mobile: the same products as a normal list.',
        },
      },
      withClientCondition(
        {
          name: 'megaProducts',
          type: 'array',
          label: 'Mega Menu Products',
          labels: {
            singular: 'Product',
            plural: 'Products',
          },
          admin: {
            description: 'Each row picks one product. The first two images and the title are used.',
            initCollapsed: true,
          },
          fields: [
            {
              name: 'product',
              type: 'relationship',
              relationTo: 'products',
              required: true,
            },
          ],
        },
        { sibling: 'enableMegaMenu', truthy: true },
      ),
      withClientCondition(
        {
          name: 'productsPerRow',
          type: 'number',
          label: 'Products per row',
          min: 1,
          max: 12,
          admin: {
            description: 'Leave empty for auto — products spread equally and wrap by screen size.',
            step: 1,
          },
        },
        { sibling: 'enableMegaMenu', truthy: true },
      ),
    );
  }

  if (depth < 1) {
    fields.push(
      options.allowMegaMenu
        ? withClientCondition(
            {
              name: 'children',
              type: 'array',
              label: 'Dropdown Items',
              admin: {
                initCollapsed: true,
                description: 'Optional nested links (one level). Hidden when mega dropdown is on.',
              },
              fields: navItemFields(depth + 1),
            },
            { sibling: 'enableMegaMenu', falsy: true },
          )
        : {
            name: 'children',
            type: 'array',
            label: 'Dropdown Items',
            admin: {
              initCollapsed: true,
              description: 'Optional nested links (one level).',
            },
            fields: navItemFields(depth + 1),
          },
    );
  }

  return fields;
}
