'use client';

import { cn } from '@/lib/utils';
import { INDIA_MAP_PATH } from '@/components/maps/indiaMapPath';

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

/** Pin positions in viewBox 0 0 1000 1000 (SimpleMaps-style India outline). */
export const CITY_MAP_COORDS: Record<string, { x: number; y: number }> = {
  gurgaon: { x: 334, y: 273 },
  delhi: { x: 339, y: 268 },
  'new delhi': { x: 339, y: 268 },
  ncr: { x: 334, y: 273 },
  mumbai: { x: 213, y: 569 },
  pune: { x: 241, y: 586 },
  bangalore: { x: 350, y: 761 },
  bengaluru: { x: 350, y: 761 },
  chennai: { x: 428, y: 758 },
  kolkata: { x: 663, y: 459 },
  hyderabad: { x: 376, y: 622 },
  ahmedabad: { x: 204, y: 445 },
  jaipur: { x: 298, y: 322 },
  chandigarh: { x: 326, y: 201 },
  lucknow: { x: 448, y: 324 },
  indore: { x: 300, y: 454 },
  coimbatore: { x: 332, y: 823 },
  kochi: { x: 312, y: 857 },
  vizag: { x: 514, y: 613 },
  visakhapatnam: { x: 514, y: 613 },
};

export function resolveCityCoords(
  city: string,
  mapX?: number | null,
  mapY?: number | null,
): { x: number; y: number } {
  if (typeof mapX === 'number' && typeof mapY === 'number') {
    // CMS 0–100 values → 1000×1000 viewBox; absolute values pass through
    const scaledX = mapX <= 100 ? (mapX / 100) * 1000 : mapX;
    const scaledY = mapY <= 100 ? (mapY / 100) * 1000 : mapY;
    return { x: scaledX, y: scaledY };
  }

  const key = city.trim().toLowerCase();
  return CITY_MAP_COORDS[key] ?? { x: 401, y: 473 };
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
        viewBox="0 0 1000 1000"
        className="h-full w-full flex-1 select-none"
        role="img"
        aria-label="Kleenoil distribution network across India"
        onClick={(event) => {
          // Clicks on empty map / land do nothing — only pins select.
          event.preventDefault();
        }}
        style={{ touchAction: 'none' }}
      >
        <rect width="1000" height="1000" fill="#D8E8DE" pointerEvents="none" />

        <path
          d={INDIA_MAP_PATH}
          fill="#6f9c76"
          stroke="#ffffff"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
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
                  strokeOpacity="0.2"
                  strokeWidth="2.5"
                  strokeDasharray="8 6"
                  pointerEvents="none"
                />
              ))
          : null}

        {pins.map((pin) => {
          const isActive = activeCity?.toLowerCase() === pin.city.toLowerCase();
          const isHq = pin.kind === 'hq';
          const baseRadius = isHq ? 14 : pin.kind === 'partner' ? 10 : 12;

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
              {/* Larger invisible hit target — no other map chrome is clickable */}
              <circle cx={pin.x} cy={pin.y} r="36" fill="transparent" />

              {isActive ? (
                <>
                  <circle cx={pin.x} cy={pin.y} r="40" fill="none" stroke="#006633" strokeWidth="3">
                    <animate
                      attributeName="r"
                      values="18;48;18"
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
                  <circle cx={pin.x} cy={pin.y} r="28" fill="none" stroke="#006633" strokeWidth="3">
                    <animate
                      attributeName="r"
                      values="14;36;14"
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
                    r="20"
                    fill="none"
                    stroke="#006633"
                    strokeOpacity="0.35"
                    strokeWidth="2.5"
                  />
                </>
              ) : null}

              <circle
                cx={pin.x}
                cy={pin.y}
                r={isActive ? baseRadius + 2 : baseRadius}
                fill={pin.kind === 'partner' ? '#80B690' : '#006633'}
                stroke="#EBF2EE"
                strokeWidth="3.5"
              />

              {isActive ? (
                <text
                  x={pin.x}
                  y={pin.y - 42}
                  textAnchor="middle"
                  fill="#003319"
                  fontSize="32"
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
