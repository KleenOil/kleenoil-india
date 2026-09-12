import { Car, Cog, Factory, Gauge, Truck, Zap } from 'lucide-react';

import { HeadingLines } from '@/components/sustainability/HeadingLines';
import { Eyebrow } from '@/components/ui/eyebrow';
import { DEFAULT_SUSTAINABILITY_APPLICATIONS } from '@/lib/cms/sustainability';

const ICONS = [Factory, Zap, Gauge, Truck, Cog, Car];

type CardItem = { title?: string | null; body?: string | null };

export type SustainabilityApplicationsBlockData = {
  blockType: 'sustainability-applications';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  cards?: CardItem[] | null;
};

export function SustainabilityApplicationsBlock({
  block,
}: {
  block?: SustainabilityApplicationsBlockData | null;
}) {
  const defaults = DEFAULT_SUSTAINABILITY_APPLICATIONS;
  const eyebrow = block?.eyebrow || defaults.eyebrow;
  const heading = block?.heading || defaults.heading;
  const lead = block?.description || defaults.lead;
  const cards = block?.cards?.filter((card) => card.title && card.body)?.length
    ? block.cards.filter((card) => card.title && card.body)
    : defaults.cards;

  return (
    <section className="bg-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-16 lg:px-[100px] lg:py-[100px]">
        <div className="max-w-[720px] space-y-5">
          <div data-reveal-part>
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <h2 className="font-heading text-[1.75rem] font-bold leading-[1.05] tracking-[-0.04em] text-text-primary md:text-4xl lg:text-[44px]">
            <HeadingLines text={heading} className="block" />
          </h2>
          <p data-reveal-part className="text-[15px] leading-relaxed text-text-secondary">
            {lead}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = ICONS[index] ?? Cog;
            return (
              <article
                key={card.title}
                data-reveal-item
                className="flex flex-col gap-4 rounded-2xl border border-border-subtle bg-surface-elevated/80 p-6"
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
