import Image from 'next/image';

import {
  DistributionNetworkInteractive,
  type DistributionOffice,
} from '@/blocks/DistributionNetwork/Interactive';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { DEFAULT_DISTRIBUTION_NETWORK } from '@/lib/cms/defaults';
import { getMediaAlt, getMediaUrl } from '@/lib/cms/links';
import type { Media } from '@/payload-types';
import type { MapPinKind } from '@/components/maps/IndiaNetworkMap';

type StatItem = {
  value?: string | null;
  label?: string | null;
};

type OfficeItem = {
  city?: string | null;
  region?: string | null;
  kind?: MapPinKind | null;
  mapX?: number | null;
  mapY?: number | null;
  mapsUrl?: string | null;
};

type HqGroup = {
  label?: string | null;
  title?: string | null;
  address?: string | null;
  phone?: string | null;
  mobile?: string | null;
  email?: string | null;
};

export type DistributionNetworkBlockData = {
  blockType: 'distribution-network';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  showMap?: boolean | null;
  mapImage?: number | Media | null;
  stats?: StatItem[] | null;
  regionalOffices?: OfficeItem[] | null;
  hq?: HqGroup | null;
  hqImage?: number | Media | null;
};

type DistributionNetworkBlockProps = {
  block?: DistributionNetworkBlockData | null;
};

function resolveOffices(items: OfficeItem[] | null | undefined): DistributionOffice[] {
  const cmsOffices =
    items
      ?.filter((office) => office.city && office.region)
      .map((office) => ({
        city: office.city!,
        region: office.region!,
        kind: (office.kind ?? 'hub') as MapPinKind,
        mapX: office.mapX,
        mapY: office.mapY,
        mapsUrl: office.mapsUrl,
      })) ?? [];

  if (cmsOffices.length > 0) {
    const hasHq = cmsOffices.some((office) => office.kind === 'hq');
    if (!hasHq) {
      return cmsOffices.map((office, index) =>
        index === 0 ? { ...office, kind: 'hq' as const } : office,
      );
    }
    return cmsOffices;
  }

  return DEFAULT_DISTRIBUTION_NETWORK.regionalOffices.map((office) => ({
    city: office.city,
    region: office.region,
    kind: office.kind,
    mapsUrl: office.mapsUrl,
  }));
}

export function DistributionNetworkBlock({ block }: DistributionNetworkBlockProps) {
  const eyebrow = block?.eyebrow || DEFAULT_DISTRIBUTION_NETWORK.eyebrow;
  const heading = block?.heading || DEFAULT_DISTRIBUTION_NETWORK.heading;
  const description = block?.description || DEFAULT_DISTRIBUTION_NETWORK.description;

  const stats = block?.stats?.filter((stat) => stat.value && stat.label)?.length
    ? block.stats
        .filter((stat) => stat.value && stat.label)
        .map((stat) => ({ value: stat.value!, label: stat.label! }))
    : DEFAULT_DISTRIBUTION_NETWORK.stats;

  const offices = resolveOffices(block?.regionalOffices);

  const hq = {
    label: block?.hq?.label || DEFAULT_DISTRIBUTION_NETWORK.hq.label,
    title: block?.hq?.title || DEFAULT_DISTRIBUTION_NETWORK.hq.title,
    address: block?.hq?.address || DEFAULT_DISTRIBUTION_NETWORK.hq.address,
    phone: block?.hq?.phone || DEFAULT_DISTRIBUTION_NETWORK.hq.phone,
    mobile: block?.hq?.mobile || DEFAULT_DISTRIBUTION_NETWORK.hq.mobile,
    email: block?.hq?.email || DEFAULT_DISTRIBUTION_NETWORK.hq.email,
  };

  const mapImageUrl = getMediaUrl(block?.mapImage);
  const mapImageAlt = getMediaAlt(block?.mapImage, 'Kleenoil distribution network map');
  const hqImageUrl = getMediaUrl(block?.hqImage) || DEFAULT_DISTRIBUTION_NETWORK.hqImageUrl;
  const hqImageAlt = getMediaAlt(block?.hqImage, 'Kleenoil headquarters');

  const contacts = [
    { label: 'Phone', value: hq.phone },
    { label: 'Mobile', value: hq.mobile },
    { label: 'Email', value: hq.email },
  ].filter((item) => item.value);

  return (
    <section className="border-b border-border-subtle bg-surface">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-14 px-6 py-16 lg:gap-20 lg:px-[100px] lg:py-[120px]">
        <SectionHeader eyebrow={eyebrow} heading={heading} description={description} />

        <DistributionNetworkInteractive
          offices={offices}
          stats={stats}
          showMap={block?.showMap !== false}
          mapImageUrl={mapImageUrl}
          mapImageAlt={mapImageAlt}
        />

        <div className="grid gap-8 overflow-hidden rounded-2xl border border-border-subtle bg-background lg:grid-cols-2">
          <div data-reveal-part className="relative min-h-[280px] lg:min-h-full">
            <Image
              src={hqImageUrl}
              alt={hqImageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="flex flex-col gap-6 p-8 lg:p-12">
            <div className="flex flex-col gap-3">
              <p className="font-mono text-[11px] font-bold tracking-[2px] text-brand-primary uppercase">
                {hq.label}
              </p>
              <h3 className="font-heading text-3xl font-bold tracking-[-0.04em] text-text-primary">
                {hq.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-text-secondary">{hq.address}</p>
            </div>

            <dl className="divide-y divide-border-subtle border-t border-border-subtle">
              {contacts.map((item) => (
                <div key={item.label} className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="font-mono text-[11px] font-bold tracking-[1.4px] text-text-tertiary uppercase">
                    {item.label}
                  </dt>
                  <dd className="text-right text-sm font-semibold text-text-primary">
                    {item.label === 'Email' ? (
                      <a href={`mailto:${item.value}`} className="hover:text-brand-primary">
                        {item.value}
                      </a>
                    ) : item.label === 'Phone' || item.label === 'Mobile' ? (
                      <a
                        href={`tel:${item.value?.replace(/\s/g, '')}`}
                        className="hover:text-brand-primary"
                      >
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
