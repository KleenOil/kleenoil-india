'use client';

import { useState } from 'react';

type FluidItem = { label: string };

type FluidsFlowSvgProps = {
  items: FluidItem[];
  activeIndex: number | null;
  onActiveChange: (index: number | null) => void;
};

const STATIONS = [70, 250, 430, 610, 790, 970];

export function FluidsFlowSvg({ items, activeIndex, onActiveChange }: FluidsFlowSvgProps) {
  const [hover, setHover] = useState<number | null>(null);
  const lit = hover ?? activeIndex;

  return (
    <svg viewBox="0 0 1040 120" className="h-auto w-full overflow-visible" aria-hidden>
      <path
        d="M20 60 H1020"
        className="services-oil-dash"
        stroke="currentColor"
        strokeOpacity="0.28"
        strokeWidth="2"
        strokeDasharray="10 12"
      />
      <circle r="7" fill="currentColor" className="services-oil-bead">
        <animateMotion dur="7.5s" repeatCount="indefinite">
          <mpath href="#services-fluids-path" />
        </animateMotion>
      </circle>
      <path id="services-fluids-path" d="M20 60 H1020" className="opacity-0" />

      {STATIONS.map((x, index) => {
        const on = lit === index;
        return (
          <g
            key={items[index]?.label ?? index}
            className="cursor-pointer"
            onMouseEnter={() => {
              setHover(index);
              onActiveChange(index);
            }}
            onMouseLeave={() => {
              setHover(null);
              onActiveChange(null);
            }}
          >
            <circle
              cx={x}
              cy="60"
              r={on ? 18 : 14}
              fill={on ? 'currentColor' : 'transparent'}
              fillOpacity={on ? 0.22 : 1}
              stroke="currentColor"
              strokeOpacity={on ? 0.9 : 0.45}
              strokeWidth="1.5"
              className="transition-all duration-300"
            />
            <circle cx={x} cy="60" r="4" fill="currentColor" fillOpacity={on ? 1 : 0.7} />
          </g>
        );
      })}
    </svg>
  );
}
