import { cn } from '@/lib/utils';

export function LatticeBg({
  className,
  patternId = 'kleenoil-lattice',
}: {
  className?: string;
  patternId?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 640 760"
      preserveAspectRatio="xMidYMid slice"
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
    >
      <defs>
        <pattern id={patternId} width="28" height="48" patternUnits="userSpaceOnUse">
          <path
            d="M14 0 L28 12 L14 24 L0 12 Z M14 24 L28 36 L14 48 L0 36 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
          />
        </pattern>
      </defs>
      <rect width="640" height="760" fill={`url(#${patternId})`} />
    </svg>
  );
}
