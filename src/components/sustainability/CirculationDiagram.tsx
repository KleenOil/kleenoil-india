import { Droplet, Hourglass, Layers, Recycle, RefreshCw } from 'lucide-react';

import { DEFAULT_SUSTAINABILITY_CIRCULAR } from '@/lib/cms/sustainability';
import { cn } from '@/lib/utils';

const ICONS = {
  layers: Layers,
  refresh: RefreshCw,
  droplet: Droplet,
  hourglass: Hourglass,
  recycle: Recycle,
} as const;

/** Card top-left in the 560×560 Pencil frame. */
const CARD_LAYOUT: Record<string, { x: number; y: number; w: number }> = {
  Filter: { x: 216, y: 10, w: 128 },
  'Filter Again': { x: 0, y: 200, w: 148 },
  Clean: { x: 432, y: 200, w: 128 },
  Extend: { x: 92, y: 452, w: 128 },
  Reuse: { x: 340, y: 452, w: 128 },
};

type CycleItem = (typeof DEFAULT_SUSTAINABILITY_CIRCULAR.cycle)[number];

type CirculationDiagramProps = {
  items?: CycleItem[];
  className?: string;
};

export function CirculationDiagram({
  items = DEFAULT_SUSTAINABILITY_CIRCULAR.cycle,
  className,
}: CirculationDiagramProps) {
  return (
    <div
      className={cn(
        'relative mx-auto aspect-square w-full max-w-[560px] shrink-0 overflow-visible text-brand-soft',
        className,
      )}
    >
      <svg
        viewBox="0 0 560 560"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden
      >
        <g className="sustain-ring-spin-slow origin-center">
          <circle
            cx="280"
            cy="280"
            r="220"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.32"
            strokeWidth="1.25"
          />
        </g>
        <circle
          cx="280"
          cy="280"
          r="194"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.16"
          strokeWidth="0.75"
        />
        <g className="sustain-ring-spin-rev origin-center">
          <circle
            cx="280"
            cy="280"
            r="170"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.24"
            strokeWidth="1"
          />
        </g>
        <circle
          cx="280"
          cy="280"
          r="146"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.12"
          strokeWidth="0.75"
          strokeDasharray="3 10"
          className="sustain-ring-dash origin-center"
        />
        <circle
          cx="280"
          cy="280"
          r="122"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="1"
        />
        <g className="sustain-ring-spin origin-center">
          {Array.from({ length: 8 }, (_, index) => {
            const angle = (index / 8) * Math.PI * 2 - Math.PI / 2;
            return (
              <circle
                key={index}
                cx={280 + Math.cos(angle) * 220}
                cy={280 + Math.sin(angle) * 220}
                r="3"
                fill="currentColor"
                className="sustain-tick"
                style={{ animationDelay: `${index * 0.28}s` }}
              />
            );
          })}
        </g>
        <circle
          cx="280"
          cy="60"
          r="4.5"
          fill="#7CDBA6"
          className="sustain-orbit origin-center"
          style={{ transformOrigin: '280px 280px' }}
        />
        <text
          x="280"
          y="268"
          textAnchor="middle"
          fill="currentColor"
          fillOpacity="0.7"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 1.6,
          }}
        >
          OIL IN
        </text>
        <text
          x="280"
          y="294"
          textAnchor="middle"
          fill="#ffffff"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: -0.6,
          }}
        >
          Circulation
        </text>
      </svg>

      {items.map((item, index) => {
        const Icon = ICONS[item.icon];
        const layout = CARD_LAYOUT[item.label] ?? { x: 216, y: 10, w: 128 };

        return (
          <div
            key={item.label}
            className="absolute flex flex-col items-center gap-2 rounded-[14px] border border-white/20 bg-white/10 px-[18px] py-3.5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-md sustain-card-float"
            style={{
              left: `${(layout.x / 560) * 100}%`,
              top: `${(layout.y / 560) * 100}%`,
              width: `${(layout.w / 560) * 100}%`,
              animationDelay: `${index * 0.18}s`,
            }}
          >
            <span className="flex size-7 items-center justify-center rounded-full border border-white/20 bg-white/15 text-brand-soft">
              <Icon className="size-3.5" aria-hidden />
            </span>
            <span className="whitespace-nowrap text-center font-heading text-xs font-bold tracking-[-0.02em]">
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
