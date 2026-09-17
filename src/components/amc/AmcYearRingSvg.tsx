'use client';

type AmcYearRingSvgProps = {
  activeIndex?: number | null;
};

const QUARTERS = [
  { label: 'Q1', rotate: -90 },
  { label: 'Q2', rotate: 0 },
  { label: 'Q3', rotate: 90 },
  { label: 'Q4', rotate: 180 },
];

export function AmcYearRingSvg({ activeIndex = null }: AmcYearRingSvgProps) {
  return (
    <svg viewBox="0 0 220 220" className="h-auto w-full overflow-visible" aria-hidden fill="none">
      <circle cx="110" cy="110" r="96" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1" />
      <circle
        cx="110"
        cy="110"
        r="72"
        className="amc-ring-spin origin-center"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="1.25"
        strokeDasharray="8 12"
      />
      <path
        id="amc-year-loop"
        d="M110 46 C142 46 164 74 164 110 C164 146 142 174 110 174 C78 174 56 146 56 110 C56 74 78 46 110 46"
        className="amc-oil-dash"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="1.5"
        strokeDasharray="8 14"
      />
      <circle r="5" fill="currentColor">
        <animateMotion dur="8s" repeatCount="indefinite" rotate="auto">
          <mpath href="#amc-year-loop" />
        </animateMotion>
      </circle>
      {QUARTERS.map((quarter, index) => {
        const on = activeIndex === index;
        const rad = ((quarter.rotate + 90) * Math.PI) / 180;
        const x = 110 + Math.cos(rad) * 88;
        const y = 110 + Math.sin(rad) * 88;
        return (
          <g key={quarter.label}>
            <circle
              cx={x}
              cy={y}
              r={on ? 14 : 10}
              fill={on ? 'currentColor' : 'transparent'}
              fillOpacity={on ? 0.22 : 1}
              stroke="currentColor"
              strokeOpacity={on ? 0.95 : 0.45}
              className="transition-all duration-300"
            />
            <text
              x={x}
              y={y + 3}
              textAnchor="middle"
              fill="currentColor"
              fontSize="8"
              fontWeight="700"
            >
              {quarter.label}
            </text>
          </g>
        );
      })}
      <circle cx="110" cy="110" r="18" fill="currentColor" fillOpacity="0.16" />
      <circle cx="110" cy="110" r="8" className="amc-core-pulse" fill="currentColor" />
    </svg>
  );
}
