import Link from 'next/link';
import type { MouseEventHandler } from 'react';

import { cn } from '@/lib/utils';

export function hasHref(value?: string | null): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

type MaybeLinkProps = {
  href?: string | null;
  openInNewTab?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLDivElement>;
  tabIndex?: number;
  'data-reveal-item'?: string | boolean;
  'data-reveal-part'?: string | boolean;
};

export function MaybeLink({
  href,
  openInNewTab = false,
  children,
  className,
  onClick,
  tabIndex,
  ...rest
}: MaybeLinkProps) {
  const destination = href?.trim() ?? '';

  if (destination) {
    return (
      <Link
        href={destination}
        className={className}
        onClick={onClick}
        tabIndex={tabIndex}
        target={openInNewTab ? '_blank' : undefined}
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  return (
    <div
      className={cn('cursor-default', className)}
      onClick={onClick}
      tabIndex={tabIndex}
      {...rest}
    >
      {children}
    </div>
  );
}
