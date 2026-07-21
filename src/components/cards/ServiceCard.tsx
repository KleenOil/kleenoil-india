import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { cn } from '@/lib/utils';

export type ServiceCardData = {
  tag: string;
  title: string;
  description: string;
  href: string;
};

type ServiceCardProps = {
  service: ServiceCardData;
  className?: string;
};

export function ServiceCard({ service, className }: ServiceCardProps) {
  return (
    <Link
      href={service.href}
      data-reveal-item
      className={cn(
        'group surface-card flex flex-col gap-5 rounded-2xl border-2 border-border-subtle bg-surface-elevated/70',
        className,
      )}
    >
      <p className="font-mono text-[11px] font-medium tracking-[1.4px] text-brand-primary uppercase">
        {service.tag}
      </p>
      <h3 className="font-heading text-2xl font-bold leading-tight tracking-tight text-text-primary">
        {service.title}
      </h3>
      <p className="flex-1 text-sm leading-relaxed text-text-secondary">{service.description}</p>
      <div className="flex items-center justify-between border-t border-border-subtle pt-5">
        <span className="font-heading text-sm font-bold text-brand-primary">Learn more</span>
        <ArrowUpRight
          className="size-4 text-brand-primary transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
          aria-hidden
        />
      </div>
    </Link>
  );
}
