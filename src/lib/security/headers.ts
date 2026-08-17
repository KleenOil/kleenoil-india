type BuildSecurityHeadersOptions = {
  isProduction: boolean;
  siteUrl: string;
  storageProvider: 'local' | 'cloudinary' | 's3';
  turnstileEnabled: boolean;
  gaEnabled: boolean;
};

/**
 * Build Content-Security-Policy and companion security headers.
 * Development uses a relaxed CSP to support Next.js tooling.
 */
export function buildSecurityHeaders(options: BuildSecurityHeadersOptions): Record<string, string> {
  const { isProduction, siteUrl, storageProvider, turnstileEnabled, gaEnabled } = options;

  const scriptSrc = [
    "'self'",
    // Payload admin (and Next.js) evaluate runtime chunks; blocking this in
    // production left /admin as a blank dark pane with a working sidebar.
    "'unsafe-eval'",
    "'unsafe-inline'",
    ...(turnstileEnabled ? ['https://challenges.cloudflare.com'] : []),
    ...(gaEnabled ? ['https://www.googletagmanager.com'] : []),
  ];

  const connectSrc = [
    "'self'",
    'https:',
    ...(turnstileEnabled ? ['https://challenges.cloudflare.com'] : []),
    ...(gaEnabled ? ['https://www.google-analytics.com', 'https://analytics.google.com'] : []),
  ];

  const imgSrc = [
    "'self'",
    'data:',
    'blob:',
    ...(storageProvider === 'cloudinary' ? ['https://res.cloudinary.com'] : []),
    ...(storageProvider === 's3' ? ['https://*.amazonaws.com'] : []),
    ...(gaEnabled ? ['https://www.google-analytics.com'] : []),
  ];

  const frameSrc = turnstileEnabled ? ['https://challenges.cloudflare.com'] : [];

  const csp = [
    `default-src 'self'`,
    `script-src ${scriptSrc.join(' ')}`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src ${imgSrc.join(' ')}`,
    `font-src 'self' data:`,
    `connect-src ${connectSrc.join(' ')}`,
    `frame-src ${frameSrc.join(' ') || "'none'"}`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`,
    ...(isProduction ? ['upgrade-insecure-requests'] : []),
  ].join('; ');

  const headers: Record<string, string> = {
    'Content-Security-Policy': csp,
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
    'X-DNS-Prefetch-Control': 'on',
  };

  if (isProduction) {
    headers['Strict-Transport-Security'] = 'max-age=63072000; includeSubDomains; preload';
  }

  // Allow same-origin API calls from the public site URL origin.
  if (siteUrl) {
    headers['Cross-Origin-Opener-Policy'] = 'same-origin';
    headers['Cross-Origin-Resource-Policy'] = 'same-site';
  }

  return headers;
}
