import { cn } from '@/lib/utils';

type StatCardProps = {
  value: string;
  label: string;
  className?: string;
};

export function StatCard({ value, label, className }: StatCardProps) {
  const isCompact = value.length > 4;

  return (
    <div
      data-reveal-item
      className={cn(
        'surface-card flex flex-col gap-4 rounded-2xl border-2 border-border-subtle bg-surface-elevated/70 p-8',
        className,
      )}
    >
      <p
        className={cn(
          'font-heading font-bold tracking-tight text-text-primary',
          isCompact
            ? 'text-4xl tracking-[-0.03em] md:text-[52px]'
            : 'text-5xl tracking-[-0.05em] md:text-[64px]',
        )}
      >
        {value}
      </p>
      <span className="h-[3px] w-12 rounded-full bg-brand-primary" aria-hidden />
      <p className="text-[15px] font-semibold leading-relaxed text-text-secondary">{label}</p>
    </div>
  );
}
