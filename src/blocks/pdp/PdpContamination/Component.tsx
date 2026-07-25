import { Eyebrow } from '@/components/ui/eyebrow';
import { DEFAULT_PDP_CONTAMINATION } from '@/lib/cms/pdp-defaults';

type CardItem = {
  title?: string | null;
  description?: string | null;
  stat?: string | null;
};

export type PdpContaminationBlockData = {
  blockType: 'pdp-contamination';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  cards?: CardItem[] | null;
};

export function PdpContaminationBlock({ block }: { block?: PdpContaminationBlockData | null }) {
  const eyebrow = block?.eyebrow || DEFAULT_PDP_CONTAMINATION.eyebrow;
  const heading = block?.heading || DEFAULT_PDP_CONTAMINATION.heading;
  const description = block?.description || DEFAULT_PDP_CONTAMINATION.description;
  const cards = block?.cards?.filter((card) => card.title)?.length
    ? block.cards.filter((card) => card.title)
    : DEFAULT_PDP_CONTAMINATION.cards;

  return (
    <section className="border-y border-border-subtle bg-surface">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-16 lg:gap-12 lg:px-[100px] lg:py-[100px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-[620px] space-y-4">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="font-heading text-3xl font-bold leading-[1.08] tracking-[-0.04em] text-text-primary lg:text-[40px]">
              {heading.split('\n').map((line, index) => (
                <span key={`${line}-${index}`} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>
          <p className="max-w-[480px] text-[15px] leading-relaxed text-text-secondary lg:pb-2">
            {description}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="surface-card flex flex-col gap-4 rounded-2xl border border-border-subtle bg-surface-elevated/70 p-7"
            >
              {card.stat ? (
                <p className="font-mono text-xs font-bold tracking-[1.2px] text-brand-primary uppercase">
                  {card.stat}
                </p>
              ) : null}
              <h3 className="font-heading text-xl font-bold text-text-primary">{card.title}</h3>
              {card.description ? (
                <p className="text-sm leading-relaxed text-text-secondary">{card.description}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
