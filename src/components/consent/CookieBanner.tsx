'use client';

import Link from 'next/link';
import { useEffect, useId, useState } from 'react';

import { CtaButton } from '@/components/ui/cta-button';
import {
  analyticsAllowed,
  DEFAULT_CONSENT,
  readConsent,
  writeConsent,
  type ConsentPreferences,
} from '@/lib/consent/cookies';
import { cn } from '@/lib/utils';

type CookieBannerProps = {
  className?: string;
};

export function CookieBanner({ className }: CookieBannerProps) {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>(DEFAULT_CONSENT);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const existing = readConsent();

    // Defer state updates so hydration does not cascade synchronously in the effect.
    const frame = window.requestAnimationFrame(() => {
      setPreferences(existing ?? DEFAULT_CONSENT);
      setOpen(!existing);
      setHydrated(true);
    });

    function onOpenSettings() {
      setOpen(true);
    }

    window.addEventListener('kleenoil:open-cookie-settings', onOpenSettings);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('kleenoil:open-cookie-settings', onOpenSettings);
    };
  }, []);

  function save(analytics: boolean) {
    const next = writeConsent({ analytics });
    setPreferences(next);
    setOpen(false);
  }

  if (!hydrated || !open) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      className={cn(
        'fixed inset-x-0 bottom-0 z-[60] border-t border-border-subtle bg-surface-elevated/95 p-4 shadow-[0_-12px_40px_#00331922] backdrop-blur-md sm:p-5',
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-8 lg:px-[100px]">
        <div className="max-w-3xl space-y-2">
          <h2 id={titleId} className="font-heading text-lg font-bold text-text-primary">
            Cookies & measurement
          </h2>
          <p className="text-sm leading-relaxed text-text-secondary">
            We use strictly necessary cookies to run this site securely. Optional analytics (Google
            Analytics) stay off unless you opt in. You can change this later. See our{' '}
            <Link
              href="/cookies"
              className="font-medium text-brand-primary underline-offset-2 hover:underline"
            >
              Cookie Policy
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy"
              className="font-medium text-brand-primary underline-offset-2 hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
          {analyticsAllowed(preferences) ? (
            <p className="text-xs text-text-secondary">
              Analytics are currently enabled on this device.
            </p>
          ) : (
            <p className="text-xs text-text-secondary">
              Current choice: necessary cookies only (no analytics).
            </p>
          )}
        </div>

        <div className="flex w-full flex-nowrap items-stretch gap-2 sm:w-auto sm:items-center sm:gap-3">
          <CtaButton
            type="button"
            appearance="secondary"
            onClick={() => save(false)}
            className="min-w-0 flex-1 whitespace-nowrap px-3 py-3 text-[13px] sm:flex-none sm:px-6 sm:py-4 sm:text-sm lg:px-8 lg:py-[18px] lg:text-base"
          >
            Necessary only
          </CtaButton>
          <CtaButton
            type="button"
            appearance="primary"
            onClick={() => save(true)}
            className="min-w-0 flex-1 whitespace-nowrap px-3 py-3 text-[13px] sm:flex-none sm:px-6 sm:py-4 sm:text-sm lg:px-8 lg:py-[18px] lg:text-base"
          >
            Accept analytics
          </CtaButton>
        </div>
      </div>
    </div>
  );
}

export function openCookieSettings() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('kleenoil:open-cookie-settings'));
  }
}
