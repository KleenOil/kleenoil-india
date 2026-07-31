import { Eyebrow } from '@/components/ui/eyebrow';
import { CtaButton } from '@/components/ui/cta-button';
import { TrustBadgeRow } from '@/components/sections/TrustBadgeRow';
import { DEFAULT_PDP_CTA } from '@/lib/cms/pdp-defaults';
import { resolveCtaList, type CmsLink } from '@/lib/cms/links';

type CtaItem = {
  link?: CmsLink | null;
};

type BadgeItem = {
  label?: string | null;
};

export type PdpCtaBlockData = {
  blockType: 'pdp-cta';
  eyebrow?: string | null;
  heading?: string | null;
  subtext?: string | null;
  ctas?: CtaItem[] | null;
  trustBadges?: BadgeItem[] | null;
};

export function PdpCtaBlock({ block }: { block?: PdpCtaBlockData | null }) {
  const eyebrow = block?.eyebrow || DEFAULT_PDP_CTA.eyebrow;
  const heading = block?.heading || DEFAULT_PDP_CTA.heading;
  const subtext = block?.subtext || DEFAULT_PDP_CTA.subtext;

  const ctas = resolveCtaList(block?.ctas, DEFAULT_PDP_CTA.ctas);

  const badges =
    block?.trustBadges?.filter((badge) => badge.label)?.map((badge) => ({ label: badge.label! })) ??
    DEFAULT_PDP_CTA.trustBadges;

  return (
    <section className="relative overflow-hidden bg-brand-soft">
      <div className="relative mx-auto w-full max-w-[1440px] px-6 py-16 lg:px-[100px] lg:py-20">
        <div className="surface-panel mx-auto flex max-w-[1100px] flex-col items-center gap-8 rounded-3xl p-10 text-center lg:gap-10 lg:p-12">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="font-heading text-4xl font-bold leading-[1.02] tracking-[-0.05em] text-text-primary sm:text-5xl lg:text-[52px]">
            {heading.split('\n').map((line, index) => (
              <span key={`${line}-${index}`} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="max-w-[640px] text-[17px] font-semibold leading-relaxed text-text-secondary">
            {subtext}
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            {ctas.map((cta) => (
              <CtaButton
                key={cta.href + cta.label}
                href={cta.href}
                appearance={cta.appearance}
                openInNewTab={cta.openInNewTab}
              >
                {cta.label}
              </CtaButton>
            ))}
          </div>
          <TrustBadgeRow badges={badges} />
        </div>
      </div>
    </section>
  );
}
