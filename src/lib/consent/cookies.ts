export const CONSENT_STORAGE_KEY = 'kleenoil-consent-v1';

export type ConsentPreferences = {
  /** Always true — required for security, load balancing, and form abuse protection. */
  necessary: true;
  /** Optional measurement (e.g. Google Analytics) — off until the visitor opts in. */
  analytics: boolean;
  updatedAt: string;
};

export const DEFAULT_CONSENT: ConsentPreferences = {
  necessary: true,
  analytics: false,
  updatedAt: '',
};

export function readConsent(): ConsentPreferences | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Partial<ConsentPreferences>;
    return {
      necessary: true,
      analytics: Boolean(parsed.analytics),
      updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : '',
    };
  } catch {
    return null;
  }
}

export function writeConsent(
  preferences: Omit<ConsentPreferences, 'necessary' | 'updatedAt'>,
): ConsentPreferences {
  const next: ConsentPreferences = {
    necessary: true,
    analytics: Boolean(preferences.analytics),
    updatedAt: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('kleenoil:consent', { detail: next }));
  }

  return next;
}

export function analyticsAllowed(preferences: ConsentPreferences | null): boolean {
  return Boolean(preferences?.analytics);
}
