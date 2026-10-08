import { Eyebrow } from '@/components/ui/eyebrow';
import { HeadingLines } from '@/components/sustainability/HeadingLines';
import { PdfCard } from '@/components/library/PdfCard';
import type { ResourcePdfCard } from '@/lib/cms/library';

type ResourcePdfsProps = {
  eyebrow: string;
  heading: string;
  description: string;
  cards: ResourcePdfCard[];
};

export function ResourcePdfs({ eyebrow, heading, description, cards }: ResourcePdfsProps) {
  if (!cards.length && !heading) {
    return null;
  }

  return (
    <section id="notes" className="bg-surface">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 py-16 lg:gap-12 lg:px-[100px] lg:py-[100px]">
        <div className="flex max-w-[720px] flex-col gap-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="font-heading text-[1.75rem] font-bold leading-[1.08] tracking-[-0.04em] text-text-primary md:text-4xl lg:text-[40px]">
            <HeadingLines text={heading} className="block" />
          </h2>
          {description ? (
            <p className="text-[15px] leading-relaxed text-text-secondary">{description}</p>
          ) : null}
        </div>

        {cards.length ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
              <PdfCard key={card.title} title={card.title} meta={card.meta} href={card.href} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
