import { cn } from '@/lib/utils';

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 rounded-full border border-brand-dim bg-brand-soft/75 px-4 py-2 font-mono text-xs font-bold tracking-[1.8px] text-brand-primary uppercase',
        className,
      )}
    >
      <span className="size-2 rounded-full bg-brand-primary" aria-hidden />
      {children}
    </span>
  );
}
