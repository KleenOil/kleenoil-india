import { HeadingLines } from '@/components/sustainability/HeadingLines';
import { Eyebrow } from '@/components/ui/eyebrow';
import { blockHasCmsData, cmsList, cmsText } from '@/lib/cms/block-content';
import { DEFAULT_SUSTAINABILITY_NUMBERS } from '@/lib/cms/sustainability';

type StatItem = { value?: string | null; label?: string | null };

export type SustainabilityNumbersBlockData = {
  blockType: 'sustainability-numbers';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  stats?: StatItem[] | null;
  disclaimer?: string | null;
};

export function SustainabilityNumbersBlock({
  block,
}: {
  block?: SustainabilityNumbersBlockData | null;
}) {
  const defaults = DEFAULT_SUSTAINABILITY_NUMBERS;
  const hasCms = blockHasCmsData(block);
  const eyebrow = cmsText(block?.eyebrow, defaults.eyebrow, hasCms);
  const heading = cmsText(block?.heading, defaults.heading, hasCms);
  const lead = cmsText(block?.description, defaults.lead, hasCms);
  const stats = cmsList(block?.stats, defaults.stats, hasCms, (stat) =>
    Boolean(stat.value && stat.label),
  );
  const disclaimer = cmsText(block?.disclaimer, defaults.disclaimer, hasCms);

  return (
    <section className="bg-surface">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-16 lg:px-[100px] lg:py-[100px]">
        <div className="max-w-[640px] space-y-5">
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
            <p data-reveal-part className="text-[15px] leading-relaxed text-text-secondary">
              {lead}
            </p>
          ) : null}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <article
              key={`${stat.value}-${stat.label}`}
              data-reveal-item
              className="flex flex-col gap-4 rounded-2xl border border-border-subtle bg-surface-elevated/80 px-6 py-8"
            >
              <p className="font-heading text-4xl font-bold tracking-[-0.05em] text-text-primary md:text-[52px]">
                {stat.value}
              </p>
              <p className="text-sm font-semibold leading-relaxed text-text-secondary">
                {stat.label}
              </p>
            </article>
          ))}
        </div>

        {disclaimer ? (
          <p data-reveal-part className="max-w-[820px] text-xs leading-relaxed text-text-tertiary">
            {disclaimer}
          </p>
        ) : null}
      </div>
    </section>
  );
}
