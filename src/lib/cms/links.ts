import type { Media } from '@/payload-types';

export type CmsLink = {
  type?: 'page' | 'custom' | null;
  label?: string | null;
  url?: string | null;
  openInNewTab?: boolean | null;
  page?: number | string | { id?: number | string; slug?: string | null } | null;
  appearance?: 'primary' | 'secondary' | 'ghost' | null;
};

export type ResolvedLink = {
  href: string;
  label: string;
  openInNewTab: boolean;
  appearance: 'primary' | 'secondary' | 'ghost';
};

type ResolveLinkOptions = {
  /** Used when label exists but page/url is missing. */
  fallbackHref?: string;
};

/** Normalize nested `{ link }` rows or flat link groups from Payload. */
export function unwrapLink(
  value: CmsLink | { link?: CmsLink | null } | null | undefined,
): CmsLink | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  if ('link' in value) {
    const nested = (value as { link?: CmsLink | null }).link;
    return nested ?? null;
  }

  return value as CmsLink;
}

/**
 * Resolve a CMS link for frontend buttons/nav.
 * Always returns when a label is present so CTA label edits are never dropped
 * just because URL/page was left empty.
 */
export function resolveLink(
  link: CmsLink | { link?: CmsLink | null } | null | undefined,
  options: ResolveLinkOptions = {},
): ResolvedLink | null {
  const data = unwrapLink(link);
  if (!data) {
    return null;
  }

  const label = typeof data.label === 'string' ? data.label.trim() : '';
  if (!label) {
    return null;
  }

  const fallbackHref = options.fallbackHref ?? '/';
  let href = fallbackHref;

  if (data.type === 'page' && data.page && typeof data.page === 'object' && data.page.slug) {
    href = data.page.slug === 'home' ? '/' : `/${data.page.slug}`;
  } else if (typeof data.url === 'string' && data.url.trim()) {
    href = data.url.trim();
  }

  return {
    href,
    label,
    openInNewTab: Boolean(data.openInNewTab),
    appearance: data.appearance ?? 'primary',
  };
}

type CtaFallback = {
  label: string;
  href: string;
  appearance?: 'primary' | 'secondary' | 'ghost';
  openInNewTab?: boolean;
};

/**
 * Resolve a CTA array from CMS. Uses CMS rows whenever any label resolves;
 * only falls back to defaults when the CMS array is empty / unusable.
 */
export function resolveCtaList(
  items: Array<{ link?: CmsLink | null } | CmsLink | null | undefined> | null | undefined,
  fallbacks: CtaFallback[],
): ResolvedLink[] {
  if (!items?.length) {
    return fallbacks.map((cta) => ({
      label: cta.label,
      href: cta.href,
      appearance: cta.appearance ?? 'primary',
      openInNewTab: Boolean(cta.openInNewTab),
    }));
  }

  const resolved = items
    .map((item, index) =>
      resolveLink(item, {
        fallbackHref: fallbacks[index]?.href ?? fallbacks[0]?.href ?? '/',
      }),
    )
    .filter((item): item is ResolvedLink => Boolean(item));

  if (!resolved.length) {
    return fallbacks.map((cta) => ({
      label: cta.label,
      href: cta.href,
      appearance: cta.appearance ?? 'primary',
      openInNewTab: Boolean(cta.openInNewTab),
    }));
  }

  return resolved;
}

export function getMediaUrl(media: number | Media | null | undefined): string | null {
  if (!media || typeof media === 'number') {
    return null;
  }

  return media.url ?? null;
}

export function getMediaAlt(media: number | Media | null | undefined, fallback = ''): string {
  if (!media || typeof media === 'number') {
    return fallback;
  }

  if (media.alt) {
    return media.alt;
  }

  if (media.filename) {
    const base = media.filename.split(/[/\\]/).pop() || media.filename;
    return base.replace(/\.[^.]+$/, '') || base;
  }

  return fallback;
}
