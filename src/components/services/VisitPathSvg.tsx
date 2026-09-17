'use client';

type VisitPathSvgProps = {
  activeIndex?: number | null;
};

export function VisitPathSvg({ activeIndex = null }: VisitPathSvgProps) {
  const nodes = [80, 520, 960];

  return (
    <svg
      viewBox="0 0 1040 64"
      className="hidden h-auto w-full overflow-visible lg:block"
      aria-hidden
    >
      <path
        d="M80 32 H960"
        className="services-oil-dash"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="1.5"
        strokeDasharray="7 10"
      />
      <circle r="6" fill="currentColor">
        <animateMotion dur="5.8s" repeatCount="indefinite">
          <mpath href="#services-visit-path" />
        </animateMotion>
      </circle>
      <path id="services-visit-path" d="M80 32 H960" className="opacity-0" />
      {nodes.map((x, index) => {
        const on = activeIndex === index;
        return (
          <g key={x}>
            <circle
              cx={x}
              cy="32"
              r={on ? 12 : 8}
              fill="currentColor"
              fillOpacity={on ? 0.2 : 0.08}
              stroke="currentColor"
              strokeOpacity={on ? 0.95 : 0.45}
              className="transition-all duration-300"
            />
          </g>
        );
      })}
    </svg>
  );
}
