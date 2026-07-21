import Link from 'next/link';

import { cn } from '@/lib/utils';

type LogoProps = {
  companyName?: string;
  tagline?: string;
  className?: string;
  compact?: boolean;
};

export function Logo({
  companyName = 'KLEENOIL',
  tagline = 'INDIA — EST. 1988',
  className,
  compact = false,
}: LogoProps) {
  return (
    <Link href="/" className={cn('inline-flex items-center gap-3', className)}>
      <span className="flex size-9 items-center justify-center rounded-lg bg-brand-primary font-heading text-xl font-extrabold text-white">
        {companyName.charAt(0).toUpperCase()}
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-heading text-lg font-bold tracking-tight text-text-primary">
            {companyName}
          </span>
          {tagline ? (
            <span className="mt-1 text-[9px] tracking-[1.6px] text-text-tertiary uppercase">
              {tagline}
            </span>
          ) : null}
        </span>
      )}
    </Link>
  );
}
