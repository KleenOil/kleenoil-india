'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

import { analyticsAllowed, readConsent, type ConsentPreferences } from '@/lib/consent/cookies';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type AnalyticsProps = {
  measurementId?: string | null;
};

export function Analytics({ measurementId }: AnalyticsProps) {
  const id = measurementId?.trim() || '';
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    function sync(preferences: ConsentPreferences | null) {
      setAllowed(Boolean(id) && analyticsAllowed(preferences));
    }

    sync(readConsent());

    function onConsent(event: Event) {
      const detail = (event as CustomEvent<ConsentPreferences>).detail;
      sync(detail ?? readConsent());
    }

    window.addEventListener('kleenoil:consent', onConsent);
    return () => window.removeEventListener('kleenoil:consent', onConsent);
  }, [id]);

  if (!id || !allowed) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`}
        strategy="afterInteractive"
      />
      <Script id="kleenoil-ga" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'granted'
          });
          gtag('config', '${id}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
