import Image from 'next/image';

import { blockHasCmsData, cmsList, cmsText } from '@/lib/cms/block-content';
import { getMediaAlt, getMediaUrl } from '@/lib/cms/links';
import { DEFAULT_SERVICES_INDUSTRIES } from '@/lib/cms/services';
import type { Media } from '@/payload-types';

type PhotoItem = { label?: string | null; image?: number | Media | null };
type ChipItem = { label?: string | null };

export type ServicesIndustriesBlockData = {
  blockType: 'services-industries';
  kicker?: string | null;
  heading?: string | null;
  photos?: PhotoItem[] | null;
  chips?: ChipItem[] | null;
};

export function ServicesIndustriesBlock({ block }: { block?: ServicesIndustriesBlockData | null }) {
  const defaults = DEFAULT_SERVICES_INDUSTRIES;
  const hasCms = blockHasCmsData(block);
  const kicker = cmsText(block?.kicker, defaults.kicker, hasCms);
  const heading = cmsText(block?.heading, defaults.heading, hasCms);
  const photos = cmsList(
    block?.photos?.map((photo, index) => {
      const fallback = hasCms ? undefined : defaults.photos[index];
      if (!photo.label?.trim()) return null;
      return {
        label: photo.label.trim(),
        imageUrl: getMediaUrl(photo.image) || fallback?.imageUrl || null,
        imageAlt: getMediaAlt(photo.image, photo.label),
      };
    }),
    defaults.photos,
    hasCms,
    (photo) => Boolean(photo.label),
  );
  const chips = cmsList(
    block?.chips?.map((chip) => chip.label?.trim() || '').filter(Boolean),
    defaults.chips,
    hasCms,
    (label) => Boolean(label),
  );

  return (
    <section className="bg-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-6 py-16 lg:px-[100px] lg:py-20">
        {kicker ? (
          <p
            data-reveal-part
            className="font-mono text-[12px] font-bold tracking-[1.8px] text-brand-primary uppercase"
          >
            {kicker}
          </p>
        ) : null}
        {heading ? (
          <h2
            data-reveal-part
            className="max-w-[880px] font-heading text-[1.5rem] font-bold leading-[1.15] tracking-[-0.03em] text-text-primary md:text-[28px]"
          >
            {heading}
          </h2>
        ) : null}

        {photos.length ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {photos.map((photo) => (
              <figure
                key={photo.label}
                data-reveal-item
                className="relative h-[180px] overflow-hidden rounded-xl"
              >
                {photo.imageUrl ? (
                  <Image
                    src={photo.imageUrl}
                    alt={photo.imageAlt || photo.label}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 25vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-surface" />
                )}
                <figcaption className="sr-only">{photo.label}</figcaption>
              </figure>
            ))}
          </div>
        ) : null}

        {chips.length ? (
          <div className="flex flex-wrap gap-2.5">
            {chips.map((chip) => (
              <span
                key={chip}
                data-reveal-item
                className="rounded-full border border-border-subtle bg-white/40 px-4 py-2 font-heading text-[13px] font-semibold text-text-primary"
              >
                {chip}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
