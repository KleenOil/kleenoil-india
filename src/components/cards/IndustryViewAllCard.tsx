import { ArrowUpRight } from 'lucide-react';

import { MaybeLink, hasHref } from '@/components/ui/maybe-link';
import { cn } from '@/lib/utils';

export type IndustryViewAllCardData = {
  tag?: string | null;
  title?: string | null;
  description?: string | null;
  ctaLabel?: string | null;
  href?: string | null;
};

type IndustryViewAllCardProps = {
  card?: IndustryViewAllCardData | null;
  className?: string;
};

const DEFAULTS = {
  tag: '06 / LIBRARY',
  title: 'View all industries',
  description:
    'Industry notes for every plant we walk into — contamination patterns, typical fluids, and the filtration setup that holds.',
  ctaLabel: 'Browse industry notes',
  href: '/industries',
};

export function IndustryViewAllCard({ card, className }: IndustryViewAllCardProps) {
  const hasContent = Boolean(
    card?.tag?.trim() || card?.title?.trim() || card?.description?.trim() || card?.ctaLabel?.trim(),
  );
  const useFallback = !hasContent;
  const tag = card?.tag?.trim() || (useFallback ? DEFAULTS.tag : '');
  const title = card?.title?.trim() || (useFallback ? DEFAULTS.title : '');
  const description = card?.description?.trim() || (useFallback ? DEFAULTS.description : '');
  const ctaLabel = card?.ctaLabel?.trim() || (useFallback ? DEFAULTS.ctaLabel : '');
  const href = card?.href?.trim() || (useFallback ? DEFAULTS.href : '');
  const linked = hasHref(href);

  return (
    <MaybeLink
      href={href}
      data-reveal-item
      className={cn(
        'group relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-2xl border-2 border-brand-primary bg-brand-deep p-8 text-white sm:min-h-[520px] sm:p-9',
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-1/2 size-[280px] -translate-y-1/2 rounded-full bg-brand-primary/35"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-1/3 w-px bg-white/10"
      />

      <div className="relative flex flex-col gap-4">
        {tag ? (
          <p className="font-mono text-[11px] font-medium tracking-[1.4px] text-brand-soft uppercase">
            {tag}
          </p>
        ) : null}
        {title ? (
          <h3 className="font-heading text-2xl font-bold leading-tight tracking-tight md:text-3xl lg:text-4xl">
            {title}
          </h3>
        ) : null}
        {description ? (
          <p className="text-sm leading-relaxed text-brand-soft/85">{description}</p>
        ) : null}
      </div>

      {ctaLabel ? (
        <div className="relative flex items-center justify-between border-t border-white/15 pt-6">
          <span className="font-heading text-sm font-medium">{ctaLabel}</span>
          {linked ? (
            <span className="flex size-10 items-center justify-center rounded-full bg-brand-primary text-white">
              <ArrowUpRight
                className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </span>
          ) : null}
        </div>
      ) : null}
    </MaybeLink>
  );
}
