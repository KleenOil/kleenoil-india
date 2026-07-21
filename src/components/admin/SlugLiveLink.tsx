'use client';

import { useField } from '@payloadcms/ui';

function buildPagePath(slug: string | null | undefined): string | null {
  if (!slug || typeof slug !== 'string') {
    return null;
  }

  const cleaned = slug.trim().replace(/^\/+|\/+$/g, '');
  if (!cleaned) {
    return null;
  }

  // Reserved homepage slug maps to site root
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
  const { value } = useField<string>({ path: 'slug' });
  const path = buildPagePath(value);
  const href = path ? `${getSiteOrigin()}${path === '/' ? '' : path}` : null;
  // Root should be origin only (no trailing path), path `/` → `https://site.com`
  const displayHref = path === '/' ? getSiteOrigin() : href;

  return (
    <div style={{ marginTop: '0.35rem' }}>
      <div
        className="field-description"
        style={{ color: 'var(--theme-elevation-800)', fontSize: '0.75rem', lineHeight: 1.4 }}
      >
        URL-friendly identifier. Auto-generated from title if left blank.
      </div>

      {displayHref ? (
        <a
          href={path === '/' ? `${getSiteOrigin()}/` : displayHref}
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

      {value && value !== 'home' ? (
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
