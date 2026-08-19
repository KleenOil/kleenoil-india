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
  /** Empty when the CMS row has a label but no page/URL. */
  href: string;
  label: string;
  openInNewTab: boolean;
  appearance: 'primary' | 'secondary' | 'ghost';
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

function resolveHref(data: CmsLink): string {
  if (data.type === 'page' && data.page && typeof data.page === 'object' && data.page.slug) {
    return data.page.slug === 'home' ? '/' : `/${data.page.slug}`;
  }

  if (typeof data.url === 'string' && data.url.trim()) {
    return data.url.trim();
  }

  return '';
}

/**
 * Resolve a CMS link for frontend buttons/nav.
 * Returns when a label is present so CTA copy is kept even if URL/page is empty.
 * An empty `href` means the UI should render a non-clickable element.
 */
export function resolveLink(
  link: CmsLink | { link?: CmsLink | null } | null | undefined,
): ResolvedLink | null {
  const data = unwrapLink(link);
  if (!data) {
    return null;
  }

  const label = typeof data.label === 'string' ? data.label.trim() : '';
  if (!label) {
    return null;
  }

  return {
    href: resolveHref(data),
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
    .map((item) => resolveLink(item))
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

/** Prefer a relative path so `next/image` localPatterns can serve Payload files. */
function toNextImageSrc(url: string): string {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return url;
  }

  try {
    const parsed = new URL(url);
    const site = process.env.NEXT_PUBLIC_SITE_URL;
    const sameOrigin = site ? parsed.origin === new URL(site).origin : false;
    const localPayloadFile =
      parsed.pathname.startsWith('/api/media/file/') &&
      (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1');

    if (sameOrigin || localPayloadFile) {
      return `${parsed.pathname}${parsed.search}`;
    }
  } catch {
    return url;
  }

  return url;
}

export function getMediaUrl(media: number | Media | null | undefined): string | null {
  if (!media || typeof media === 'number') {
    return null;
  }

  return media.url ? toNextImageSrc(media.url) : null;
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
