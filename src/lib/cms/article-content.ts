type LexicalNode = {
  type?: string;
  tag?: string;
  text?: string;
  children?: LexicalNode[];
};

export function nodePlainText(node: unknown): string {
  if (!node || typeof node !== 'object') {
    return '';
  }

  const current = node as LexicalNode & { root?: LexicalNode };
  if (typeof current.text === 'string') {
    return current.text;
  }

  if (current.root) {
    return nodePlainText(current.root);
  }

  if (!Array.isArray(current.children)) {
    return '';
  }

  return current.children.map((child) => nodePlainText(child)).join('');
}

export function headingAnchor(label: string): string {
  return label
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function uniqueHeadingId(label: string, seen: Map<string, number>): string {
  const id = headingAnchor(label) || 'section';
  const count = (seen.get(id) ?? 0) + 1;
  seen.set(id, count);
  return count > 1 ? `${id}-${count}` : id;
}

export type ArticleHeading = {
  id: string;
  label: string;
};

export function extractArticleHeadings(content: unknown): ArticleHeading[] {
  if (!content || typeof content !== 'object' || !('root' in content)) {
    return [];
  }

  const root = (content as { root?: { children?: unknown[] } }).root;
  const children = root?.children;
  if (!Array.isArray(children)) {
    return [];
  }

  const headings: ArticleHeading[] = [];
  const seen = new Map<string, number>();

  for (const node of children) {
    if (!node || typeof node !== 'object') {
      continue;
    }

    const current = node as LexicalNode;
    if (current.type !== 'heading' || (current.tag !== 'h2' && current.tag !== 'h3')) {
      continue;
    }

    const label = nodePlainText(current).trim();
    if (!label) {
      continue;
    }

    headings.push({ id: uniqueHeadingId(label, seen), label });
  }

  return headings;
}

export type TocOverride = {
  label?: string | null;
  heading?: string | null;
};

function normalizeHeading(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function resolveArticleToc(
  extracted: ArticleHeading[],
  overrides?: TocOverride[] | null,
): ArticleHeading[] {
  const rows = overrides?.filter((row) => row.label?.trim()) ?? [];
  if (rows.length === 0) {
    return extracted;
  }

  return rows.map((row, index) => {
    const label = row.label!.trim();
    const target = row.heading?.trim() || label;
    const needle = normalizeHeading(target);

    const match =
      extracted.find((item) => normalizeHeading(item.label) === needle) ??
      extracted.find(
        (item) =>
          normalizeHeading(item.label).includes(needle) ||
          needle.includes(normalizeHeading(item.label)),
      );

    return {
      id: match?.id || headingAnchor(target) || `section-${index + 1}`,
      label,
    };
  });
}

export function estimateReadMinutes(content: unknown): number {
  const text = nodePlainText(content);
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200) || 1);
}

export function authorInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return 'KO';
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase();
}

export function splitCategory(category?: string | null): { value: string; label: string } {
  const parts = (category?.trim() || 'ARTICLE').split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return { value: parts[0], label: parts.slice(1).join(' ') };
  }

  return { value: parts[0] ?? 'ARTICLE', label: 'JOURNAL' };
}
