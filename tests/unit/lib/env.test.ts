import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { getClientEnv, getServerEnv, resetEnvCache, validateEnv } from '@/lib/env';

const baseEnv = {
  NODE_ENV: 'test',
  NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
  DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/industrial_platform',
  PAYLOAD_SECRET: 'test-secret-key-minimum-32-characters-long',
  STORAGE_PROVIDER: 'local',
  EMAIL_PROVIDER: 'resend',
};

describe('env validation', () => {
  beforeEach(() => {
    resetEnvCache();
    vi.stubEnv('NODE_ENV', baseEnv.NODE_ENV);
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', baseEnv.NEXT_PUBLIC_SITE_URL);
    vi.stubEnv('DATABASE_URL', baseEnv.DATABASE_URL);
    vi.stubEnv('PAYLOAD_SECRET', baseEnv.PAYLOAD_SECRET);
    vi.stubEnv('STORAGE_PROVIDER', baseEnv.STORAGE_PROVIDER);
    vi.stubEnv('EMAIL_PROVIDER', baseEnv.EMAIL_PROVIDER);
  });

  afterEach(() => {
    resetEnvCache();
    vi.unstubAllEnvs();
  });

  it('validates a complete development environment', () => {
    expect(() => validateEnv()).not.toThrow();

    const server = getServerEnv();
    const client = getClientEnv();

    expect(server.PAYLOAD_SECRET).toBe(baseEnv.PAYLOAD_SECRET);
    expect(client.NEXT_PUBLIC_SITE_URL).toBe(baseEnv.NEXT_PUBLIC_SITE_URL);
  });

  it('rejects a short PAYLOAD_SECRET', () => {
    vi.stubEnv('PAYLOAD_SECRET', 'too-short');

    expect(() => getServerEnv()).toThrow(/PAYLOAD_SECRET/);
  });

  it('rejects an invalid NEXT_PUBLIC_SITE_URL', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'not-a-url');

    expect(() => getClientEnv()).toThrow(/NEXT_PUBLIC_SITE_URL/);
  });
});
