import { HeadingLines } from '@/components/sustainability/HeadingLines';
import { AmcHeroVisual } from '@/components/amc/AmcHeroVisual';
import { CtaButton } from '@/components/ui/cta-button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { blockHasCmsData, cmsList, cmsText } from '@/lib/cms/block-content';
import { getMediaAlt, getMediaUrl, resolveCtaList, type CmsLink } from '@/lib/cms/links';
import { DEFAULT_AMC_HERO } from '@/lib/cms/amc';
import type { Media } from '@/payload-types';

type PointItem = { n?: string | null; title?: string | null; body?: string | null };
type StatItem = { value?: string | null; label?: string | null };
type QuarterItem = { code?: string | null; label?: string | null };
type CtaItem = { link?: CmsLink | null };

export type AmcHeroBlockData = {
  blockType: 'amc-hero';
  eyebrow?: string | null;
  heading?: string | null;
  lead?: string | null;
  note?: string | null;
  ctas?: CtaItem[] | null;
  image?: number | Media | null;
  points?: PointItem[] | null;
  stats?: StatItem[] | null;
  quarters?: QuarterItem[] | null;
};

export function AmcHeroBlock({ block }: { block?: AmcHeroBlockData | null }) {
  const defaults = DEFAULT_AMC_HERO;
  const hasCms = blockHasCmsData(block);
  const eyebrow = cmsText(block?.eyebrow, defaults.eyebrow, hasCms);
  const heading = cmsText(block?.heading, defaults.heading, hasCms);
  const lead = cmsText(block?.lead, defaults.lead, hasCms);
  const note = cmsText(block?.note, defaults.note, hasCms);
  const ctas = resolveCtaList(block?.ctas, hasCms ? [] : [defaults.cta]);
  const points = cmsList(
    block?.points,
    defaults.points,
    hasCms,
    (item): item is PointItem & { n: string; title: string; body: string } =>
      Boolean(item.n && item.title && item.body),
  );
  const stats = cmsList(
    block?.stats,
    defaults.stats,
    hasCms,
    (item): item is StatItem & { value: string; label: string } =>
      Boolean(item.value && item.label),
  );
  const quarters = cmsList(
    block?.quarters,
    defaults.quarters,
    hasCms,
    (item): item is QuarterItem & { code: string; label: string } =>
      Boolean(item.code && item.label),
  );
  const imageUrl = cmsText(getMediaUrl(block?.image), defaults.imageUrl, hasCms);
  const imageAlt = getMediaAlt(block?.image, heading || (hasCms ? '' : defaults.imageAlt));

  return (
    <section className="overflow-hidden bg-brand-deep">
      <div className="mx-auto grid w-full max-w-[1440px] lg:grid-cols-[minmax(0,760px)_minmax(0,680px)]">
        <div className="flex flex-col justify-between gap-10 bg-brand-deep px-6 py-16 lg:px-[88px] lg:py-20 lg:pr-14">
          <div className="flex max-w-[616px] flex-col gap-5">
            {eyebrow ? (
              <div data-reveal-part>
                <Eyebrow className="border-brand-dim bg-brand-soft/60 text-brand-primary backdrop-blur-[12px]">
                  {eyebrow}
                </Eyebrow>
              </div>
            ) : null}
            {heading ? (
              <h1 className="font-heading text-[1.75rem] font-bold leading-[1.1] tracking-[-0.02em] text-white md:text-4xl lg:text-[44px]">
                <HeadingLines text={heading} className="block" />
              </h1>
            ) : null}
            {lead ? (
              <p
                data-reveal-part
                className="max-w-[616px] text-base leading-[1.55] text-brand-soft/80"
              >
                {lead}
              </p>
            ) : null}
            {ctas.length ? (
              <div data-reveal-part className="flex flex-col items-start gap-3 pt-1">
                {ctas.map((cta) => (
                  <CtaButton
                    key={cta.label}
                    href={cta.href}
                    appearance={cta.appearance}
                    openInNewTab={cta.openInNewTab}
                    className="hover:border-white hover:bg-transparent hover:text-white"
                  >
                    {cta.label}
                  </CtaButton>
                ))}
                {note ? <p className="text-[13px] font-medium text-white/50">{note}</p> : null}
              </div>
            ) : note ? (
              <p data-reveal-part className="text-[13px] font-medium text-white/50">
                {note}
              </p>
            ) : null}
          </div>

          {points.length ? (
            <ul className="flex max-w-[616px] flex-col gap-3.5">
              {points.map((point) => (
                <li key={point.title} data-reveal-item className="flex items-center gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/8 font-heading text-[13px] font-bold text-brand-soft">
                    {point.n}
                  </span>
                  <span>
                    <p className="font-heading text-base font-bold text-white">{point.title}</p>
                    <p className="text-[13px] leading-snug text-brand-soft/80">{point.body}</p>
                  </span>
                </li>
              ))}
            </ul>
          ) : null}

          {stats.length ? (
            <div className="max-w-[616px]">
              <div className="mb-4 h-px w-full bg-white/15" />
              <dl className="grid grid-cols-3 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} data-reveal-item>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="font-heading text-[28px] font-bold leading-none text-white">
                      {stat.value}
                    </dd>
                    <p className="mt-1 font-heading text-[11px] font-semibold tracking-[1.4px] text-brand-soft uppercase">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
        </div>

        <AmcHeroVisual
          imageUrl={imageUrl}
          imageAlt={imageAlt}
          quarters={quarters.map((quarter) => ({
            code: quarter.code ?? '',
            label: quarter.label ?? '',
          }))}
        />
      </div>
    </section>
  );
}
