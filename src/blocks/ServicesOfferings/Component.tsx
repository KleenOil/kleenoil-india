import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { HeadingLines } from '@/components/sustainability/HeadingLines';
import { Eyebrow } from '@/components/ui/eyebrow';
import { blockHasCmsData, cmsList, cmsText } from '@/lib/cms/block-content';
import { getMediaAlt, getMediaUrl } from '@/lib/cms/links';
import { DEFAULT_SERVICES_OFFERINGS } from '@/lib/cms/services';
import type { Media } from '@/payload-types';

type CardItem = {
  n?: string | null;
  title?: string | null;
  body?: string | null;
  href?: string | null;
  linkLabel?: string | null;
  image?: number | Media | null;
};

export type ServicesOfferingsBlockData = {
  blockType: 'services-offerings';
  eyebrow?: string | null;
  heading?: string | null;
  cards?: CardItem[] | null;
};

export function ServicesOfferingsBlock({ block }: { block?: ServicesOfferingsBlockData | null }) {
  const defaults = DEFAULT_SERVICES_OFFERINGS;
  const hasCms = blockHasCmsData(block);
  const eyebrow = cmsText(block?.eyebrow, defaults.eyebrow, hasCms);
  const heading = cmsText(block?.heading, defaults.heading, hasCms);
  const cards = cmsList(
    block?.cards?.map((card, index) => {
      const fallback = hasCms ? undefined : defaults.cards[index];
      if (!card.title?.trim() || !card.body?.trim()) return null;
      return {
        n: card.n?.trim() || fallback?.n || String(index + 1).padStart(2, '0'),
        title: card.title.trim(),
        body: card.body.trim(),
        href: card.href?.trim() || fallback?.href || '/services#program',
        linkLabel: card.linkLabel?.trim() || fallback?.linkLabel || 'See the program',
        imageUrl: getMediaUrl(card.image) || fallback?.imageUrl || null,
        imageAlt: getMediaAlt(card.image, card.title),
      };
    }),
    defaults.cards,
    hasCms,
    (card) => Boolean(card.title && card.body),
  );

  return (
    <section className="bg-surface">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-16 lg:gap-12 lg:px-[100px] lg:py-[100px]">
        <div className="max-w-[760px] space-y-4">
          {eyebrow ? (
            <div data-reveal-part>
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
          ) : null}
          {heading ? (
            <h2 className="font-heading text-[1.75rem] font-bold leading-[1.05] tracking-[-0.04em] text-text-primary md:text-4xl lg:text-[40px]">
              <HeadingLines text={heading} className="block" />
            </h2>
          ) : null}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              data-reveal-item
              className="flex flex-col overflow-hidden rounded-2xl border border-white/40 bg-surface-elevated/90"
            >
              <div className="relative h-[220px] overflow-hidden">
                {card.imageUrl ? (
                  <Image
                    src={card.imageUrl}
                    alt={card.imageAlt || card.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                ) : null}
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <p className="font-mono text-[13px] font-bold tracking-[1.4px] text-brand-primary">
                  {card.n}
                </p>
                <h3 className="font-heading text-[26px] font-bold tracking-[-0.03em] text-text-primary">
                  {card.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-text-secondary">{card.body}</p>
                {card.href ? (
                  <Link
                    href={card.href}
                    className="mt-auto inline-flex items-center gap-2 pt-2 font-heading text-sm font-bold text-brand-primary"
                  >
                    {card.linkLabel}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
