import type { Media } from '@/payload-types';

type CmsLink = {
  type?: 'page' | 'custom' | null;
  label?: string | null;
  url?: string | null;
  openInNewTab?: boolean | null;
  page?: number | { id?: number; slug?: string | null } | null;
  appearance?: 'primary' | 'secondary' | 'ghost' | null;
};

export function resolveLink(link: CmsLink | null | undefined): {
  href: string;
  label: string;
  openInNewTab: boolean;
  appearance: 'primary' | 'secondary' | 'ghost';
} | null {
  if (!link?.label) {
    return null;
  }

  let href = '/';

  if (link.type === 'page' && link.page && typeof link.page === 'object' && link.page.slug) {
    href = link.page.slug === 'home' ? '/' : `/${link.page.slug}`;
  } else if (link.url) {
    href = link.url;
  } else {
    return null;
  }

  return {
    href,
    label: link.label,
    openInNewTab: Boolean(link.openInNewTab),
    appearance: link.appearance ?? 'primary',
  };
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
