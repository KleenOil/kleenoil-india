import { cn } from '@/lib/utils';

export type TimelineItemData = {
  year: string;
  label: string;
  title: string;
  description: string;
};

type TimelineItemProps = {
  item: TimelineItemData;
  className?: string;
};

export function TimelineItem({ item, className }: TimelineItemProps) {
  return (
    <div
      data-reveal-item
      className={cn(
        'surface-card flex flex-col gap-6 rounded-2xl border border-border-subtle bg-surface-elevated/60 p-6 sm:flex-row sm:gap-10 sm:p-6',
        className,
      )}
    >
      <div className="shrink-0 sm:w-[140px]">
        <p className="font-heading text-4xl font-bold tracking-tight text-brand-primary sm:text-[44px]">
          {item.year}
        </p>
        <p className="mt-1.5 font-mono text-[10px] font-medium tracking-[1.4px] text-text-tertiary uppercase">
          {item.label}
        </p>
      </div>
      <div className="flex flex-col gap-2.5 sm:pt-2">
        <h3 className="font-heading text-[22px] font-bold leading-tight tracking-tight text-text-primary">
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed text-text-secondary">{item.description}</p>
      </div>
    </div>
  );
}
