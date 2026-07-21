import Image from 'next/image';
import Link from 'next/link';

import { DEFAULT_TRUST_INDICATORS } from '@/lib/cms/defaults';
import { getMediaAlt, getMediaUrl } from '@/lib/cms/links';
import type { Media } from '@/payload-types';

type TrustLogo = {
  logo?: number | Media | null;
  alt?: string | null;
  url?: string | null;
};

export type TrustIndicatorsBlockData = {
  blockType: 'trust-indicators';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  logos?: TrustLogo[] | null;
};

type TrustIndicatorsBlockProps = {
  block?: TrustIndicatorsBlockData | null;
};

export function TrustIndicatorsBlock({ block }: TrustIndicatorsBlockProps) {
  const heading = block?.heading || DEFAULT_TRUST_INDICATORS.heading;

  const cmsLogos =
    block?.logos
      ?.map((item) => {
        const imageUrl = getMediaUrl(item.logo);
        const alt = item.alt || getMediaAlt(item.logo, 'Client logo');

        if (!imageUrl && !alt) {
          return null;
        }

        return {
          name: alt,
          imageUrl,
          href: item.url || undefined,
        };
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item)) ?? [];

  const logos =
    cmsLogos.length > 0
      ? cmsLogos
      : DEFAULT_TRUST_INDICATORS.logos.map((logo) => ({
          name: logo.name,
          imageUrl: null as string | null,
          href: undefined as string | undefined,
        }));

  return (
    <section className="border-b border-border-subtle bg-surface">
      <div className="mx-auto w-full max-w-[1440px] px-6 pb-16 lg:px-[100px] lg:pb-[120px]">
        <div className="flex flex-col gap-7 border-t border-border-subtle pt-6">
          <div data-reveal-part className="flex items-center gap-5">
            <p className="shrink-0 font-mono text-[11px] font-bold tracking-[2px] text-text-tertiary uppercase">
              {heading}
            </p>
            <span className="motion-line-grow h-px flex-1 bg-border-subtle" aria-hidden />
          </div>

          <div
            data-reveal-logos
            className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6"
          >
            {logos.map((logo) => {
              const content = logo.imageUrl ? (
                <Image
                  src={logo.imageUrl}
                  alt={logo.name}
                  width={140}
                  height={40}
                  className="logo-reveal h-8 w-auto object-contain opacity-80 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
                />
              ) : (
                <span className="font-heading text-base font-bold tracking-[3px] text-brand-primary sm:text-[17px]">
                  {logo.name}
                </span>
              );

              if (logo.href) {
                return (
                  <Link
                    key={logo.name}
                    href={logo.href}
                    className="transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    {content}
                  </Link>
                );
              }

              return <div key={logo.name}>{content}</div>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
