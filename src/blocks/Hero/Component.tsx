import Image from 'next/image';

import { ParallaxMedia } from '@/components/motion/ParallaxMedia';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { Eyebrow } from '@/components/ui/eyebrow';
import { CtaButton } from '@/components/ui/cta-button';
import { DEFAULT_HERO, DEFAULT_IMMERSIVE_HERO } from '@/lib/cms/defaults';
import { getMediaAlt, getMediaUrl, resolveCtaList } from '@/lib/cms/links';
import type { Media } from '@/payload-types';

type HeroMetaStat = {
  value?: string | null;
  label?: string | null;
};

type HeroCtaItem = {
  link?: {
    type?: 'page' | 'custom' | null;
    label?: string | null;
    url?: string | null;
    openInNewTab?: boolean | null;
    page?: number | { slug?: string | null } | null;
    appearance?: 'primary' | 'secondary' | 'ghost' | null;
  } | null;
};

export type HeroBlockData = {
  blockType: 'hero';
  variant?: 'panel' | 'immersive' | null;
  eyebrow?: string | null;
  headline?: string | null;
  subheadline?: string | null;
  image?: number | Media | null;
  ctas?: HeroCtaItem[] | null;
  metaStats?: HeroMetaStat[] | null;
};

type HeroProps = {
  block?: HeroBlockData | null;
};

export function HeroBlock({ block }: HeroProps) {
  const isImmersive = block?.variant === 'immersive';
  const defaults = isImmersive ? DEFAULT_IMMERSIVE_HERO : DEFAULT_HERO;

  const eyebrow = block?.eyebrow || defaults.eyebrow;
  const headline = block?.headline || defaults.headline;
  const subheadline = block?.subheadline || defaults.subheadline;

  const ctas = resolveCtaList(block?.ctas, defaults.ctas);

  const metaStats = block?.metaStats?.filter((stat) => stat.value && stat.label)?.length
    ? block.metaStats.filter((stat) => stat.value && stat.label)
    : defaults.metaStats;

  const imageUrl =
    getMediaUrl(block?.image) || (isImmersive ? DEFAULT_IMMERSIVE_HERO.imageUrl : null);
  const imageAlt = getMediaAlt(
    block?.image,
    isImmersive ? 'Kleenoil industrial filtration facility' : 'Industrial filtration equipment',
  );

  if (isImmersive) {
    return (
      <section className="relative isolate min-h-[640px] overflow-hidden lg:min-h-[720px]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-brand-deep" aria-hidden />
        )}

        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #003319F2 0%, #00331999 55%, #00331933 100%)',
          }}
        />

        <div className="relative mx-auto flex min-h-[640px] w-full max-w-[1440px] flex-col justify-center px-6 py-20 lg:min-h-[720px] lg:px-[100px] lg:py-[160px]">
          <div className="flex max-w-[900px] flex-col gap-7">
            <p
              data-reveal-target
              className="font-mono text-[13px] font-bold tracking-[2.4px] text-brand-soft uppercase"
            >
              {eyebrow}
            </p>

            <h1
              data-reveal-target
              className="font-heading text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-white md:text-5xl lg:text-[72px] lg:tracking-[-0.045em]"
            >
              {headline.split('\n').map((line, index) => (
                <span key={`${line}-${index}`} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p
              data-reveal-target
              className="max-w-[640px] text-base font-semibold leading-relaxed text-brand-soft md:text-lg"
            >
              {subheadline}
            </p>

            {ctas.length > 0 ? (
              <div data-reveal-target className="flex flex-wrap gap-3.5 pt-1">
                {ctas.map((cta, index) => (
                  <CtaButton
                    key={`${cta.label}-${index}`}
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

            <div
              data-reveal-target
              className="mt-2 flex flex-wrap items-start gap-10 border-t border-white/15 pt-6 sm:gap-12"
            >
              {metaStats.map((stat) => (
                <div key={`${stat.value}-${stat.label}`} className="flex flex-col gap-1">
                  <p className="font-heading text-[28px] font-bold tracking-[-0.03em] text-white">
                    <AnimatedCounter value={stat.value!} />
                  </p>
                  <p className="font-mono text-[11px] font-bold tracking-[1.4px] text-border-strong uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-background">
      <div
        aria-hidden
        data-hero-glow
        className="pointer-events-none absolute -left-24 top-48 size-[900px] rounded-full opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(0,102,51,0.2) 0%, rgba(0,102,51,0) 60%)',
        }}
      />

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 py-16 lg:flex-row lg:items-stretch lg:gap-[60px] lg:px-[100px] lg:py-[100px]">
        <div className="surface-panel w-full rounded-[20px] p-6 lg:max-w-[640px] lg:p-10">
          <div className="flex flex-col gap-8">
            <div data-reveal-target>
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>

            <h1
              data-reveal-target
              className="font-heading text-3xl font-bold leading-[0.98] tracking-[-0.04em] text-text-primary md:text-4xl lg:text-[58px]"
            >
              {headline.split('\n').map((line, index) => (
                <span key={`${line}-${index}`} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p
              data-reveal-target
              className="max-w-[520px] text-base font-semibold leading-relaxed text-text-secondary md:text-lg"
            >
              {subheadline}
            </p>

            <div data-reveal-target className="flex flex-wrap gap-3.5 pt-2">
              {ctas.map((cta, index) => (
                <CtaButton
                  key={`${cta.label}-${index}`}
                  href={cta.href}
                  appearance={cta.appearance}
                  openInNewTab={cta.openInNewTab}
                >
                  {cta.label}
                </CtaButton>
              ))}
            </div>

            <div
              data-reveal-target
              className="surface-panel mt-2 flex flex-col gap-8 rounded-2xl p-5 sm:flex-row sm:flex-wrap sm:items-start sm:gap-10 sm:p-7"
            >
              {metaStats.map((stat) => (
                <div key={`${stat.value}-${stat.label}`} className="flex flex-col gap-1.5">
                  <p className="font-heading text-2xl font-bold tracking-tight text-brand-primary md:text-[28px]">
                    <AnimatedCounter value={stat.value!} />
                  </p>
                  <p className="text-[11px] font-bold tracking-[1.2px] text-text-tertiary uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div data-reveal-target className="flex w-full flex-1 flex-col">
          <ParallaxMedia
            enabled
            strength={0.16}
            className="surface-card relative aspect-[4/5] min-h-[320px] flex-1 rounded-[20px] border-2 border-border-subtle bg-brand-soft sm:aspect-[5/6] lg:aspect-auto lg:h-full lg:min-h-0"
          >
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-soft via-surface to-brand-dim p-10 text-center">
                <div>
                  <p className="font-heading text-2xl font-bold text-brand-deep">Product Visual</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    Upload a hero image in the CMS Hero block.
                  </p>
                </div>
              </div>
            )}
          </ParallaxMedia>
        </div>
      </div>
    </section>
  );
}
