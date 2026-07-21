import { getServerEnv, isTurnstileEnabled } from '@/lib/env';

type TurnstileVerifyResponse = {
  success: boolean;
  'error-codes'?: string[];
};

/**
 * Verify a Cloudflare Turnstile token server-side.
 * Returns true when Turnstile is disabled (development without keys).
 */
export async function verifyTurnstileToken(
  token: string | undefined | null,
  remoteIp?: string,
): Promise<boolean> {
  if (!isTurnstileEnabled()) {
    return process.env.NODE_ENV !== 'production';
  }

  if (!token) {
    return false;
  }

  const { TURNSTILE_SECRET_KEY } = getServerEnv();

  const body = new URLSearchParams({
    secret: TURNSTILE_SECRET_KEY!,
    response: token,
  });

  if (remoteIp && remoteIp !== 'unknown') {
    body.append('remoteip', remoteIp);
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!response.ok) {
    return false;
  }

  const data = (await response.json()) as TurnstileVerifyResponse;
  return data.success === true;
}
