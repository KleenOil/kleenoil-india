import { cn } from '@/lib/utils';

type ParallaxMediaProps = {
  children: React.ReactNode;
  className?: string;
  /** Scroll shift amount for CSS/JS parallax (0.06–0.12). Only used when enabled. */
  strength?: number;
  /** Opt-in — keep false/off except Hero + Featured Industries */
  enabled?: boolean;
};

/**
 * Overflow-clipped media frame.
 * When `enabled`, uses CSS scroll-driven parallax (zero scroll JS in modern browsers).
 */
export function ParallaxMedia({
  children,
  className,
  strength = 0.1,
  enabled = false,
}: ParallaxMediaProps) {
  if (!enabled) {
    return <div className={cn('relative overflow-hidden', className)}>{children}</div>;
  }

  return (
    <div
      data-parallax-media
      data-parallax-strength={strength}
      className={cn('relative overflow-hidden', className)}
    >
      <div
        data-parallax-inner
        className="absolute inset-x-0 -top-[14%] -bottom-[14%] will-change-transform"
      >
        <div className="relative h-full w-full">{children}</div>
      </div>
    </div>
  );
}
