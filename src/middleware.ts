import { NextResponse, type NextRequest } from 'next/server';

import { buildSecurityHeaders } from '@/lib/security/headers';
import { checkRateLimit, getClientIp } from '@/lib/security/rate-limit';

/** Paths that receive rate limiting (forms and custom public APIs — not Payload admin). */
const RATE_LIMITED_PATHS = ['/api/forms', '/api/search', '/api/revalidate'];

function shouldRateLimit(pathname: string): boolean {
  return RATE_LIMITED_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

function getRateLimitConfig(): { max: number; windowMs: number } {
  const max = Number(process.env.RATE_LIMIT_MAX ?? 10);
  const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 60_000);

  return {
    max: Number.isFinite(max) && max > 0 ? max : 10,
    windowMs: Number.isFinite(windowMs) && windowMs > 0 ? windowMs : 60_000,
  };
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProduction = process.env.NODE_ENV === 'production';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const storageProvider =
    (process.env.STORAGE_PROVIDER as 'local' | 'cloudinary' | 's3' | undefined) ?? 'local';
  const turnstileEnabled = Boolean(
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && process.env.TURNSTILE_SECRET_KEY,
  );
  const gaEnabled = Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);

  if (shouldRateLimit(pathname)) {
    const ip = getClientIp(request.headers);
    const rateLimit = checkRateLimit(`${ip}:${pathname}`, getRateLimitConfig());

    if (!rateLimit.success) {
      const retryAfterSeconds = Math.ceil((rateLimit.resetAt - Date.now()) / 1000);

      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(retryAfterSeconds),
            'X-RateLimit-Limit': String(rateLimit.limit),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(rateLimit.resetAt),
          },
        },
      );
    }
  }

  const response = NextResponse.next();

  const securityHeaders = buildSecurityHeaders({
    isProduction,
    siteUrl,
    storageProvider,
    turnstileEnabled,
    gaEnabled,
  });

  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value);
  }

  // API routes must not be cached
  if (pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
