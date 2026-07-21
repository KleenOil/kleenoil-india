import { describe, expect, it } from 'vitest';

import { buildSecurityHeaders } from '@/lib/security/headers';

describe('security headers', () => {
  it('includes HSTS in production', () => {
    const headers = buildSecurityHeaders({
      isProduction: true,
      siteUrl: 'https://example.com',
      storageProvider: 'local',
      turnstileEnabled: false,
      gaEnabled: false,
    });

    expect(headers['Strict-Transport-Security']).toContain('max-age=');
    expect(headers['X-Frame-Options']).toBe('DENY');
    expect(headers['Content-Security-Policy']).toContain("default-src 'self'");
  });

  it('omits HSTS in development', () => {
    const headers = buildSecurityHeaders({
      isProduction: false,
      siteUrl: 'http://localhost:3000',
      storageProvider: 'local',
      turnstileEnabled: true,
      gaEnabled: false,
    });

    expect(headers['Strict-Transport-Security']).toBeUndefined();
    expect(headers['Content-Security-Policy']).toContain('challenges.cloudflare.com');
  });
});
