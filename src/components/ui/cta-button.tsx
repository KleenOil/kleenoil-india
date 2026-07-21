import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

import { cn } from '@/lib/utils';

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  appearance?: 'primary' | 'secondary' | 'ghost';
  openInNewTab?: boolean;
  className?: string;
  showIcon?: boolean;
  onClick?: () => void;
};

export function CtaButton({
  href,
  children,
  appearance = 'primary',
  openInNewTab = false,
  className,
  showIcon = true,
  onClick,
}: CtaButtonProps) {
  const Icon = appearance === 'secondary' ? ArrowRight : ArrowUpRight;

  return (
    <Link
      href={href}
      target={openInNewTab ? '_blank' : undefined}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
      onClick={onClick}
      className={cn(
        'group inline-flex items-center justify-center gap-2.5 rounded-[10px] border-2 px-8 py-[18px] font-heading text-base font-bold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40',
        appearance === 'primary' &&
          'border-brand-primary bg-brand-primary text-white shadow-[0_8px_24px_#00663344] hover:bg-transparent hover:text-brand-primary hover:shadow-none',
        appearance === 'secondary' &&
          'border-brand-primary bg-transparent text-brand-primary hover:bg-brand-primary hover:text-white hover:shadow-[0_8px_24px_#00663344]',
        appearance === 'ghost' &&
          'border-transparent px-0 py-3 text-sm font-medium text-brand-primary hover:opacity-80',
        className,
      )}
    >
      {children}
      {showIcon ? (
        <Icon
          className={cn(
            'size-4 transition-transform duration-300 ease-out',
            appearance === 'secondary'
              ? 'group-hover:translate-x-1'
              : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5',
          )}
          aria-hidden
        />
      ) : null}
    </Link>
  );
}
