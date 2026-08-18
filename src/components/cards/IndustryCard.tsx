import Image from 'next/image';

import { ParallaxMedia } from '@/components/motion/ParallaxMedia';
import { MaybeLink } from '@/components/ui/maybe-link';
import { cn } from '@/lib/utils';

export type IndustryCardData = {
  tag: string;
  title: string;
  description: string;
  href?: string | null;
  imageUrl?: string | null;
  imageAlt?: string;
};

type IndustryCardProps = {
  industry: IndustryCardData;
  className?: string;
};

export function IndustryCard({ industry, className }: IndustryCardProps) {
  return (
    <MaybeLink
      href={industry.href}
      data-reveal-item
      className={cn(
        'group surface-card relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-2xl border-2 border-border-subtle bg-surface-elevated/40 p-8 sm:min-h-[520px] sm:p-9',
        className,
      )}
    >
      {industry.imageUrl ? (
        <ParallaxMedia enabled strength={0.18} className="absolute inset-0">
          <Image
            src={industry.imageUrl}
            alt={industry.imageAlt || industry.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </ParallaxMedia>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-soft via-surface to-brand-dim" />
      )}

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"
      />

      <div className="relative flex flex-col gap-2.5">
        <p className="font-mono text-[11px] font-medium tracking-[1.4px] text-brand-primary uppercase">
          {industry.tag}
        </p>
        <h3 className="font-heading text-3xl font-bold leading-tight tracking-tight text-text-primary">
          {industry.title}
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-text-secondary">
          {industry.description}
        </p>
      </div>
    </MaybeLink>
  );
}
