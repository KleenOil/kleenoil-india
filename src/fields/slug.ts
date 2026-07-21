import type { Field, FieldHook } from 'payload';

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const formatSlug =
  (fallbackFrom: string): FieldHook =>
  ({ data, operation, value }) => {
    if (typeof value === 'string' && value.length > 0) {
      return slugify(value);
    }

    if (operation === 'create' || !value) {
      const fallback = data?.[fallbackFrom];
      if (typeof fallback === 'string' && fallback.length > 0) {
        return slugify(fallback);
      }
    }

    return value;
  };

type SlugFieldOptions = {
  fallbackFrom?: string;
  unique?: boolean;
};

export function slugField(options: SlugFieldOptions = {}): Field {
  const { fallbackFrom = 'title', unique = true } = options;

  return {
    name: 'slug',
    type: 'text',
    required: true,
    unique,
    index: true,
    admin: {
      position: 'sidebar',
      description: 'URL-friendly identifier. Auto-generated from title if left blank.',
    },
    hooks: {
      beforeValidate: [formatSlug(fallbackFrom)],
    },
  };
}
