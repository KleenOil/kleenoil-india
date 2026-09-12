import Image from 'next/image';

import { HeadingLines } from '@/components/sustainability/HeadingLines';
import { CtaButton } from '@/components/ui/cta-button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { getMediaAlt, getMediaUrl, resolveCtaList, type CmsLink } from '@/lib/cms/links';
import { DEFAULT_SUSTAINABILITY_HERO } from '@/lib/cms/sustainability';
import type { Media } from '@/payload-types';

type PillItem = { n?: string | null; label?: string | null };
type CtaItem = { link?: CmsLink | null };

export type SustainabilityHeroBlockData = {
  blockType: 'sustainability-hero';
  eyebrow?: string | null;
  heading?: string | null;
  lead?: string | null;
  body?: string | null;
  ctas?: CtaItem[] | null;
  image?: number | Media | null;
  pills?: PillItem[] | null;
};

export function SustainabilityHeroBlock({ block }: { block?: SustainabilityHeroBlockData | null }) {
  const defaults = DEFAULT_SUSTAINABILITY_HERO;
  const eyebrow = block?.eyebrow || defaults.eyebrow;
  const heading = block?.heading || defaults.heading;
  const lead = block?.lead || defaults.lead;
  const body = block?.body || defaults.body;
  const ctas = resolveCtaList(block?.ctas, [defaults.cta]);
  const pills = block?.pills?.filter((pill) => pill.n && pill.label)?.length
    ? block.pills.filter((pill) => pill.n && pill.label)
    : defaults.pills;
  const imageUrl = getMediaUrl(block?.image) || defaults.imageUrl;
  const imageAlt = getMediaAlt(block?.image, defaults.imageAlt);

  return (
    <section className="relative isolate min-h-[640px] overflow-hidden bg-brand-deep lg:min-h-[900px]">
      {imageUrl ? (
        <Image src={imageUrl} alt={imageAlt} fill priority className="object-cover" sizes="100vw" />
      ) : null}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-brand-deep/90 via-brand-deep/55 to-brand-deep/20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-[25%] w-px bg-white/8"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-[50%] w-px bg-white/8"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-[75%] w-px bg-white/8"
      />

      <div className="relative mx-auto flex min-h-[640px] w-full max-w-[1440px] flex-col justify-end lg:min-h-[900px]">
        <div className="flex max-w-[680px] flex-col gap-6 px-6 pb-16 pt-32 lg:px-[100px] lg:pb-20">
          <div data-reveal-part>
            <Eyebrow className="border-white/10 bg-brand-deep/40 text-brand-soft">
              {eyebrow}
            </Eyebrow>
          </div>
          <h1 className="font-heading text-4xl font-bold leading-[0.98] tracking-[-0.05em] text-white md:text-5xl lg:text-[64px]">
            <HeadingLines text={heading} className="block" />
          </h1>
          <p
            data-reveal-part
            className="max-w-[520px] text-lg font-semibold leading-snug text-white md:text-xl"
          >
            {lead}
          </p>
          <p data-reveal-part className="max-w-[520px] text-[15px] leading-relaxed text-white/75">
            {body}
          </p>
          <div data-reveal-part className="pt-1">
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

        <div className="grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
          {pills.map((pill) => (
            <div
              key={pill.label}
              data-reveal-item
              className="flex flex-col gap-2 bg-brand-deep px-5 py-5 lg:px-8 lg:py-6"
            >
              <p className="font-mono text-[11px] font-bold tracking-[1.4px] text-brand-soft/50">
                {pill.n}
              </p>
              <p className="font-mono text-[11px] font-bold tracking-[1.2px] text-white uppercase">
                {pill.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
