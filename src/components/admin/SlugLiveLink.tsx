'use client';

import { useDocumentInfo, useField } from '@payloadcms/ui';

function buildPublicPath(
  slug: string | null | undefined,
  collectionSlug?: string | null,
): string | null {
  if (!slug || typeof slug !== 'string') {
    return null;
  }

  const cleaned = slug.trim().replace(/^\/+|\/+$/g, '');
  if (!cleaned) {
    return null;
  }

  if (collectionSlug === 'products') {
    return `/products/${cleaned}`;
  }

  if (cleaned === 'home') {
    return '/';
  }

  return `/${cleaned}`;
}

function getSiteOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  if (fromEnv) {
    return fromEnv;
  }

  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  return 'http://localhost:3000';
}

/** Shows the public URL for the current slug under the slug field. */
export function SlugLiveLink() {
  const { collectionSlug } = useDocumentInfo();
  const { value } = useField<string>({ path: 'slug' });
  const path = buildPublicPath(value, collectionSlug);
  const origin = getSiteOrigin();
  const displayHref = path === '/' ? origin : path ? `${origin}${path}` : null;
  const href = path === '/' ? `${origin}/` : displayHref;

  return (
    <div style={{ marginTop: '0.35rem' }}>
      <div
        className="field-description"
        style={{ color: 'var(--theme-elevation-800)', fontSize: '0.75rem', lineHeight: 1.4 }}
      >
        URL-friendly identifier. Auto-generated from title if left blank.
      </div>

      {displayHref && href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            marginTop: '0.45rem',
            fontSize: '0.8125rem',
            color: 'var(--theme-success-600, #3ac47d)',
            wordBreak: 'break-all',
          }}
        >
          {displayHref}
        </a>
      ) : (
        <div
          style={{
            marginTop: '0.45rem',
            fontSize: '0.8125rem',
            color: 'var(--theme-elevation-600)',
          }}
        >
          Enter a slug to preview the page URL.
        </div>
      )}

      {collectionSlug === 'pages' && value && value !== 'home' ? (
        <div
          style={{
            marginTop: '0.35rem',
            fontSize: '0.7rem',
            color: 'var(--theme-elevation-600)',
            lineHeight: 1.35,
          }}
        >
          Tip: use slug <code>home</code> for the site homepage (root URL).
        </div>
      ) : null}
    </div>
  );
}
