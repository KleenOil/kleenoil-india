import { ArrowRight } from 'lucide-react';

import { SectionHeader } from '@/components/sections/SectionHeader';
import { MaybeLink, hasHref } from '@/components/ui/maybe-link';
import { blockHasCmsData, cmsList, cmsText } from '@/lib/cms/block-content';
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
  const hasCms = blockHasCmsData(block);
  const eyebrow = cmsText(block?.eyebrow, DEFAULT_WHATS_NEW.eyebrow, hasCms);
  const heading = cmsText(block?.heading, DEFAULT_WHATS_NEW.heading, hasCms);
  const description = cmsText(block?.description, DEFAULT_WHATS_NEW.description, hasCms);

  const defaultCards = DEFAULT_WHATS_NEW.cards.map((card) => ({
    badge: card.badge,
    title: card.title,
    description: card.description,
    href: card.href,
    linkLabel: card.linkLabel,
  }));

  const cards = cmsList(
    block?.cards
      ?.filter((card) => card.title)
      .map((card, index) => {
        const fallback = hasCms ? undefined : DEFAULT_WHATS_NEW.cards[index];
        const link = resolveLink(card.link);

        return {
          badge: card.badge || fallback?.badge || (hasCms ? '' : 'Update'),
          title: card.title!,
          description: card.description || fallback?.description || '',
          href: link?.href ?? '',
          linkLabel: link?.label || fallback?.linkLabel || (hasCms ? '' : 'Explore'),
        };
      }),
    defaultCards,
    hasCms,
    (card) => Boolean(card.title),
  );

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
              {hasHref(card.href) ? (
                <MaybeLink
                  href={card.href}
                  className="inline-flex items-center gap-2 font-heading text-sm font-semibold text-brand-primary transition-opacity hover:opacity-80"
                >
                  {card.linkLabel}
                  <ArrowRight className="size-4" aria-hidden />
                </MaybeLink>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
