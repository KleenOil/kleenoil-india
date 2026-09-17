import Image from 'next/image';

import { HeadingLines } from '@/components/sustainability/HeadingLines';
import { CtaButton } from '@/components/ui/cta-button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { blockHasCmsData, cmsText } from '@/lib/cms/block-content';
import { DEFAULT_AMC_PROOF } from '@/lib/cms/amc';
import { getMediaAlt, getMediaUrl, resolveCtaList, type CmsLink } from '@/lib/cms/links';
import type { Media } from '@/payload-types';

type CtaItem = { link?: CmsLink | null };

export type AmcProofBlockData = {
  blockType: 'amc-proof';
  eyebrow?: string | null;
  heading?: string | null;
  lead?: string | null;
  ctas?: CtaItem[] | null;
  image?: number | Media | null;
};

export function AmcProofBlock({ block }: { block?: AmcProofBlockData | null }) {
  const defaults = DEFAULT_AMC_PROOF;
  const hasCms = blockHasCmsData(block);
  const eyebrow = cmsText(block?.eyebrow, defaults.eyebrow, hasCms);
  const heading = cmsText(block?.heading, defaults.heading, hasCms);
  const lead = cmsText(block?.lead, defaults.lead, hasCms);
  const ctas = resolveCtaList(block?.ctas, hasCms ? [] : [defaults.cta]);
  const imageUrl = cmsText(getMediaUrl(block?.image), defaults.imageUrl, hasCms);
  const imageAlt = getMediaAlt(block?.image, heading || (hasCms ? '' : defaults.imageAlt));

  return (
    <section className="bg-surface">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-16 px-6 py-16 lg:flex-row lg:px-[100px] lg:py-[88px]">
        <div data-reveal-panel className="flex max-w-[656px] flex-1 flex-col items-start gap-5">
          {eyebrow ? (
            <div data-reveal-part>
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
          ) : null}
          {heading ? (
            <h2 className="font-heading text-[1.75rem] font-bold leading-[1.12] tracking-[-0.03em] text-text-primary md:text-4xl lg:text-[40px]">
              <HeadingLines text={heading} className="block" />
            </h2>
          ) : null}
          {lead ? (
            <p data-reveal-part className="text-base leading-relaxed text-text-secondary">
              {lead}
            </p>
          ) : null}
          {ctas.length ? (
            <div data-reveal-part>
              {ctas.map((cta) => (
                <CtaButton
                  key={cta.label}
                  href={cta.href}
                  appearance={cta.appearance}
                  openInNewTab={cta.openInNewTab}
                >
                  {cta.label}
                </CtaButton>
              ))}
            </div>
          ) : null}
        </div>
        {imageUrl ? (
          <div className="relative h-[260px] w-full overflow-hidden rounded-2xl lg:h-[300px] lg:w-[520px] lg:shrink-0">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 520px, 100vw"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
