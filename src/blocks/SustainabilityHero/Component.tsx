import Image from 'next/image';

import { HeadingLines } from '@/components/sustainability/HeadingLines';
import { CtaButton } from '@/components/ui/cta-button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { blockHasCmsData, cmsList, cmsText } from '@/lib/cms/block-content';
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
  const hasCms = blockHasCmsData(block);
  const eyebrow = cmsText(block?.eyebrow, defaults.eyebrow, hasCms);
  const heading = cmsText(block?.heading, defaults.heading, hasCms);
  const lead = cmsText(block?.lead, defaults.lead, hasCms);
  const body = cmsText(block?.body, defaults.body, hasCms);
  const ctas = resolveCtaList(block?.ctas, hasCms ? [] : [defaults.cta]);
  const pills = cmsList(
    block?.pills,
    defaults.pills,
    hasCms,
    (pill): pill is PillItem & { n: string; label: string } => Boolean(pill.n && pill.label),
  );
  const imageUrl = cmsText(getMediaUrl(block?.image), defaults.imageUrl, hasCms);
  const imageAlt = getMediaAlt(block?.image, heading || (hasCms ? '' : defaults.imageAlt));

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
          {eyebrow ? (
            <div data-reveal-part>
              <Eyebrow className="border-white/10 bg-brand-deep/40 text-brand-soft">
                {eyebrow}
              </Eyebrow>
            </div>
          ) : null}
          {heading ? (
            <h1 className="font-heading text-4xl font-bold leading-[0.98] tracking-[-0.05em] text-white md:text-5xl lg:text-[64px]">
              <HeadingLines text={heading} className="block" />
            </h1>
          ) : null}
          {lead ? (
            <p
              data-reveal-part
              className="max-w-[520px] text-lg font-semibold leading-snug text-white md:text-xl"
            >
              {lead}
            </p>
          ) : null}
          {body ? (
            <p data-reveal-part className="max-w-[520px] text-[15px] leading-relaxed text-white/75">
              {body}
            </p>
          ) : null}
          {ctas.length ? (
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
          ) : null}
        </div>

        {pills.length ? (
          <div className="grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
            {pills.map((pill, index) => (
              <div
                key={`${index}-${pill.label}`}
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
        ) : null}
      </div>
    </section>
  );
}
