import { CtaButton } from '@/components/ui/cta-button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { blockHasCmsData, cmsText } from '@/lib/cms/block-content';
import { DEFAULT_CS_CTA } from '@/lib/cms/defaults';
import { resolveCtaList, type CmsLink } from '@/lib/cms/links';

type CtaLinkItem = {
  link?: CmsLink | null;
};

export type CsCtaBlockData = {
  blockType: 'cs-cta';
  eyebrow?: string | null;
  heading?: string | null;
  subtext?: string | null;
  ctas?: CtaLinkItem[] | null;
};

type CsCtaBlockProps = {
  block?: CsCtaBlockData | null;
};

export function CsCtaBlock({ block }: CsCtaBlockProps) {
  const hasCms = blockHasCmsData(block);
  const eyebrow = cmsText(block?.eyebrow, DEFAULT_CS_CTA.eyebrow, hasCms);
  const heading = cmsText(block?.heading, DEFAULT_CS_CTA.heading, hasCms);
  const subtext = cmsText(block?.subtext, DEFAULT_CS_CTA.subtext, hasCms);
  const ctas = resolveCtaList(block?.ctas, hasCms ? [] : DEFAULT_CS_CTA.ctas);

  return (
    <section id="cs-cta" className="bg-brand-soft">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start justify-between gap-10 px-6 py-16 lg:flex-row lg:items-center lg:px-[100px] lg:py-20">
        <div className="max-w-[872px]">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          {heading ? (
            <h2 className="mt-6 font-heading text-3xl font-bold leading-[1.05] tracking-[-0.04em] text-text-primary md:text-4xl lg:text-[44px]">
              {heading.split('\n').map((line, index) => (
                <span key={`${line}-${index}`} className="block">
                  {line}
                </span>
              ))}
            </h2>
          ) : null}
          {subtext ? (
            <p className="mt-5 max-w-[560px] text-base leading-relaxed text-text-secondary">
              {subtext}
            </p>
          ) : null}
        </div>

        <div className="flex w-full max-w-[320px] flex-col gap-3.5">
          {ctas.map((cta, index) => (
            <CtaButton
              key={`${cta.label}-${index}`}
              href={cta.href}
              appearance={cta.appearance}
              openInNewTab={cta.openInNewTab}
              className="w-full"
            >
              {cta.label}
            </CtaButton>
          ))}
        </div>
      </div>
    </section>
  );
}
