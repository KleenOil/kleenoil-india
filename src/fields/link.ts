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
        'One or two columns. Typical setups: Products + Services, Industry + Applications, Profile + News.',
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
            'Desktop: full-width panel under the bar. Add 1–2 columns below. Mobile uses the same links as a list.',
        },
      },
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
              'Only used if Columns is empty. Prefer Columns → Product tiles for the new menu.',
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
