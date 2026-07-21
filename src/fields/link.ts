import type { Field } from 'payload';

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
  {
    name: 'page',
    type: 'relationship',
    relationTo: 'pages',
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'page',
    },
  },
  {
    name: 'url',
    type: 'text',
    label: 'Custom URL',
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'custom',
      description: 'Absolute URL or site path (e.g. /products or https://example.com).',
    },
  },
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

/** Nested menu item used by Navigation and Footer globals. */
export function navItemFields(depth = 0): Field[] {
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
    {
      name: 'page',
      type: 'relationship',
      relationTo: 'pages',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'page',
      },
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
    },
    {
      name: 'openInNewTab',
      type: 'checkbox',
      defaultValue: false,
    },
  ];

  if (depth < 1) {
    fields.push({
      name: 'children',
      type: 'array',
      label: 'Dropdown Items',
      admin: {
        initCollapsed: true,
        description: 'Optional nested links (one level).',
      },
      fields: navItemFields(depth + 1),
    });
  }

  return fields;
}
