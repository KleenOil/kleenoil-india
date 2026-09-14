import Image from 'next/image';

import { CtaButton } from '@/components/ui/cta-button';
import { blockHasCmsData, cmsList, cmsText } from '@/lib/cms/block-content';
import { DEFAULT_CS_HERO } from '@/lib/cms/defaults';
import { getMediaAlt, getMediaUrl, resolveLink, type CmsLink } from '@/lib/cms/links';
import type { Media } from '@/payload-types';

type StatItem = {
  value?: string | null;
  label?: string | null;
};

export type CsHeroBlockData = {
  blockType: 'cs-hero';
  eyebrow?: string | null;
  heading?: string | null;
  subheadline?: string | null;
  watermark?: string | null;
  image?: number | Media | null;
  cta?: CmsLink | null;
  stats?: StatItem[] | null;
};

type CsHeroBlockProps = {
  block?: CsHeroBlockData | null;
};

export function CsHeroBlock({ block }: CsHeroBlockProps) {
  const hasCms = blockHasCmsData(block);
  const eyebrow = cmsText(block?.eyebrow, DEFAULT_CS_HERO.eyebrow, hasCms);
  const heading = cmsText(block?.heading, DEFAULT_CS_HERO.heading, hasCms);
  const subheadline = cmsText(block?.subheadline, DEFAULT_CS_HERO.subheadline, hasCms);
  const watermark = cmsText(block?.watermark, DEFAULT_CS_HERO.watermark, hasCms);
  const cta = hasCms ? resolveLink(block?.cta) : (resolveLink(block?.cta) ?? DEFAULT_CS_HERO.cta);
  const imageUrl = cmsText(getMediaUrl(block?.image) ?? '', DEFAULT_CS_HERO.imageUrl, hasCms);
  const imageAlt = getMediaAlt(block?.image, heading);

  const stats = cmsList(block?.stats, DEFAULT_CS_HERO.stats, hasCms, (stat) =>
    Boolean(stat.value && stat.label),
  );

  return (
    <section id="cs-banner" className="relative isolate overflow-hidden bg-brand-deep">
      <div className="relative flex min-h-[520px] flex-col justify-end lg:min-h-[620px]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : null}

        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, #003319F2 0%, #00331999 52%, #00331933 100%)',
          }}
        />

        {watermark ? (
          <p
            aria-hidden
            className="pointer-events-none absolute right-6 top-10 font-heading text-[120px] font-bold leading-none tracking-[-0.06em] text-white/10 lg:right-[100px] lg:text-[180px]"
          >
            {watermark}
          </p>
        ) : null}

        <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-8 pt-24 lg:px-[100px] lg:pb-10 lg:pt-28">
          <div className="max-w-[680px]">
            {eyebrow ? (
              <p className="font-mono text-[12px] font-bold tracking-[2px] text-brand-soft uppercase">
                {eyebrow}
              </p>
            ) : null}
            {heading ? (
              <h1 className="mt-4 font-heading text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-white md:text-5xl lg:text-[52px]">
                {heading.split('\n').map((line, index) => (
                  <span key={`${line}-${index}`} className="block">
                    {line}
                  </span>
                ))}
              </h1>
            ) : null}
            {subheadline ? (
              <p className="mt-4 max-w-xl text-base font-medium leading-relaxed text-brand-soft md:text-lg">
                {subheadline}
              </p>
            ) : null}
            {cta ? (
              <div className="mt-8">
                <CtaButton
                  href={cta.href}
                  appearance={cta.appearance}
                  openInNewTab={cta.openInNewTab}
                  className="hover:border-white hover:bg-transparent hover:text-white"
                >
                  {cta.label}
                </CtaButton>
              </div>
            ) : null}
          </div>
        </div>

        {stats.length ? (
          <div className="relative bg-[#003319]/90">
            <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center gap-8 px-6 py-8 lg:gap-0 lg:px-[100px]">
              {stats.map((stat, index) => (
                <div key={`${stat.value}-${stat.label}`} className="flex items-center">
                  {index > 0 ? (
                    <span className="mx-8 hidden h-12 w-px bg-white/20 lg:block" aria-hidden />
                  ) : null}
                  <div className="flex min-w-[110px] flex-col gap-1">
                    <p className="font-heading text-3xl font-bold tracking-tight text-white lg:text-[40px]">
                      {stat.value}
                    </p>
                    <p className="font-mono text-[11px] font-bold tracking-[1.4px] text-brand-soft uppercase">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
