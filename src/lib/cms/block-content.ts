const META_KEYS = new Set([
  'id',
  'blockType',
  'blockName',
  '_uuid',
  'variant',
  'slideInterval',
  'headingAlign',
  'showMap',
  'showContactInfo',
  'showForm',
  'showExtraMembers',
  'enableVariants',
  'selectorStyle',
  'selectorLabel',
  'quickSpecsPerRow',
  'variantsPerRow',
  'configSpecsLabel',
  'dataSource',
]);

export function isCmsFilled(value: unknown): boolean {
  if (value == null || value === false) {
    return false;
  }

  if (typeof value === 'string') {
    return value.trim().length > 0;
  }

  if (typeof value === 'number') {
    return Number.isFinite(value);
  }

  if (typeof value === 'boolean') {
    return false;
  }

  if (Array.isArray(value)) {
    return value.some(isCmsFilled);
  }

  if (typeof value === 'object') {
    return Object.entries(value as Record<string, unknown>).some(([key, nested]) => {
      if (META_KEYS.has(key)) {
        return false;
      }

      return isCmsFilled(nested);
    });
  }

  return false;
}

/** True when the CMS block has any real content, not just ids / block type. */
export function blockHasCmsData(block: object | null | undefined): boolean {
  if (!block) {
    return false;
  }

  return Object.entries(block as Record<string, unknown>).some(([key, value]) => {
    if (META_KEYS.has(key)) {
      return false;
    }

    return isCmsFilled(value);
  });
}

/**
 * If the block has any CMS content, never mix in placeholders — return the real
 * value or empty. If the block is still blank, use the design fallback.
 */
export function cmsText(
  value: string | null | undefined,
  fallback: string | null | undefined,
  hasCms: boolean,
): string {
  const trimmed = typeof value === 'string' ? value.trim() : '';
  if (trimmed) {
    return typeof value === 'string' ? value : trimmed;
  }

  return hasCms ? '' : (fallback ?? '');
}

export function cmsList<T>(
  value: T[] | null | undefined,
  fallback: T[],
  hasCms: boolean,
  keep: (item: T) => boolean,
): T[] {
  const items = (value ?? []).filter(keep);
  if (items.length) {
    return items;
  }

  return hasCms ? [] : fallback;
}

export function cmsValue<T>(
  value: T | null | undefined,
  fallback: T,
  hasCms: boolean,
): T | undefined {
  if (isCmsFilled(value)) {
    return value as T;
  }

  return hasCms ? undefined : fallback;
}
