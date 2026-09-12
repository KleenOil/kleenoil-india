'use client';

import { cn } from '@/lib/utils';

export type MapPinKind = 'hq' | 'hub' | 'partner';

export type NetworkMapPin = {
  id: string;
  city: string;
  kind: MapPinKind;
  x: number;
  y: number;
};

type IndiaNetworkMapProps = {
  pins: NetworkMapPin[];
  activeCity?: string | null;
  onSelect?: (city: string) => void;
  className?: string;
};

/** Wikipedia India-map-en.svg canvas. */
export const INDIA_MAP_VIEWBOX = { width: 1519, height: 1773 } as const;

const MAP_SRC = '/maps/india-states.svg';

/** Pin positions in the 1519×1773 India-map-en.svg viewBox. */
export const CITY_MAP_COORDS: Record<string, { x: number; y: number }> = {
  gurgaon: { x: 490, y: 560 },
  delhi: { x: 508, y: 548 },
  'new delhi': { x: 508, y: 548 },
  ncr: { x: 490, y: 560 },
  mumbai: { x: 272, y: 1118 },
  pune: { x: 345, y: 1158 },
  bangalore: { x: 422, y: 1408 },
  bengaluru: { x: 422, y: 1408 },
  chennai: { x: 578, y: 1488 },
  kolkata: { x: 1042, y: 898 },
  hyderabad: { x: 558, y: 1168 },
  ahmedabad: { x: 278, y: 868 },
  jaipur: { x: 378, y: 598 },
  chandigarh: { x: 493, y: 431 },
  lucknow: { x: 678, y: 678 },
  indore: { x: 398, y: 898 },
  coimbatore: { x: 398, y: 1528 },
  kochi: { x: 328, y: 1612 },
  vizag: { x: 748, y: 1188 },
  visakhapatnam: { x: 748, y: 1188 },
};

export function resolveCityCoords(
  city: string,
  mapX?: number | null,
  mapY?: number | null,
): { x: number; y: number } {
  if (typeof mapX === 'number' && typeof mapY === 'number') {
    const scaledX = mapX <= 100 ? (mapX / 100) * INDIA_MAP_VIEWBOX.width : mapX;
    const scaledY = mapY <= 100 ? (mapY / 100) * INDIA_MAP_VIEWBOX.height : mapY;
    return { x: scaledX, y: scaledY };
  }

  const key = city.trim().toLowerCase();
  return CITY_MAP_COORDS[key] ?? { x: 560, y: 920 };
}

export function IndiaNetworkMap({ pins, activeCity, onSelect, className }: IndiaNetworkMapProps) {
  const hq = pins.find((pin) => pin.kind === 'hq') ?? pins[0] ?? null;

  return (
    <div
      className={cn(
        'relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-2xl border border-border-subtle bg-[#D8E8DE] lg:min-h-[480px]',
        className,
      )}
    >
      <svg
        viewBox={`0 0 ${INDIA_MAP_VIEWBOX.width} ${INDIA_MAP_VIEWBOX.height}`}
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full flex-1 select-none"
        role="img"
        aria-label="Kleenoil distribution network across India"
        onClick={(event) => {
          event.preventDefault();
        }}
        style={{ touchAction: 'none' }}
      >
        <rect
          width={INDIA_MAP_VIEWBOX.width}
          height={INDIA_MAP_VIEWBOX.height}
          fill="#D8E8DE"
          pointerEvents="none"
        />

        <image
          href={MAP_SRC}
          width={INDIA_MAP_VIEWBOX.width}
          height={INDIA_MAP_VIEWBOX.height}
          pointerEvents="none"
        />

        {hq
          ? pins
              .filter((pin) => pin.id !== hq.id)
              .map((pin) => (
                <line
                  key={`spoke-${pin.id}`}
                  x1={hq.x}
                  y1={hq.y}
                  x2={pin.x}
                  y2={pin.y}
                  stroke="#006633"
                  strokeOpacity="0.22"
                  strokeWidth="3.5"
                  strokeDasharray="12 9"
                  pointerEvents="none"
                />
              ))
          : null}

        {pins.map((pin) => {
          const isActive = activeCity?.toLowerCase() === pin.city.toLowerCase();
          const isHq = pin.kind === 'hq';
          const baseRadius = isHq ? 22 : pin.kind === 'partner' ? 16 : 19;

          return (
            <g
              key={pin.id}
              className="cursor-pointer outline-none"
              onClick={(event) => {
                event.stopPropagation();
                onSelect?.(pin.city);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  event.stopPropagation();
                  onSelect?.(pin.city);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Select ${pin.city}`}
              aria-pressed={isActive}
            >
              <circle cx={pin.x} cy={pin.y} r="52" fill="transparent" />

              {isActive ? (
                <>
                  <circle cx={pin.x} cy={pin.y} r="62" fill="none" stroke="#006633" strokeWidth="4">
                    <animate
                      attributeName="r"
                      values="28;72;28"
                      dur="2.2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="stroke-opacity"
                      values="0.5;0;0.5"
                      dur="2.2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx={pin.x} cy={pin.y} r="44" fill="none" stroke="#006633" strokeWidth="4">
                    <animate
                      attributeName="r"
                      values="22;56;22"
                      dur="2.2s"
                      begin="0.35s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="stroke-opacity"
                      values="0.55;0.05;0.55"
                      dur="2.2s"
                      begin="0.35s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle
                    cx={pin.x}
                    cy={pin.y}
                    r="32"
                    fill="none"
                    stroke="#006633"
                    strokeOpacity="0.35"
                    strokeWidth="3.5"
                  />
                </>
              ) : null}

              <circle
                cx={pin.x}
                cy={pin.y}
                r={isActive ? baseRadius + 3 : baseRadius}
                fill={pin.kind === 'partner' ? '#80B690' : '#006633'}
                stroke="#EBF2EE"
                strokeWidth="5"
              />

              {isActive ? (
                <text
                  x={pin.x}
                  y={pin.y - 64}
                  textAnchor="middle"
                  fill="#003319"
                  fontSize="48"
                  fontWeight="700"
                  fontFamily="var(--font-family-heading), sans-serif"
                  pointerEvents="none"
                >
                  {pin.city}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>

      <div className="flex flex-wrap items-center gap-4 border-t border-border-subtle/70 bg-background/80 px-4 py-3 backdrop-blur-sm">
        <LegendDot label="Headquarters" tone="hq" />
        <LegendDot label="Regional Hub" tone="hub" />
        <LegendDot label="Partner / Service" tone="partner" />
      </div>
    </div>
  );
}

function LegendDot({ label, tone }: { label: string; tone: MapPinKind }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[10px] font-bold tracking-[1.2px] text-text-secondary uppercase">
      <span
        aria-hidden
        className={cn(
          'size-2.5 rounded-full',
          tone === 'hq' && 'bg-brand-primary ring-2 ring-brand-primary/30',
          tone === 'hub' && 'bg-brand-primary',
          tone === 'partner' && 'bg-border-strong',
        )}
      />
      {label}
    </span>
  );
}
