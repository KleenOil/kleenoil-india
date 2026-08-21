import Image from 'next/image';

import { CtaButton } from '@/components/ui/cta-button';
import { DEFAULT_ARTICLES_HERO } from '@/lib/cms/defaults';
import { getMediaAlt, getMediaUrl, resolveLink, type CmsLink } from '@/lib/cms/links';
import type { Media } from '@/payload-types';

export type ArticlesHeroBlockData = {
  blockType: 'articles-hero';
  eyebrow?: string | null;
  heading?: string | null;
  subheadline?: string | null;
  image?: number | Media | null;
  cta?: CmsLink | null;
};

type ArticlesHeroBlockProps = {
  block?: ArticlesHeroBlockData | null;
};

export function ArticlesHeroBlock({ block }: ArticlesHeroBlockProps) {
  const eyebrow = block?.eyebrow || DEFAULT_ARTICLES_HERO.eyebrow;
  const heading = block?.heading || DEFAULT_ARTICLES_HERO.heading;
  const subheadline = block?.subheadline || DEFAULT_ARTICLES_HERO.subheadline;
  const cta = resolveLink(block?.cta) ?? DEFAULT_ARTICLES_HERO.cta;
  const imageUrl = getMediaUrl(block?.image) || DEFAULT_ARTICLES_HERO.imageUrl;
  const imageAlt = getMediaAlt(block?.image, 'Kleenoil plant floor');

  return (
    <section className="relative isolate h-[420px] overflow-hidden lg:h-[520px]">
      {imageUrl ? (
        <Image src={imageUrl} alt={imageAlt} fill priority className="object-cover" sizes="100vw" />
      ) : (
        <div className="absolute inset-0 bg-brand-deep" aria-hidden />
      )}

      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, #003319E6 0%, #00331999 48%, #00331933 100%)',
        }}
      />

      <div className="relative mx-auto flex h-full w-full max-w-[1440px] items-end px-6 py-12 lg:px-[100px] lg:py-16">
        <div
          data-reveal-panel
          className="w-full max-w-[560px] rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-md lg:p-10"
        >
          <p
            data-reveal-target
            className="font-mono text-[12px] font-bold tracking-[2px] text-brand-soft uppercase"
          >
            {eyebrow}
          </p>
          <h1
            data-reveal-target
            className="mt-4 font-heading text-3xl font-bold leading-[1.05] tracking-[-0.04em] text-white md:text-4xl lg:text-[44px]"
          >
            {heading.split('\n').map((line, index) => (
              <span key={`${line}-${index}`} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p
            data-reveal-target
            className="mt-4 text-base font-medium leading-relaxed text-brand-soft"
          >
            {subheadline}
          </p>
          {cta ? (
            <div data-reveal-target className="mt-7">
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
    </section>
  );
}
