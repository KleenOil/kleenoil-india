import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';

import { cn } from '@/lib/utils';

type CustomEngineeringCardProps = {
  href?: string;
  className?: string;
};

export function CustomEngineeringCard({
  href = '/contact',
  className,
}: CustomEngineeringCardProps) {
  return (
    <Link
      href={href}
      data-reveal-item
      className={cn(
        'group surface-card relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-2xl border-2 border-brand-dim bg-surface-elevated/60 p-8 sm:min-h-[520px] sm:p-9',
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 size-[500px] rounded-full opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(0,102,51,0.2) 0%, rgba(0,102,51,0) 60%)',
        }}
      />

      <div className="relative flex flex-col gap-4">
        <div className="inline-flex items-center gap-2">
          <Sparkles className="size-3.5 text-brand-primary" aria-hidden />
          <span className="font-mono text-[11px] font-medium tracking-[1.4px] text-brand-primary uppercase">
            06 / Bespoke
          </span>
        </div>
        <h3 className="font-heading text-2xl font-bold leading-tight tracking-tight text-text-primary md:text-3xl lg:text-4xl">
          Custom Engineering Solutions
        </h3>
        <p className="text-sm leading-relaxed text-text-secondary">
          Specialised filtration architectures designed around your fluid chemistry, operating
          envelope, and production cycle.
        </p>
      </div>

      <div className="relative flex items-center justify-between border-t border-border-subtle pt-6">
        <span className="font-heading text-sm font-medium text-brand-primary">
          Speak with an engineer
        </span>
        <ArrowUpRight
          className="size-4 text-brand-primary transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
          aria-hidden
        />
      </div>
    </Link>
  );
}
