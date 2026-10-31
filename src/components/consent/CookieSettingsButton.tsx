'use client';

import { openCookieSettings } from '@/components/consent/CookieBanner';
import { cn } from '@/lib/utils';

type CookieSettingsButtonProps = {
  className?: string;
};

export function CookieSettingsButton({ className }: CookieSettingsButtonProps) {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className={cn(
        'text-[11px] tracking-[1px] text-text-tertiary uppercase transition-colors hover:text-text-secondary',
        className,
      )}
    >
      Cookie settings
    </button>
  );
}
