import { Eyebrow } from '@/components/ui/eyebrow';
import { CtaButton } from '@/components/ui/cta-button';
import { cn } from '@/lib/utils';

type SectionCta = {
  label: string;
  href: string;
  appearance?: 'primary' | 'secondary' | 'ghost';
  openInNewTab?: boolean;
};

type SectionHeaderProps = {
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  cta?: SectionCta | null;
  className?: string;
  align?: 'split' | 'stacked' | 'center';
};

export function SectionHeader({
  eyebrow,
  heading,
  description,
  cta,
  className,
  align = 'split',
}: SectionHeaderProps) {
  if (!eyebrow && !heading && !description && !cta) {
    return null;
  }

  const isSplit = align === 'split';
  const isCenter = align === 'center';

  return (
    <div
      data-reveal-header
      className={cn(
        'flex flex-col gap-6',
        isSplit && 'lg:flex-row lg:items-end lg:justify-between lg:gap-20',
        isCenter && 'items-center text-center',
        className,
      )}
    >
      <div
        className={cn(
          'flex flex-col gap-6',
          isSplit && 'lg:max-w-[720px]',
          isCenter && 'max-w-[1100px] items-center',
        )}
      >
        {eyebrow ? (
          <div data-reveal-part>
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
        ) : null}
        {heading ? (
          <h2
            className={cn(
              'font-heading text-3xl font-bold leading-[1.05] tracking-[-0.04em] text-text-primary sm:text-4xl lg:text-[48px]',
              isCenter && 'leading-none tracking-[-0.05em] lg:text-[48px]',
            )}
          >
            {heading.split('\n').map((line, index) => (
              <span key={`${line}-${index}`} data-reveal-part className="block">
                {line}
              </span>
            ))}
          </h2>
        ) : null}
        {isCenter && description ? (
          <p
            data-reveal-part
            className="max-w-[680px] text-[17px] leading-relaxed text-text-secondary"
          >
            {description}
          </p>
        ) : null}
      </div>

      {!isCenter && (description || cta) && (
        <div className={cn('flex flex-col gap-6', isSplit && 'lg:max-w-[420px] lg:pb-4')}>
          {description ? (
            <p data-reveal-part className="text-[15px] leading-relaxed text-text-secondary">
              {description}
            </p>
          ) : null}
          {cta ? (
            <div data-reveal-part>
              <CtaButton
                href={cta.href}
                appearance={cta.appearance ?? 'ghost'}
                openInNewTab={cta.openInNewTab}
                className="self-start"
              >
                {cta.label}
              </CtaButton>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
