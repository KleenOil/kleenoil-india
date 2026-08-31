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

function megaLinkFields(depth: number): Field[] {
  const fields: Field[] = [
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'radio',
      defaultValue: 'custom',
      options: [
        { label: 'Internal Page', value: 'page' },
        { label: 'Custom URL', value: 'custom' },
      ],
      admin: { layout: 'horizontal' },
    },
    withClientCondition(
      { name: 'page', type: 'relationship', relationTo: 'pages' },
      { sibling: 'type', equals: 'page' },
    ),
    withClientCondition(
      {
        name: 'url',
        type: 'text',
        label: 'URL',
        admin: {
          description: 'Optional. Leave empty for a hover-only parent (no click).',
        },
      },
      { sibling: 'type', equals: 'custom' },
    ),
  ];

  if (depth < 2) {
    const childName = depth === 0 ? 'children' : 'items';
    fields.push({
      name: childName,
      type: 'array',
      label: depth === 0 ? 'Level 2' : 'Level 3',
      labels: { singular: 'Link', plural: 'Links' },
      admin: {
        initCollapsed: true,
        description:
          depth === 0
            ? 'Revealed when this row is hovered. Add Level 3 on a child to open a third column.'
            : 'Revealed when this row is hovered. Terminal links have no children.',
      },
      fields: megaLinkFields(depth + 1),
    });
  }

  return fields;
}

function megaTreeFields(): Field[] {
  return [
    {
      name: 'megaHeading',
      type: 'text',
      label: 'Panel heading',
      admin: { description: 'Left column title, e.g. Products & Services.' },
    },
    {
      name: 'megaDescription',
      type: 'textarea',
      label: 'Panel description',
    },
    {
      name: 'megaPointers',
      type: 'array',
      label: 'Pointers',
      labels: { singular: 'Pointer', plural: 'Pointers' },
      admin: {
        description: 'Stat rows under the description, e.g. 1988 / Founded.',
        initCollapsed: true,
      },
      fields: [
        { name: 'value', type: 'text', required: true, label: 'Value' },
        { name: 'label', type: 'text', required: true, label: 'Label' },
      ],
    },
    {
      name: 'megaLinks',
      type: 'array',
      label: 'Menu tree',
      labels: { singular: 'Level 1 link', plural: 'Level 1 links' },
      admin: {
        description:
          'Right side, up to 3 levels. Hover reveals the next column. First link with children opens by default.',
        initCollapsed: true,
      },
      fields: megaLinkFields(0),
    },
  ];
}

function megaColumnsField(): Field {
  return {
    name: 'megaColumns',
    type: 'array',
    label: 'Columns',
    labels: { singular: 'Column', plural: 'Columns' },
    maxRows: 2,
    admin: {
      initCollapsed: true,
      description:
        'One or two columns. Typical setups: Products + Services, Industry + Applications, Profile + News. Legacy — Menu tree is preferred.',
    },
    fields: [
      {
        name: 'heading',
        type: 'text',
        label: 'Column heading',
        admin: {
          description: 'Eyebrow, e.g. PRODUCTS or INDUSTRY.',
        },
      },
      {
        name: 'layout',
        type: 'select',
        required: true,
        defaultValue: 'text-list',
        options: [
          { label: 'Product tiles', value: 'product-tiles' },
          { label: 'Text list', value: 'text-list' },
          { label: 'Image list', value: 'image-list' },
          { label: 'Profile', value: 'profile' },
        ],
        admin: {
          description:
            'Product tiles = catalogue cards. Text list = title + copy (Services, Applications). Image list = thumb + name (Industry, News). Profile = one image + story.',
        },
      },
      withClientCondition(
        {
          name: 'products',
          type: 'array',
          label: 'Products',
          labels: { singular: 'Product', plural: 'Products' },
          admin: { initCollapsed: true },
          fields: [
            {
              name: 'product',
              type: 'relationship',
              relationTo: 'products',
              required: true,
            },
          ],
        },
        { sibling: 'layout', equals: 'product-tiles' },
      ),
      withClientCondition(
        withClientCondition(
          {
            name: 'items',
            type: 'array',
            label: 'Items',
            labels: { singular: 'Item', plural: 'Items' },
            admin: { initCollapsed: true },
            fields: [
              { name: 'label', type: 'text', required: true },
              {
                name: 'description',
                type: 'textarea',
                admin: { description: 'Used on text lists. Optional on image lists.' },
              },
              {
                name: 'image',
                type: 'upload',
                relationTo: 'media',
                admin: { description: 'Shown on image lists (industry thumbs, news cards).' },
              },
              {
                name: 'type',
                type: 'radio',
                defaultValue: 'custom',
                options: [
                  { label: 'Internal Page', value: 'page' },
                  { label: 'Custom URL', value: 'custom' },
                ],
                admin: { layout: 'horizontal' },
              },
              withClientCondition(
                { name: 'page', type: 'relationship', relationTo: 'pages' },
                { sibling: 'type', equals: 'page' },
              ),
              withClientCondition(
                { name: 'url', type: 'text', label: 'URL' },
                { sibling: 'type', equals: 'custom' },
              ),
            ],
          },
          { sibling: 'layout', notEquals: 'product-tiles' },
        ),
        { sibling: 'layout', notEquals: 'profile' },
      ),
      withClientCondition(
        {
          name: 'profileImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Profile image',
        },
        { sibling: 'layout', equals: 'profile' },
      ),
      withClientCondition(
        {
          name: 'profileTitle',
          type: 'text',
          label: 'Profile title',
          admin: { description: 'e.g. Since 1988' },
        },
        { sibling: 'layout', equals: 'profile' },
      ),
      withClientCondition(
        {
          name: 'profileCopy',
          type: 'textarea',
          label: 'Profile copy',
        },
        { sibling: 'layout', equals: 'profile' },
      ),
      withClientCondition(
        {
          name: 'ctaLabel',
          type: 'text',
          label: 'Column CTA label',
          admin: { description: 'e.g. Talk to an engineer →' },
        },
        { sibling: 'layout', notEquals: 'product-tiles' },
      ),
      withClientCondition(
        {
          name: 'ctaUrl',
          type: 'text',
          label: 'Column CTA URL',
        },
        { sibling: 'layout', notEquals: 'product-tiles' },
      ),
    ],
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
            'Desktop: full-width panel. Add a heading, pointers, and a menu tree (up to 3 levels). Mobile uses the same links as a list.',
        },
      },
      ...megaTreeFields().map((field) =>
        withClientCondition(field, { sibling: 'enableMegaMenu', truthy: true }),
      ),
      withClientCondition(megaColumnsField(), { sibling: 'enableMegaMenu', truthy: true }),
      withClientCondition(
        {
          name: 'megaProducts',
          type: 'array',
          label: 'Legacy product grid',
          labels: {
            singular: 'Product',
            plural: 'Products',
          },
          admin: {
            description:
              'Legacy. Ignored when Menu tree has rows. Prefer Menu tree for the dual-tone panel.',
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
