type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
};

const store = new Map<string, RateLimitEntry>();

/**
 * In-memory sliding-window rate limiter.
 * Suitable for single-instance VPS deployments.
 * For serverless/multi-instance, swap to Redis / Upstash in a future phase.
 */
export function checkRateLimit(
  key: string,
  options: { max: number; windowMs: number },
): RateLimitResult {
  const now = Date.now();
  const existing = store.get(key);

  if (!existing || now >= existing.resetAt) {
    const resetAt = now + options.windowMs;
    store.set(key, { count: 1, resetAt });
    return {
      success: true,
      limit: options.max,
      remaining: options.max - 1,
      resetAt,
    };
  }

  if (existing.count >= options.max) {
    return {
      success: false,
      limit: options.max,
      remaining: 0,
      resetAt: existing.resetAt,
    };
  }

  existing.count += 1;
  store.set(key, existing);

  return {
    success: true,
    limit: options.max,
    remaining: options.max - existing.count,
    resetAt: existing.resetAt,
  };
}

/** Extract client IP from request headers (supports reverse proxies). */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() ?? 'unknown';
  }

  return headers.get('x-real-ip') ?? 'unknown';
}

/** Reset store — for tests only. */
export function resetRateLimitStore(): void {
  store.clear();
}
