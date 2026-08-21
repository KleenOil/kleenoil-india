import Image from 'next/image';

import { CtaButton } from '@/components/ui/cta-button';
import { splitCategory } from '@/lib/cms/article-content';
import { DEFAULT_ARTICLE_PAGE, DEFAULT_ARTICLES_HERO } from '@/lib/cms/defaults';
import type { ResolvedLink } from '@/lib/cms/links';

type ArticleHeroProps = {
  title: string;
  excerpt?: string | null;
  date?: string | null;
  category?: string | null;
  readMinutes: number;
  imageUrl?: string | null;
  imageAlt: string;
  cta?: ResolvedLink | null;
};

export function ArticleHero({
  title,
  excerpt,
  date,
  category,
  readMinutes,
  imageUrl,
  imageAlt,
  cta,
}: ArticleHeroProps) {
  const topic = splitCategory(category);
  const background = imageUrl || DEFAULT_ARTICLES_HERO.imageUrl;
  const heroCta = cta ?? DEFAULT_ARTICLE_PAGE.heroCta;

  return (
    <section className="relative isolate min-h-[560px] overflow-hidden lg:min-h-[640px]">
      {background ? (
        <Image
          src={background}
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

      <div className="relative mx-auto flex min-h-[560px] w-full max-w-[1440px] flex-col items-center justify-center px-6 py-20 text-center lg:min-h-[640px] lg:px-[100px] lg:py-[120px]">
        <p
          data-reveal-target
          className="font-mono text-[13px] font-bold tracking-[2.4px] text-brand-soft uppercase"
        >
          Articles{date ? `  ·  ${date}` : ''}
        </p>

        <h1
          data-reveal-target
          className="mt-6 max-w-[900px] font-heading text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-white md:text-5xl lg:text-[52px] lg:tracking-[-0.045em]"
        >
          {title}
        </h1>

        {excerpt ? (
          <p
            data-reveal-target
            className="mt-6 max-w-[640px] text-base font-semibold leading-relaxed text-brand-soft md:text-lg"
          >
            {excerpt}
          </p>
        ) : null}

        <div data-reveal-target className="mt-8">
          <CtaButton
            href={heroCta.href}
            appearance="primary"
            openInNewTab={heroCta.openInNewTab}
            className="hover:border-white hover:bg-transparent hover:text-white"
          >
            {heroCta.label}
          </CtaButton>
        </div>

        <div
          data-reveal-target
          className="mt-10 flex flex-wrap items-start justify-center gap-10 border-t border-white/15 pt-6 sm:gap-14"
        >
          {[
            { value: `${readMinutes} MIN`, label: 'READ' },
            { value: 'FIELD', label: 'NOTES' },
            { value: topic.value.toUpperCase(), label: topic.label.toUpperCase() },
          ].map((stat) => (
            <div key={`${stat.value}-${stat.label}`} className="flex flex-col gap-1">
              <p className="font-heading text-[28px] font-bold tracking-[-0.03em] text-white">
                {stat.value}
              </p>
              <p className="font-mono text-[11px] font-bold tracking-[1.4px] text-border-strong uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
