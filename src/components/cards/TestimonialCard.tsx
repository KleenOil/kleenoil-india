import Image from 'next/image';

import { cn } from '@/lib/utils';

export type TestimonialData = {
  quote: string;
  clientName: string;
  company?: string | null;
  position?: string | null;
  imageUrl?: string | null;
  imageAlt?: string;
};

type TestimonialCardProps = {
  testimonial: TestimonialData;
  className?: string;
};

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  const attribution = [testimonial.position, testimonial.company].filter(Boolean).join(' · ');

  return (
    <article
      data-reveal-item
      className={cn(
        'surface-card flex h-full flex-col justify-between gap-8 rounded-2xl border-2 border-border-subtle bg-surface-elevated/70',
        className,
      )}
    >
      <blockquote className="font-heading text-xl font-semibold leading-snug text-text-primary sm:text-[22px]">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <figcaption className="flex items-center gap-4">
        <div className="relative size-12 shrink-0 overflow-hidden rounded-full border border-border-subtle bg-brand-soft">
          {testimonial.imageUrl ? (
            <Image
              src={testimonial.imageUrl}
              alt={testimonial.imageAlt || testimonial.clientName}
              fill
              className="object-cover"
              sizes="48px"
            />
          ) : (
            <div className="flex h-full items-center justify-center font-heading text-sm font-bold text-brand-deep">
              {testimonial.clientName.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-0.5">
          <cite className="font-heading text-sm font-bold not-italic text-text-primary">
            {testimonial.clientName}
          </cite>
          {attribution ? <span className="text-xs text-text-secondary">{attribution}</span> : null}
        </div>
      </figcaption>
    </article>
  );
}
