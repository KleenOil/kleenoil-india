import { HeadingLines } from '@/components/sustainability/HeadingLines';
import { CtaButton } from '@/components/ui/cta-button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { blockHasCmsData, cmsText } from '@/lib/cms/block-content';
import { resolveCtaList, type CmsLink } from '@/lib/cms/links';
import { DEFAULT_SERVICES_CTA } from '@/lib/cms/services';
import { cn } from '@/lib/utils';

type CtaItem = { link?: CmsLink | null };

export type ServicesCtaBlockData = {
  blockType: 'services-cta';
  eyebrow?: string | null;
  heading?: string | null;
  subtext?: string | null;
  ctas?: CtaItem[] | null;
};

export function ServicesCtaBlock({ block }: { block?: ServicesCtaBlockData | null }) {
  const defaults = DEFAULT_SERVICES_CTA;
  const hasCms = blockHasCmsData(block);
  const eyebrow = cmsText(block?.eyebrow, defaults.eyebrow, hasCms);
  const heading = cmsText(block?.heading, defaults.heading, hasCms);
  const subtext = cmsText(block?.subtext, defaults.subtext, hasCms);
  const ctas = resolveCtaList(block?.ctas, hasCms ? [] : defaults.ctas);

  return (
    <section className="relative overflow-hidden bg-brand-deep">
      <svg
        aria-hidden
        viewBox="0 0 520 360"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[360px] w-[520px] -translate-x-1/2 -translate-y-1/2"
      >
        <ellipse cx="260" cy="180" rx="260" ry="180" fill="#006633" fillOpacity="0.4" />
      </svg>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/4 w-px bg-white/8"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-white/8"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-3/4 w-px bg-white/8"
      />

      <div className="relative mx-auto flex min-h-[440px] w-full max-w-[1440px] flex-col items-center justify-center px-6 py-20 text-center lg:px-[100px]">
        <div data-reveal-panel className="flex w-full max-w-[900px] flex-col items-center gap-6">
          {eyebrow ? (
            <div data-reveal-part>
              <Eyebrow className="border-brand-dim bg-brand-soft/60 text-brand-primary backdrop-blur-[12px]">
                {eyebrow}
              </Eyebrow>
            </div>
          ) : null}
          {heading ? (
            <h2 className="w-full font-heading text-[1.75rem] font-bold leading-[1.08] tracking-[-0.041em] text-white md:text-4xl lg:text-[44px]">
              <HeadingLines text={heading} className="block" />
            </h2>
          ) : null}
          {subtext ? (
            <p
              data-reveal-part
              className="w-full text-base leading-[1.5] text-brand-soft/80 md:text-[17px]"
            >
              {subtext}
            </p>
          ) : null}
          {ctas.length ? (
            <div data-reveal-part className="flex flex-wrap items-center justify-center gap-4">
              {ctas.map((cta) => (
                <CtaButton
                  key={cta.label}
                  href={cta.href}
                  appearance={cta.appearance}
                  openInNewTab={cta.openInNewTab}
                  className={cn(
                    cta.appearance === 'primary' &&
                      'border-brand-primary hover:border-white hover:bg-transparent hover:text-white',
                    cta.appearance === 'secondary' &&
                      'border-border-strong bg-surface-elevated/60 text-brand-primary shadow-[0_4px_16px_#00663310] backdrop-blur-[16px] hover:bg-brand-primary hover:text-white hover:shadow-[0_8px_24px_#00663344]',
                  )}
                >
                  {cta.label}
                </CtaButton>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
