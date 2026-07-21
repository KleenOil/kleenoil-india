import type { ComponentPropsWithoutRef } from 'react';
import { Clock3, ShieldCheck, Users, type LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

type TrustBadge = {
  label: string;
  icon?: LucideIcon;
};

const defaultIcons = [ShieldCheck, Clock3, Users];

type TrustBadgeRowProps = {
  badges: TrustBadge[];
  className?: string;
  stacked?: boolean;
} & ComponentPropsWithoutRef<'div'>;

export function TrustBadgeRow({
  badges,
  className,
  stacked = false,
  ...props
}: TrustBadgeRowProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-8',
        stacked && 'flex-col gap-3 sm:flex-row sm:gap-8',
        className,
      )}
      {...props}
    >
      {badges.map((badge, index) => {
        const Icon = badge.icon ?? defaultIcons[index % defaultIcons.length];

        return (
          <div key={badge.label} className="inline-flex items-center gap-2.5">
            <Icon className="size-4 text-brand-primary" aria-hidden />
            <span className="font-mono text-[11px] font-bold tracking-[1.2px] text-text-secondary uppercase">
              {badge.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
