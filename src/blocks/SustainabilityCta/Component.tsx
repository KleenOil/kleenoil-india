import { CtaWanderBlob } from '@/components/sustainability/CtaWanderBlob';
import { HeadingLines } from '@/components/sustainability/HeadingLines';
import { CtaButton } from '@/components/ui/cta-button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { resolveCtaList, type CmsLink } from '@/lib/cms/links';
import { DEFAULT_SUSTAINABILITY_CTA } from '@/lib/cms/sustainability';

type CtaItem = { link?: CmsLink | null };

export type SustainabilityCtaBlockData = {
  blockType: 'sustainability-cta';
  eyebrow?: string | null;
  heading?: string | null;
  subtext?: string | null;
  ctas?: CtaItem[] | null;
};

export function SustainabilityCtaBlock({ block }: { block?: SustainabilityCtaBlockData | null }) {
  const defaults = DEFAULT_SUSTAINABILITY_CTA;
  const eyebrow = block?.eyebrow || defaults.eyebrow;
  const heading = block?.heading || defaults.heading;
  const subtext = block?.subtext || defaults.subtext;
  const ctas = resolveCtaList(block?.ctas, [defaults.cta]);

  return (
    <section className="relative overflow-hidden bg-background">
      <CtaWanderBlob />

      <div className="relative mx-auto flex min-h-[360px] w-full max-w-[1440px] flex-col justify-center px-6 py-16 lg:min-h-[440px] lg:px-[100px] lg:py-20">
        <div data-reveal-panel className="flex max-w-[720px] flex-col items-start gap-6">
          <div data-reveal-part>
            <Eyebrow className="border-brand-dim bg-brand-soft/80 text-brand-primary">
              {eyebrow}
            </Eyebrow>
          </div>
          <h2 className="font-heading text-[1.75rem] font-bold leading-[1.05] tracking-[-0.04em] text-text-primary md:text-4xl lg:text-[44px]">
            <HeadingLines text={heading} className="block" />
          </h2>
          <p
            data-reveal-part
            className="max-w-[520px] text-[15px] leading-relaxed text-text-secondary"
          >
            {subtext}
          </p>
          <div data-reveal-part>
            {ctas.map((cta) => (
              <CtaButton
                key={cta.label}
                href={cta.href}
                appearance={cta.appearance}
                openInNewTab={cta.openInNewTab}
              >
                {cta.label}
              </CtaButton>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
