import { afterEach, describe, expect, it } from 'vitest';

import { checkRateLimit, resetRateLimitStore } from '@/lib/security/rate-limit';

describe('rate limit', () => {
  afterEach(() => {
    resetRateLimitStore();
  });

  it('allows requests within the limit', () => {
    const options = { max: 3, windowMs: 60_000 };

    expect(checkRateLimit('test-ip', options).success).toBe(true);
    expect(checkRateLimit('test-ip', options).success).toBe(true);
    expect(checkRateLimit('test-ip', options).success).toBe(true);
  });

  it('blocks requests over the limit', () => {
    const options = { max: 2, windowMs: 60_000 };

    checkRateLimit('blocked-ip', options);
    checkRateLimit('blocked-ip', options);

    const result = checkRateLimit('blocked-ip', options);
    expect(result.success).toBe(false);
    expect(result.remaining).toBe(0);
  });
});
