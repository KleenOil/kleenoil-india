import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { SectionHeader } from '@/components/sections/SectionHeader';
import { DEFAULT_WHATS_NEW } from '@/lib/cms/defaults';
import { resolveLink, type CmsLink } from '@/lib/cms/links';

type WhatsNewCard = {
  badge?: string | null;
  title?: string | null;
  description?: string | null;
  link?: CmsLink | null;
};

export type WhatsNewBlockData = {
  blockType: 'whats-new';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  cards?: WhatsNewCard[] | null;
};

type WhatsNewBlockProps = {
  block?: WhatsNewBlockData | null;
};

export function WhatsNewBlock({ block }: WhatsNewBlockProps) {
  const eyebrow = block?.eyebrow || DEFAULT_WHATS_NEW.eyebrow;
  const heading = block?.heading || DEFAULT_WHATS_NEW.heading;
  const description = block?.description || DEFAULT_WHATS_NEW.description;

  const cmsCards =
    block?.cards
      ?.filter((card) => card.title)
      .map((card, index) => {
        const fallback = DEFAULT_WHATS_NEW.cards[index] ?? DEFAULT_WHATS_NEW.cards[0];
        const link = resolveLink(card.link, { fallbackHref: fallback?.href ?? '/' });

        return {
          badge: card.badge || fallback?.badge || 'Update',
          title: card.title!,
          description: card.description || fallback?.description || '',
          href: link?.href ?? fallback?.href ?? '/',
          linkLabel: link?.label || fallback?.linkLabel || 'Explore',
        };
      }) ?? [];

  const cards =
    cmsCards.length > 0
      ? cmsCards
      : DEFAULT_WHATS_NEW.cards.map((card) => ({
          badge: card.badge,
          title: card.title,
          description: card.description,
          href: card.href,
          linkLabel: card.linkLabel,
        }));

  return (
    <section className="border-b border-border-subtle bg-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-16 lg:gap-16 lg:px-[100px] lg:py-[120px]">
        <SectionHeader eyebrow={eyebrow} heading={heading} description={description} />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              data-reveal-part
              className="flex flex-col gap-5 rounded-2xl border border-border-subtle bg-surface-elevated p-7"
            >
              <span className="inline-flex w-fit rounded-full border border-border-subtle bg-background px-3 py-1 font-mono text-[10px] font-bold tracking-[1.2px] text-text-tertiary uppercase">
                {card.badge}
              </span>
              <div className="flex flex-1 flex-col gap-3">
                <h3 className="font-heading text-xl font-bold tracking-[-0.03em] text-text-primary">
                  {card.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-text-secondary">
                  {card.description}
                </p>
              </div>
              <Link
                href={card.href}
                className="inline-flex items-center gap-2 font-heading text-sm font-semibold text-brand-primary transition-opacity hover:opacity-80"
              >
                {card.linkLabel}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
