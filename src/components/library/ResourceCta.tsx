import { HeadingLines } from '@/components/sustainability/HeadingLines';
import { CtaButton } from '@/components/ui/cta-button';
import { Eyebrow } from '@/components/ui/eyebrow';

type Cta = {
  label: string;
  href: string;
  appearance: 'primary' | 'secondary' | 'ghost';
  openInNewTab?: boolean;
};

export function ResourceCta({
  eyebrow,
  heading,
  ctas,
}: {
  eyebrow: string;
  heading: string;
  ctas: Cta[];
}) {
  return (
    <section className="relative overflow-hidden bg-brand-deep">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-1/2 size-[280px] -translate-y-1/2 rounded-full bg-brand-primary/35"
      />
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-6 py-16 lg:px-[100px] lg:py-[88px]">
        <Eyebrow className="border-white/20 bg-white/10 text-white">{eyebrow}</Eyebrow>
        {heading ? (
          <h2 className="max-w-[720px] font-heading text-[1.75rem] font-bold leading-[1.08] tracking-[-0.04em] text-white md:text-4xl lg:text-[44px]">
            <HeadingLines text={heading} className="block" />
          </h2>
        ) : null}
        {ctas.length ? (
          <div className="flex flex-wrap gap-3">
            {ctas.map((cta) => (
              <CtaButton
                key={cta.label}
                href={cta.href}
                appearance={cta.appearance}
                openInNewTab={cta.openInNewTab}
                className={
                  cta.appearance === 'primary'
                    ? 'hover:border-white hover:bg-transparent hover:text-white'
                    : undefined
                }
              >
                {cta.label}
              </CtaButton>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
