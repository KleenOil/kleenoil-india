'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

import {
  IndiaNetworkMap,
  resolveCityCoords,
  type MapPinKind,
  type NetworkMapPin,
} from '@/components/maps/IndiaNetworkMap';
import { cn } from '@/lib/utils';

export type DistributionOffice = {
  city: string;
  region: string;
  kind: MapPinKind;
  mapX?: number | null;
  mapY?: number | null;
  mapsUrl?: string | null;
};

type DistributionNetworkInteractiveProps = {
  offices: DistributionOffice[];
  stats: Array<{ value: string; label: string }>;
  showMap?: boolean;
  mapImageUrl?: string | null;
  mapImageAlt?: string;
};

export function DistributionNetworkInteractive({
  offices,
  stats,
  showMap = true,
  mapImageUrl,
  mapImageAlt = 'Kleenoil distribution network map',
}: DistributionNetworkInteractiveProps) {
  const initialCity =
    offices.find((office) => office.kind === 'hq')?.city ?? offices[0]?.city ?? null;
  const [activeCity, setActiveCity] = useState<string | null>(initialCity);

  const pins: NetworkMapPin[] = offices.map((office, index) => {
    const coords = resolveCityCoords(office.city, office.mapX, office.mapY);
    return {
      id: `${office.city}-${index}`,
      city: office.city,
      kind: office.kind,
      x: coords.x,
      y: coords.y,
    };
  });

  const useStaticMap = Boolean(mapImageUrl);

  return (
    <div
      className={cn(
        'grid gap-8 lg:gap-10',
        showMap ? 'lg:grid-cols-[1.15fr_0.85fr]' : 'lg:grid-cols-1',
      )}
    >
      {showMap ? (
        useStaticMap ? (
          <div
            data-reveal-part
            className="relative min-h-[320px] overflow-hidden rounded-2xl border border-border-subtle bg-brand-soft lg:min-h-[480px]"
          >
            <Image
              src={mapImageUrl!}
              alt={mapImageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>
        ) : (
          <div data-reveal-part>
            <IndiaNetworkMap pins={pins} activeCity={activeCity} onSelect={setActiveCity} />
          </div>
        )
      ) : null}

      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div
              key={`${stat.value}-${stat.label}`}
              data-reveal-part
              className="rounded-2xl border border-border-subtle bg-background p-6"
            >
              <p className="font-heading text-3xl font-bold tracking-[-0.04em] text-text-primary lg:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 font-mono text-[11px] font-bold tracking-[1.4px] text-text-tertiary uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <p className="font-mono text-[11px] font-bold tracking-[2px] text-brand-primary uppercase">
            Regional hubs
          </p>
          <ul className={cn('grid gap-3 sm:grid-cols-2', showMap && 'lg:grid-cols-1')}>
            {offices.map((office) => {
              const isActive = activeCity?.toLowerCase() === office.city.toLowerCase();
              const mapsUrl = office.mapsUrl?.trim() || null;

              return (
                <li key={`${office.city}-${office.region}`}>
                  <div
                    data-reveal-part
                    className={cn(
                      'flex w-full items-center justify-between gap-3 rounded-xl border bg-background px-4 py-3 transition-colors',
                      isActive
                        ? 'border-brand-primary shadow-[0_0_0_1px_#00663333]'
                        : 'border-border-subtle hover:border-brand-primary/50',
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveCity(office.city)}
                      className="flex min-w-0 flex-1 items-start gap-3 text-left"
                    >
                      <span
                        aria-hidden
                        className={cn(
                          'mt-1.5 size-2 shrink-0 rounded-full',
                          office.kind === 'partner' ? 'bg-border-strong' : 'bg-brand-primary',
                          office.kind === 'hq' && 'ring-2 ring-brand-primary/35',
                        )}
                      />
                      <div className="min-w-0">
                        <p className="font-heading text-sm font-bold text-text-primary">
                          {office.city}
                        </p>
                        <p className="text-xs text-text-secondary">{office.region}</p>
                      </div>
                    </button>

                    {mapsUrl ? (
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open directions to ${office.city} in Google Maps`}
                        className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-brand-primary transition-colors hover:bg-brand-soft hover:text-text-primary"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <ExternalLink className="size-4" strokeWidth={2.25} aria-hidden />
                      </a>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
