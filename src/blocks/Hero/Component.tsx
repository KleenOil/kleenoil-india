import Image from 'next/image';

import { ParallaxMedia } from '@/components/motion/ParallaxMedia';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { Eyebrow } from '@/components/ui/eyebrow';
import { CtaButton } from '@/components/ui/cta-button';
import { DEFAULT_HERO } from '@/lib/cms/defaults';
import { getMediaAlt, getMediaUrl, resolveLink } from '@/lib/cms/links';
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
  const eyebrow = block?.eyebrow || DEFAULT_HERO.eyebrow;
  const headline = block?.headline || DEFAULT_HERO.headline;
  const subheadline = block?.subheadline || DEFAULT_HERO.subheadline;

  const cmsCtas =
    block?.ctas
      ?.map((item) => resolveLink(item.link))
      .filter((item): item is NonNullable<typeof item> => Boolean(item)) ?? [];

  const ctas =
    cmsCtas.length > 0
      ? cmsCtas
      : DEFAULT_HERO.ctas.map((cta) => ({
          ...cta,
          openInNewTab: false,
        }));

  const metaStats = block?.metaStats?.filter((stat) => stat.value && stat.label)?.length
    ? block.metaStats.filter((stat) => stat.value && stat.label)
    : DEFAULT_HERO.metaStats;

  const imageUrl = getMediaUrl(block?.image);
  const imageAlt = getMediaAlt(block?.image, 'Industrial filtration equipment');

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

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 py-16 lg:flex-row lg:items-center lg:gap-[60px] lg:px-[100px] lg:py-[100px]">
        <div className="surface-panel w-full rounded-[20px] p-6 lg:max-w-[640px] lg:p-10">
          <div className="flex flex-col gap-8">
            <div data-reveal-target>
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>

            <h1
              data-reveal-target
              className="font-heading text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-text-primary sm:text-5xl lg:text-[58px]"
            >
              {headline.split('\n').map((line, index) => (
                <span key={`${line}-${index}`} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p
              data-reveal-target
              className="max-w-[520px] text-lg font-semibold leading-relaxed text-text-secondary"
            >
              {subheadline}
            </p>

            <div data-reveal-target className="flex flex-wrap gap-3.5 pt-2">
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

            <div
              data-reveal-target
              className="surface-panel mt-2 flex flex-col gap-8 rounded-2xl p-5 sm:flex-row sm:flex-wrap sm:items-start sm:gap-10 sm:p-7"
            >
              {metaStats.map((stat) => (
                <div key={`${stat.value}-${stat.label}`} className="flex flex-col gap-1.5">
                  <p className="font-heading text-[28px] font-bold tracking-tight text-brand-primary">
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

        <div data-reveal-target className="w-full flex-1">
          <ParallaxMedia
            enabled
            strength={0.16}
            className="surface-card relative aspect-[4/5] rounded-[20px] border-2 border-border-subtle bg-brand-soft sm:aspect-[5/6] lg:aspect-auto lg:h-[600px]"
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
