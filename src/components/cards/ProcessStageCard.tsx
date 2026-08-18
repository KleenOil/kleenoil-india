import { cn } from '@/lib/utils';

export type ProcessStageData = {
  stage: string;
  title: string;
  description: string;
  spec: string;
  theme: 'contaminated' | 'coalescer' | 'depth' | 'pristine';
};

const themeStyles: Record<
  ProcessStageData['theme'],
  { visual: string; liquid: string; particles: string }
> = {
  contaminated: {
    visual: 'bg-[#E8DDD0]',
    liquid: 'from-[#5A3A1A] to-[#2A1A08]',
    particles: 'bg-white/50',
  },
  coalescer: {
    visual: 'bg-brand-soft',
    liquid: 'from-[#3A4350] to-[#1A2028]',
    particles: 'bg-white/35',
  },
  depth: {
    visual: 'bg-[#B8D9CC]',
    liquid: 'from-[#7A5B2A] to-[#3A2A14]',
    particles: 'bg-white/25',
  },
  pristine: {
    visual: 'bg-brand-soft',
    liquid: 'from-[#D6A354] to-[#604224]',
    particles: 'bg-white/20',
  },
};

type ProcessStageCardProps = {
  stage: ProcessStageData;
  className?: string;
};

export function ProcessStageCard({ stage, className }: ProcessStageCardProps) {
  const styles = themeStyles[stage.theme];

  return (
    <article data-reveal-item className={cn('surface-card flex flex-col gap-6', className)}>
      <div
        className={cn(
          'relative flex h-[220px] items-center justify-center overflow-hidden rounded-2xl border border-border-subtle shadow-[0_8px_24px_#00663312] sm:h-[300px]',
          styles.visual,
        )}
      >
        <div className="relative flex flex-col items-center">
          <div className="mb-1 h-2 w-12 rounded-sm bg-white/20" />
          <div className="h-8 w-10 rounded-t-md border-2 border-white/20 bg-white/10" />
          <div
            className={cn(
              'relative h-44 w-20 overflow-hidden rounded-b-[2.5rem] border-2 border-white/20 bg-gradient-to-b',
              styles.liquid,
            )}
          >
            <div className="absolute inset-x-3 bottom-3 top-8 rounded-b-[2rem] bg-gradient-to-t from-black/20 to-transparent" />
            <div className={cn('absolute left-4 top-14 size-1 rounded-full', styles.particles)} />
            <div className={cn('absolute left-8 top-16 size-1.5 rounded-full', styles.particles)} />
            <div className={cn('absolute right-6 top-12 size-2 rounded-full', styles.particles)} />
            <div className={cn('absolute right-4 top-20 size-1 rounded-full', styles.particles)} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3.5 rounded-2xl border border-border-subtle bg-surface-elevated/70 p-5 shadow-[0_6px_20px_#00663310]">
        <p className="font-mono text-[11px] font-medium tracking-[1.4px] text-brand-primary uppercase">
          {stage.stage}
        </p>
        <h3 className="font-heading text-2xl font-bold leading-tight tracking-tight text-text-primary">
          {stage.title}
        </h3>
        <p className="text-[13px] leading-relaxed text-text-secondary">{stage.description}</p>
        {stage.spec ? (
          <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-border-subtle bg-background/70 px-3 py-2">
            <span className="size-1.5 rounded-full bg-brand-primary" aria-hidden />
            <span className="font-mono text-[10px] font-medium tracking-[1.2px] text-text-primary uppercase">
              {stage.spec}
            </span>
          </div>
        ) : null}
      </div>
    </article>
  );
}
