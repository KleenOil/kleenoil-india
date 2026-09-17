import Image from 'next/image';

import { HeroOilSvg } from '@/components/services/HeroOilSvg';
import { HeadingLines } from '@/components/sustainability/HeadingLines';
import { CtaButton } from '@/components/ui/cta-button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { blockHasCmsData, cmsList, cmsText } from '@/lib/cms/block-content';
import { getMediaAlt, getMediaUrl, resolveCtaList, type CmsLink } from '@/lib/cms/links';
import { DEFAULT_SERVICES_HERO } from '@/lib/cms/services';
import type { Media } from '@/payload-types';

type CardItem = {
  n?: string | null;
  kicker?: string | null;
  title?: string | null;
  body?: string | null;
};

type CtaItem = { link?: CmsLink | null };

export type ServicesHeroBlockData = {
  blockType: 'services-hero';
  eyebrow?: string | null;
  heading?: string | null;
  lead?: string | null;
  note?: string | null;
  ctas?: CtaItem[] | null;
  image?: number | Media | null;
  cards?: CardItem[] | null;
};

export function ServicesHeroBlock({ block }: { block?: ServicesHeroBlockData | null }) {
  const defaults = DEFAULT_SERVICES_HERO;
  const hasCms = blockHasCmsData(block);
  const eyebrow = cmsText(block?.eyebrow, defaults.eyebrow, hasCms);
  const heading = cmsText(block?.heading, defaults.heading, hasCms);
  const lead = cmsText(block?.lead, defaults.lead, hasCms);
  const note = cmsText(block?.note, defaults.note, hasCms);
  const ctas = resolveCtaList(block?.ctas, hasCms ? [] : [defaults.cta]);
  const cards = cmsList(
    block?.cards,
    defaults.cards,
    hasCms,
    (card): card is CardItem & { n: string; title: string; body: string } =>
      Boolean(card.n && card.title && card.body),
  );
  const imageUrl = cmsText(getMediaUrl(block?.image), defaults.imageUrl, hasCms);
  const imageAlt = getMediaAlt(block?.image, heading || (hasCms ? '' : defaults.imageAlt));

  return (
    <section className="relative isolate min-h-[640px] overflow-hidden bg-brand-deep lg:min-h-[880px]">
      {imageUrl ? (
        <Image src={imageUrl} alt={imageAlt} fill priority className="object-cover" sizes="100vw" />
      ) : null}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, #003319F5 0%, #003319CC 38%, #00331966 72%, #00331922 100%)',
        }}
      />
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

      <HeroOilSvg className="pointer-events-none absolute right-[8%] top-24 hidden size-[220px] text-brand-soft/80 lg:block" />

      <div className="relative mx-auto flex min-h-[640px] w-full max-w-[1440px] flex-col justify-end lg:min-h-[880px]">
        <div className="flex flex-col gap-10 px-6 pb-12 pt-32 lg:px-[100px] lg:pb-12 lg:pt-20">
          <div className="flex max-w-[720px] flex-col gap-6">
            {eyebrow ? (
              <div data-reveal-part>
                <Eyebrow className="border-white/10 bg-brand-deep/40 text-brand-soft">
                  {eyebrow}
                </Eyebrow>
              </div>
            ) : null}
            {heading ? (
              <h1 className="font-heading text-4xl font-bold leading-[0.98] tracking-[-0.05em] text-white md:text-5xl lg:text-[56px]">
                <HeadingLines text={heading} className="block" />
              </h1>
            ) : null}
            {lead ? (
              <p
                data-reveal-part
                className="max-w-[560px] text-base leading-relaxed text-brand-soft/80 md:text-[17px]"
              >
                {lead}
              </p>
            ) : null}
            {ctas.length ? (
              <div data-reveal-part className="flex flex-wrap items-center gap-3 pt-1">
                {ctas.map((cta) => (
                  <CtaButton
                    key={cta.label}
                    href={cta.href}
                    appearance={cta.appearance}
                    openInNewTab={cta.openInNewTab}
                    className="hover:border-white hover:bg-transparent hover:text-white"
                  >
                    {cta.label}
                  </CtaButton>
                ))}
              </div>
            ) : null}
            {note ? (
              <p data-reveal-part className="text-[13px] font-medium text-white/50">
                {note}
              </p>
            ) : null}
          </div>

          {cards.length ? (
            <div className="grid gap-5 md:grid-cols-3">
              {cards.map((card) => (
                <article
                  key={card.title}
                  data-reveal-item
                  className="flex flex-col gap-3 rounded-2xl border border-white/30 bg-surface-elevated/90 px-7 py-6 backdrop-blur-[2px]"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[13px] font-bold tracking-[1.4px] text-brand-primary">
                      {card.n}
                    </p>
                    {card.kicker ? (
                      <p className="font-mono text-[11px] font-bold tracking-[1.4px] text-text-tertiary uppercase">
                        {card.kicker}
                      </p>
                    ) : null}
                  </div>
                  <h2 className="font-heading text-[22px] font-bold tracking-[-0.03em] text-text-primary">
                    {card.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-text-secondary">{card.body}</p>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
