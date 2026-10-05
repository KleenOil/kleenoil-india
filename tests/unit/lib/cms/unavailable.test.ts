import { afterEach, describe, expect, it, vi } from 'vitest';

import { CmsUnavailableError, isCmsUnavailable, logCmsFailure } from '@/lib/cms/unavailable';

describe('cms unavailable helpers', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('recognizes Payload Postgres connection failures', () => {
    expect(isCmsUnavailable({ name: 'CmsUnavailableError' })).toBe(true);
    expect(isCmsUnavailable(new Error('cannot connect to Postgres: '))).toBe(true);
    expect(isCmsUnavailable(Object.assign(new Error('connect'), { code: 'ECONNREFUSED' }))).toBe(
      true,
    );
    expect(isCmsUnavailable(new Error('schema mismatch'))).toBe(false);
  });

  it('does not console.error when the CMS database is offline', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    logCmsFailure('getContactDetails', new CmsUnavailableError());

    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  });

  it('warns with a string for unexpected CMS failures', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    logCmsFailure('getContactDetails', new Error('schema mismatch'));

    expect(warn).toHaveBeenCalledWith('[cms] getContactDetails failed: schema mismatch');
  });
});
