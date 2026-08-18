import { Eyebrow } from '@/components/ui/eyebrow';
import { CtaButton } from '@/components/ui/cta-button';
import { TrustBadgeRow } from '@/components/sections/TrustBadgeRow';
import { DEFAULT_CTA } from '@/lib/cms/defaults';
import { resolveCtaList } from '@/lib/cms/links';

type CtaLinkItem = {
  link?: {
    type?: 'page' | 'custom' | null;
    label?: string | null;
    url?: string | null;
    openInNewTab?: boolean | null;
    page?: number | { slug?: string | null } | null;
    appearance?: 'primary' | 'secondary' | 'ghost' | null;
  } | null;
};

type TrustBadgeItem = {
  label?: string | null;
};

export type CtaBlockData = {
  blockType: 'cta';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  subtext?: string | null;
  ctas?: CtaLinkItem[] | null;
  trustBadges?: TrustBadgeItem[] | null;
};

type CtaBlockProps = {
  block?: CtaBlockData | null;
};

export function CtaBlock({ block }: CtaBlockProps) {
  const eyebrow = block?.eyebrow || DEFAULT_CTA.eyebrow;
  const heading = block?.heading || DEFAULT_CTA.heading;
  // Prefer subtext; fall back to section description if subtext was left empty.
  const subtext =
    (typeof block?.subtext === 'string' && block.subtext.trim()) ||
    (typeof block?.description === 'string' && block.description.trim()) ||
    DEFAULT_CTA.subtext;

  const ctas = resolveCtaList(block?.ctas, DEFAULT_CTA.ctas);

  const badges =
    block?.trustBadges
      ?.filter((badge) => badge.label)
      ?.map((badge) => ({
        label: badge.label!,
      })) ?? DEFAULT_CTA.trustBadges;

  return (
    <section className="relative overflow-hidden bg-brand-soft">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 size-[1200px] -translate-x-1/2 rounded-full opacity-80"
        style={{
          background: 'radial-gradient(circle, rgba(0,102,51,0.2) 0%, rgba(0,102,51,0) 50%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 py-16 lg:px-[100px] lg:py-24">
        <div
          data-reveal-panel
          className="surface-panel mx-auto flex max-w-[1100px] flex-col items-center gap-10 rounded-3xl p-10 text-center lg:gap-12 lg:p-20"
        >
          <div data-reveal-part>
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>

          <h2 className="font-heading text-3xl font-bold leading-[0.98] tracking-[-0.06em] text-text-primary md:text-4xl lg:text-[80px]">
            {heading.split('\n').map((line, index) => (
              <span key={`${line}-${index}`} data-reveal-part className="block">
                {line}
              </span>
            ))}
          </h2>

          <p
            data-reveal-part
            className="max-w-[640px] text-base font-semibold leading-relaxed text-text-secondary md:text-lg"
          >
            {subtext}
          </p>

          <div
            data-reveal-part
            className="flex w-full max-w-md flex-col gap-3.5 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center"
          >
            {ctas.map((cta, index) => (
              <CtaButton
                key={`${cta.label}-${index}`}
                href={cta.href}
                appearance={cta.appearance}
                openInNewTab={cta.openInNewTab}
                className="w-full sm:w-auto"
              >
                {cta.label}
              </CtaButton>
            ))}
          </div>

          <TrustBadgeRow
            badges={badges}
            className="justify-center pt-4"
            stacked
            data-reveal-badges
          />
        </div>
      </div>
    </section>
  );
}
