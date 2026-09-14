import { Hourglass, Recycle, Shield, Trash2 } from 'lucide-react';

import { HeadingLines } from '@/components/sustainability/HeadingLines';
import { Eyebrow } from '@/components/ui/eyebrow';
import { blockHasCmsData, cmsList, cmsText } from '@/lib/cms/block-content';
import { DEFAULT_SUSTAINABILITY_IMPACT } from '@/lib/cms/sustainability';

const ICONS = [Hourglass, Recycle, Trash2, Shield];

type CardItem = { title?: string | null; body?: string | null };

export type SustainabilityImpactBlockData = {
  blockType: 'sustainability-impact';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  cards?: CardItem[] | null;
};

export function SustainabilityImpactBlock({
  block,
}: {
  block?: SustainabilityImpactBlockData | null;
}) {
  const defaults = DEFAULT_SUSTAINABILITY_IMPACT;
  const hasCms = blockHasCmsData(block);
  const eyebrow = cmsText(block?.eyebrow, defaults.eyebrow, hasCms);
  const heading = cmsText(block?.heading, defaults.heading, hasCms);
  const lead = cmsText(block?.description, defaults.lead, hasCms);
  const cards = cmsList(block?.cards, defaults.cards, hasCms, (card) =>
    Boolean(card.title && card.body),
  );

  return (
    <section className="bg-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-16 lg:gap-16 lg:px-[100px] lg:py-[100px]">
        <div className="max-w-[720px] space-y-5">
          {eyebrow ? (
            <div data-reveal-part>
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
          ) : null}
          {heading ? (
            <h2 className="font-heading text-[1.75rem] font-bold leading-[1.05] tracking-[-0.04em] text-text-primary md:text-4xl lg:text-[44px]">
              <HeadingLines text={heading} className="block" />
            </h2>
          ) : null}
          {lead ? (
            <p
              data-reveal-part
              className="max-w-[640px] text-[15px] leading-relaxed text-text-secondary"
            >
              {lead}
            </p>
          ) : null}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, index) => {
            const Icon = ICONS[index] ?? Shield;
            return (
              <article
                key={`${index}-${card.title}`}
                data-reveal-item
                className="flex flex-col gap-5 rounded-2xl border border-border-subtle bg-surface-elevated/80 p-6"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-brand-soft text-brand-primary">
                  <Icon className="size-4" aria-hidden />
                </span>
                <h3 className="font-heading text-lg font-bold tracking-[-0.03em] text-text-primary">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">{card.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
