import { describe, expect, it } from 'vitest';

import { isHoneypotTriggered, sanitizeText, stripHtml } from '@/lib/security/sanitize';

describe('sanitize', () => {
  it('strips HTML tags', () => {
    expect(stripHtml('<script>alert("xss")</script>Hello')).toBe('alert("xss")Hello');
  });

  it('sanitizes and truncates text', () => {
    expect(sanitizeText('  <b>Hi</b>  ', 10)).toBe('Hi');
    expect(sanitizeText('abcdefghij', 5)).toBe('abcde');
  });

  it('detects honeypot triggers', () => {
    expect(isHoneypotTriggered('')).toBe(false);
    expect(isHoneypotTriggered('bot-filled-this')).toBe(true);
  });
});
