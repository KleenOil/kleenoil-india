import { HeadingLines } from '@/components/sustainability/HeadingLines';
import { Eyebrow } from '@/components/ui/eyebrow';
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
  const eyebrow = block?.eyebrow || defaults.eyebrow;
  const heading = block?.heading || defaults.heading;
  const lead = block?.description || defaults.lead;
  const stats = block?.stats?.filter((stat) => stat.value && stat.label)?.length
    ? block.stats.filter((stat) => stat.value && stat.label)
    : defaults.stats;
  const disclaimer = block?.disclaimer || defaults.disclaimer;

  return (
    <section className="bg-surface">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-16 lg:px-[100px] lg:py-[100px]">
        <div className="max-w-[640px] space-y-5">
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

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <article
              key={stat.label}
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

        <p data-reveal-part className="max-w-[820px] text-xs leading-relaxed text-text-tertiary">
          {disclaimer}
        </p>
      </div>
    </section>
  );
}
