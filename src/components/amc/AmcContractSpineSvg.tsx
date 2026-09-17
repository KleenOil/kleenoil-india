'use client';

type AmcContractSpineSvgProps = {
  count: number;
  activeIndex?: number | null;
};

export function AmcContractSpineSvg({ count, activeIndex = null }: AmcContractSpineSvgProps) {
  const height = Math.max(count * 120, 120);
  const nodes = Array.from({ length: count }, (_, index) => {
    const span = Math.max(count - 1, 1);
    return 24 + (index * (height - 48)) / span;
  });

  return (
    <svg
      viewBox={`0 0 24 ${height}`}
      className="hidden h-full w-6 shrink-0 overflow-visible lg:block"
      aria-hidden
    >
      <path
        d={`M12 12 V${height - 12}`}
        className="amc-oil-dash"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="1.5"
        strokeDasharray="6 8"
      />
      <circle r="4" fill="currentColor">
        <animateMotion dur={`${3.2 + count * 0.6}s`} repeatCount="indefinite">
          <mpath href="#amc-contract-path" />
        </animateMotion>
      </circle>
      <path id="amc-contract-path" d={`M12 12 V${height - 12}`} className="opacity-0" />
      {nodes.map((y, index) => {
        const on = activeIndex === index;
        return (
          <circle
            key={y}
            cx="12"
            cy={y}
            r={on ? 8 : 5}
            fill="currentColor"
            fillOpacity={on ? 0.28 : 0.1}
            stroke="currentColor"
            strokeOpacity={on ? 1 : 0.45}
            className="transition-all duration-300"
          />
        );
      })}
    </svg>
  );
}
