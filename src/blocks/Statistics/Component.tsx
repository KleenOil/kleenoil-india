import { StatCard } from '@/components/cards/StatCard';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { DEFAULT_STATISTICS } from '@/lib/cms/defaults';

type StatItem = {
  value?: string | null;
  label?: string | null;
};

export type StatisticsBlockData = {
  blockType: 'statistics';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  stats?: StatItem[] | null;
};

type StatisticsBlockProps = {
  block?: StatisticsBlockData | null;
};

export function StatisticsBlock({ block }: StatisticsBlockProps) {
  const eyebrow = block?.eyebrow || DEFAULT_STATISTICS.eyebrow;
  const heading = block?.heading || DEFAULT_STATISTICS.heading;
  const description = block?.description || DEFAULT_STATISTICS.description;

  const stats = block?.stats?.filter((stat) => stat.value && stat.label)?.length
    ? block.stats.filter((stat) => stat.value && stat.label)
    : DEFAULT_STATISTICS.stats;

  return (
    <section className="border-t border-border-subtle bg-surface">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-16 lg:gap-16 lg:px-[100px] lg:pt-[120px]">
        <SectionHeader eyebrow={eyebrow} heading={heading} description={description} />

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={`${stat.value}-${stat.label}`} value={stat.value!} label={stat.label!} />
          ))}
        </div>
      </div>
    </section>
  );
}
