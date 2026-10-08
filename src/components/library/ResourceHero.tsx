import Image from 'next/image';
import { FileText } from 'lucide-react';

import { LatticeBg } from '@/components/library/LatticeBg';
import { CtaButton } from '@/components/ui/cta-button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { HeadingLines } from '@/components/sustainability/HeadingLines';
import type { ResourceHeroVariant, ResourcePreview, ResourceStat } from '@/lib/cms/library';
import { cn } from '@/lib/utils';

type Cta = {
  label: string;
  href: string;
  appearance: 'primary' | 'secondary' | 'ghost';
  openInNewTab?: boolean;
};

type ResourceHeroProps = {
  variant: ResourceHeroVariant;
  eyebrow: string;
  heading: string;
  lead: string;
  ctas: Cta[];
  stats: ResourceStat[];
  quote?: string;
  attribution?: string;
  previews?: ResourcePreview[];
  imageUrl?: string;
  imageAlt?: string;
};

function StatsRow({ stats, tone }: { stats: ResourceStat[]; tone: 'dark' | 'light' | 'faq' }) {
  if (!stats.length) {
    return null;
  }

  if (tone === 'faq') {
    return (
      <div className="mt-10 grid max-w-[720px] grid-cols-1 gap-8 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <p className="font-heading text-[1.75rem] font-bold tracking-[-0.04em] text-text-primary md:text-[32px]">
              {stat.n}
            </p>
            <p className="font-mono text-[11px] font-bold tracking-[1.4px] text-text-tertiary uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid gap-6 border-t pt-6',
        stats.length === 3 ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-4',
        tone === 'dark' ? 'border-white/10' : 'border-border-subtle',
      )}
    >
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-1">
          <p
            className={cn(
              'font-mono text-[11px] font-bold tracking-[1.6px]',
              tone === 'dark' ? 'text-brand-soft/70' : 'text-text-tertiary',
            )}
          >
            {stat.n}
          </p>
          <p
            className={cn(
              'font-heading text-sm font-bold tracking-[0.08em] uppercase',
              tone === 'dark' ? 'text-white' : 'text-text-primary',
            )}
          >
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

function Copy({
  eyebrow,
  heading,
  lead,
  ctas,
  dark,
}: {
  eyebrow: string;
  heading: string;
  lead: string;
  ctas: Cta[];
  dark: boolean;
}) {
  return (
    <div className="flex max-w-[640px] flex-col gap-6">
      <Eyebrow className={dark ? 'border-white/20 bg-white/10 text-white' : undefined}>
        {eyebrow}
      </Eyebrow>
      <h1
        className={cn(
          'font-heading text-[2rem] font-bold leading-[1.06] tracking-[-0.045em] md:text-5xl lg:text-[56px]',
          dark ? 'text-white' : 'text-text-primary',
        )}
      >
        <HeadingLines text={heading} className="block" />
      </h1>
      {lead ? (
        <p
          className={cn(
            'max-w-[520px] text-[15px] leading-relaxed md:text-base',
            dark ? 'text-brand-soft/85' : 'text-text-secondary',
          )}
        >
          {lead}
        </p>
      ) : null}
      {ctas.length ? (
        <div className="flex flex-wrap gap-3">
          {ctas.map((cta) => (
            <CtaButton
              key={cta.label}
              href={cta.href}
              appearance={cta.appearance}
              openInNewTab={cta.openInNewTab}
              className={
                dark && cta.appearance === 'primary'
                  ? 'hover:border-white hover:bg-transparent hover:text-white'
                  : undefined
              }
            >
              {cta.label}
            </CtaButton>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function ResourceHero({
  variant,
  eyebrow,
  heading,
  lead,
  ctas,
  stats,
  quote,
  attribution,
  previews,
  imageUrl,
  imageAlt,
}: ResourceHeroProps) {
  if (variant === 'faq') {
    return (
      <section className="relative overflow-hidden bg-surface">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-1/2 size-[420px] -translate-y-1/2 rounded-full bg-brand-soft/80"
        />
        <div className="relative mx-auto w-full max-w-[1440px] px-6 py-16 lg:px-[100px] lg:py-[100px]">
          <Copy eyebrow={eyebrow} heading={heading} lead={lead} ctas={ctas} dark={false} />
          <StatsRow stats={stats} tone="faq" />
        </div>
      </section>
    );
  }

  if (variant === 'testimonials') {
    const cards = (previews ?? []).slice(0, 3);
    const ctaRow = ctas.length ? (
      <div className="flex flex-wrap gap-3">
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
    ) : null;

    return (
      <section className="relative overflow-hidden bg-surface">
        <div className="relative mx-auto w-full max-w-[1440px] lg:min-h-[680px]">
          {imageUrl ? (
            <div className="pointer-events-none absolute inset-0 hidden lg:block">
              <Image
                src={imageUrl}
                alt={imageAlt || heading}
                fill
                priority
                className="object-cover object-[70%_center]"
                sizes="100vw"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(90deg, #EBF2EEF2 0%, #EBF2EED9 42%, #EBF2EE66 78%, #EBF2EE22 100%)',
                }}
              />
            </div>
          ) : null}

          <div className="relative grid lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)]">
            <div className="flex flex-col gap-4 px-5 py-9 lg:gap-6 lg:px-[100px] lg:py-20 lg:pr-12">
              <Eyebrow className="border-brand-dim bg-[#EBF2EEEE] backdrop-blur-[12px]">
                {eyebrow}
              </Eyebrow>
              <h1 className="max-w-[612px] font-heading text-[1.75rem] font-bold leading-[1.08] tracking-[-0.02em] text-text-primary md:text-4xl lg:text-[52px] lg:tracking-[-1px]">
                <HeadingLines text={heading} className="block" />
              </h1>
              {lead ? (
                <p className="max-w-[612px] text-sm leading-[1.55] text-text-secondary lg:text-base">
                  {lead}
                </p>
              ) : null}
              {ctaRow ? <div className="hidden lg:block">{ctaRow}</div> : null}
              {quote ? (
                <blockquote className="flex max-w-[612px] flex-col gap-2 rounded-[14px] border border-border-subtle bg-[#E8F3ED] p-[18px] lg:gap-3 lg:rounded-2xl lg:bg-surface lg:px-6 lg:py-[22px]">
                  <p className="hidden font-heading text-4xl leading-none text-brand-primary lg:block">
                    “
                  </p>
                  <p className="text-sm leading-relaxed text-text-primary italic lg:text-[15px] lg:leading-[1.5] lg:not-italic">
                    {quote}
                  </p>
                  {attribution ? (
                    <p className="font-heading text-[11px] font-semibold text-text-tertiary lg:text-xs">
                      {attribution}
                    </p>
                  ) : null}
                </blockquote>
              ) : null}
              {ctaRow ? <div className="lg:hidden">{ctaRow}</div> : null}
            </div>

            {cards.length ? (
              <div className="relative hidden min-h-[560px] lg:block xl:min-h-[680px]">
                {cards.map((preview, index) => (
                  <article
                    key={preview.title}
                    className={cn(
                      'absolute flex w-[min(88%,420px)] flex-col gap-2.5 rounded-2xl border border-border-subtle bg-[#F4FAF6] p-7 shadow-[0_12px_28px_#00331918]',
                      index === 0 && 'top-16 left-6 xl:top-20 xl:left-12',
                      index === 1 && 'top-[38%] left-16 xl:top-[220px] xl:left-[120px]',
                      index === 2 && 'top-[64%] left-8 xl:top-[370px] xl:left-[72px]',
                    )}
                  >
                    <FileText className="size-5 text-brand-primary" aria-hidden />
                    <p className="font-heading text-lg font-bold text-text-primary">
                      {preview.title}
                    </p>
                    {preview.kicker ? (
                      <p className="text-[13px] text-text-secondary">{preview.kicker}</p>
                    ) : null}
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'applications') {
    return (
      <section className="bg-surface">
        <div className="mx-auto grid min-h-[560px] w-full max-w-[1440px] lg:min-h-[720px] lg:grid-cols-2">
          <div className="flex flex-col justify-between gap-12 px-6 py-16 lg:px-[100px] lg:py-20">
            <Copy eyebrow={eyebrow} heading={heading} lead={lead} ctas={ctas} dark={false} />
            <StatsRow stats={stats} tone="light" />
          </div>
          <div className="relative min-h-[280px] overflow-hidden bg-brand-soft/40 lg:min-h-full">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={imageAlt || heading}
                fill
                className="object-cover"
                sizes="50vw"
              />
            ) : (
              <LatticeBg patternId="kleenoil-lattice-apps" className="text-brand-primary/15" />
            )}
          </div>
        </div>
      </section>
    );
  }

  const split = variant === 'fluids';

  return (
    <section className="relative overflow-hidden bg-brand-deep text-white">
      {split ? (
        <div className="mx-auto grid min-h-[560px] w-full max-w-[1440px] lg:min-h-[760px] lg:grid-cols-2">
          <div className="relative z-10 flex flex-col justify-between gap-12 px-6 py-16 lg:px-[100px] lg:py-20">
            <Copy eyebrow={eyebrow} heading={heading} lead={lead} ctas={ctas} dark />
            <StatsRow stats={stats} tone="dark" />
          </div>
          <div className="relative hidden min-h-[320px] overflow-hidden lg:block">
            <LatticeBg patternId="kleenoil-lattice-fluids" className="text-brand-primary/40" />
          </div>
        </div>
      ) : (
        <>
          <LatticeBg className="text-brand-primary/35" />
          <div className="relative mx-auto flex min-h-[560px] w-full max-w-[1440px] flex-col justify-between gap-16 px-6 py-16 lg:min-h-[760px] lg:px-[100px] lg:py-20">
            <Copy eyebrow={eyebrow} heading={heading} lead={lead} ctas={ctas} dark />
            <StatsRow stats={stats} tone="dark" />
          </div>
        </>
      )}
    </section>
  );
}
