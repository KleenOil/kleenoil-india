import Image from 'next/image';

import { Eyebrow } from '@/components/ui/eyebrow';
import { DEFAULT_CAREERS_HERO, DEFAULT_JOBS } from '@/lib/cms/defaults';
import { getPublishedJobs } from '@/lib/cms/jobs';
import { getMediaAlt, getMediaUrl } from '@/lib/cms/links';
import type { Media } from '@/payload-types';

export type CareersHeroBlockData = {
  blockType: 'careers-hero';
  eyebrow?: string | null;
  heading?: string | null;
  subheadline?: string | null;
  cities?: string | null;
  image?: number | Media | null;
};

type CareersHeroBlockProps = {
  block?: CareersHeroBlockData | null;
  openRoles?: number;
};

export async function CareersHeroBlock({ block, openRoles }: CareersHeroBlockProps) {
  const eyebrow = block?.eyebrow || DEFAULT_CAREERS_HERO.eyebrow;
  const heading = block?.heading || DEFAULT_CAREERS_HERO.heading;
  const subheadline = block?.subheadline || DEFAULT_CAREERS_HERO.subheadline;
  const cities = block?.cities || DEFAULT_CAREERS_HERO.cities;
  const imageUrl = getMediaUrl(block?.image) || DEFAULT_CAREERS_HERO.imageUrl;
  const imageAlt = getMediaAlt(block?.image, 'Kleenoil workshop floor');
  const published = await getPublishedJobs();
  const visible = published.filter((job) => job.showOnCareers !== false);
  const count =
    typeof openRoles === 'number'
      ? openRoles
      : visible.length > 0
        ? visible.length
        : published.length > 0
          ? 0
          : DEFAULT_JOBS.length;
  const displayCount = String(Math.max(count, 0)).padStart(2, '0');

  return (
    <section className="relative isolate h-[520px] overflow-hidden lg:h-[600px]">
      {imageUrl ? (
        <Image src={imageUrl} alt={imageAlt} fill priority className="object-cover" sizes="100vw" />
      ) : (
        <div className="absolute inset-0 bg-brand-deep" aria-hidden />
      )}

      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, #003319F2 0%, #00331999 48%, #00331933 100%)',
        }}
      />
      <div aria-hidden className="absolute inset-y-0 left-0 w-3 bg-brand-primary" />

      <div className="relative mx-auto flex h-full w-full max-w-[1440px] items-center justify-between gap-10 px-6 py-16 lg:px-[100px]">
        <div data-reveal-panel className="max-w-[720px]">
          <div data-reveal-target>
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <h1
            data-reveal-target
            className="mt-6 font-heading text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-white md:text-5xl lg:text-[56px] lg:tracking-[-0.045em]"
          >
            {heading.split('\n').map((line, index) => (
              <span key={`${line}-${index}`} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p
            data-reveal-target
            className="mt-5 max-w-[640px] text-base font-semibold leading-relaxed text-brand-soft md:text-lg"
          >
            {subheadline}
          </p>
        </div>

        <div
          data-reveal-target
          className="hidden w-[300px] shrink-0 rounded-2xl border border-white/20 bg-[#003319CC] p-7 lg:block"
        >
          <p className="font-heading text-[72px] leading-none font-bold tracking-[-0.06em] text-white">
            {displayCount}
          </p>
          <p className="mt-2 font-mono text-[12px] font-bold tracking-[2px] text-brand-soft uppercase">
            Open roles
          </p>
          <p className="mt-4 text-[13px] leading-relaxed text-brand-soft">{cities}</p>
        </div>
      </div>
    </section>
  );
}
