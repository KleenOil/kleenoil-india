'use client';

import Image from 'next/image';
import { useState } from 'react';

import { AnimatedCounter } from '@/components/ui/animated-counter';
import { CtaButton } from '@/components/ui/cta-button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { DEFAULT_PDP_HERO } from '@/lib/cms/pdp-defaults';
import { getMediaAlt, getMediaUrl, resolveLink } from '@/lib/cms/links';
import type { Media } from '@/payload-types';
import { cn } from '@/lib/utils';

type SpecItem = {
  value?: string | null;
  label?: string | null;
  animateCounter?: boolean | null;
};

type CtaItem = {
  link?: Parameters<typeof resolveLink>[0];
};

export type PdpHeroBlockData = {
  blockType: 'pdp-hero';
  badge?: string | null;
  eyebrow?: string | null;
  title?: string | null;
  summary?: string | null;
  gallery?: (number | Media)[] | null;
  quickSpecs?: SpecItem[] | null;
  ctas?: CtaItem[] | null;
};

type PdpHeroProps = {
  block?: PdpHeroBlockData | null;
  productName?: string | null;
  featuredImageUrl?: string | null;
};

export function PdpHeroBlock({ block, productName, featuredImageUrl }: PdpHeroProps) {
  const badge = block?.badge || DEFAULT_PDP_HERO.badge;
  const eyebrow = block?.eyebrow || DEFAULT_PDP_HERO.eyebrow;
  const title = block?.title || productName || DEFAULT_PDP_HERO.title;
  const summary = block?.summary || DEFAULT_PDP_HERO.summary;

  const cmsGallery =
    block?.gallery
      ?.map((item) => ({
        url: getMediaUrl(item),
        alt: getMediaAlt(item, title),
      }))
      .filter((item): item is { url: string; alt: string } => Boolean(item.url)) ?? [];

  const gallery =
    cmsGallery.length > 0
      ? cmsGallery
      : [
          ...(featuredImageUrl ? [{ url: featuredImageUrl, alt: title }] : []),
          ...DEFAULT_PDP_HERO.galleryUrls.map((url, index) => ({
            url,
            alt: `${title} ${index + 1}`,
          })),
        ].slice(0, 4);

  const [active, setActive] = useState(0);
  const activeImage = gallery[active] ?? gallery[0];

  const specs = block?.quickSpecs?.filter((s) => s.value && s.label)?.length
    ? block.quickSpecs.filter((s) => s.value && s.label)
    : DEFAULT_PDP_HERO.quickSpecs;

  const cmsCtas =
    block?.ctas
      ?.map((item) => resolveLink(item.link))
      .filter((item): item is NonNullable<typeof item> => Boolean(item)) ?? [];

  const ctas =
    cmsCtas.length > 0
      ? cmsCtas
      : DEFAULT_PDP_HERO.ctas.map((cta) => ({ ...cta, openInNewTab: false }));

  return (
    <section className="bg-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 py-16 lg:flex-row lg:gap-16 lg:px-[100px] lg:py-20">
        <div className="flex w-full flex-col gap-4 lg:max-w-[680px]">
          <div className="surface-card relative aspect-[680/520] overflow-hidden rounded-[20px] border-2 border-border-subtle bg-brand-soft">
            {activeImage ? (
              <Image
                src={activeImage.url}
                alt={activeImage.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 680px"
                priority
              />
            ) : null}
            <div className="absolute inset-0 bg-brand-primary/10" aria-hidden />
            <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-surface-elevated/80 px-3.5 py-2.5">
              <span className="size-1.5 rounded-full bg-brand-primary" aria-hidden />
              <span className="font-mono text-[11px] font-bold tracking-[1.2px] text-brand-primary uppercase">
                {badge}
              </span>
            </div>
          </div>

          {gallery.length > 1 ? (
            <div data-reveal-ignore className="grid grid-cols-4 gap-3">
              {gallery.map((item, index) => (
                <button
                  key={`${item.url}-${index}`}
                  type="button"
                  onClick={() => setActive(index)}
                  className={cn(
                    'relative aspect-[4/3] overflow-hidden rounded-xl border-2',
                    index === active ? 'border-brand-primary' : 'border-border-subtle',
                  )}
                >
                  <Image src={item.url} alt="" fill className="object-cover" sizes="160px" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col gap-7 pt-2">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-text-primary sm:text-5xl lg:text-[48px]">
            {title.split('\n').map((line, index) => (
              <span key={`${line}-${index}`} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="max-w-xl text-[17px] leading-relaxed text-text-secondary">{summary}</p>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {specs.map((spec) => (
              <div
                key={`${spec.value}-${spec.label}`}
                data-reveal-item
                className="surface-card flex flex-col gap-1.5 rounded-xl border border-border-subtle bg-surface-elevated/70 p-4"
              >
                <p className="font-heading text-[22px] font-bold tracking-tight text-brand-primary">
                  {spec.animateCounter && spec.value ? (
                    <AnimatedCounter value={spec.value} durationMs={2000} />
                  ) : (
                    spec.value
                  )}
                </p>
                <p className="font-mono text-[10px] font-bold tracking-[1.2px] text-text-tertiary uppercase">
                  {spec.label}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3.5 pt-2">
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
        </div>
      </div>
    </section>
  );
}
