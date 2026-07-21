import { cn } from '@/lib/utils';

type RevealVariant = 'hero' | 'section' | 'cta';

type RevealSectionProps = {
  children: React.ReactNode;
  variant?: RevealVariant;
  stagger?: boolean;
  className?: string;
};

/**
 * Marks a homepage block for GSAP reveals (IntersectionObserver-triggered).
 * Content stays server-rendered; motion is applied client-side via HomepageMotion.
 */
export function RevealSection({
  children,
  variant = 'section',
  stagger = false,
  className,
}: RevealSectionProps) {
  return (
    <div
      data-reveal={variant}
      data-reveal-stagger={stagger ? 'true' : undefined}
      className={cn('reveal-section', className)}
    >
      {children}
    </div>
  );
}
