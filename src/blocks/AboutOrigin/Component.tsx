import { CtaButton } from '@/components/ui/cta-button';
import { blockHasCmsData, cmsList, cmsText } from '@/lib/cms/block-content';
import { DEFAULT_ABOUT_ORIGIN } from '@/lib/cms/defaults';
import { resolveLink, type CmsLink } from '@/lib/cms/links';

type Milestone = {
  year?: string | null;
  title?: string | null;
};

export type AboutOriginBlockData = {
  blockType: 'about-origin';
  eyebrow?: string | null;
  heading?: string | null;
  body?: string | null;
  bodySecondary?: string | null;
  cta?: CmsLink | null;
  milestones?: Milestone[] | null;
};

type AboutOriginBlockProps = {
  block?: AboutOriginBlockData | null;
};

export function AboutOriginBlock({ block }: AboutOriginBlockProps) {
  const hasCms = blockHasCmsData(block);
  const eyebrow = cmsText(block?.eyebrow, DEFAULT_ABOUT_ORIGIN.eyebrow, hasCms);
  const heading = cmsText(block?.heading, DEFAULT_ABOUT_ORIGIN.heading, hasCms);
  const body = cmsText(block?.body, DEFAULT_ABOUT_ORIGIN.body, hasCms);
  const bodySecondary = cmsText(block?.bodySecondary, DEFAULT_ABOUT_ORIGIN.bodySecondary, hasCms);

  const cta = hasCms
    ? resolveLink(block?.cta)
    : (resolveLink(block?.cta) ?? DEFAULT_ABOUT_ORIGIN.cta);

  const milestones = cmsList(
    block?.milestones,
    DEFAULT_ABOUT_ORIGIN.milestones,
    hasCms,
    (item): item is Milestone & { year: string; title: string } => Boolean(item.year && item.title),
  );

  return (
    <section className="border-b border-border-subtle bg-background">
      <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-[100px] lg:py-[120px]">
        <div className="flex flex-col gap-7 lg:max-w-[560px]">
          {eyebrow ? (
            <p
              data-reveal-part
              className="font-mono text-xs font-bold tracking-[2px] text-brand-primary uppercase"
            >
              {eyebrow}
            </p>
          ) : null}

          {heading ? (
            <h2
              data-reveal-part
              className="font-heading text-[1.75rem] font-bold leading-[1.05] tracking-[-0.04em] text-text-primary md:text-4xl lg:text-[44px]"
            >
              {heading.split('\n').map((line, index) => (
                <span key={`${line}-${index}`} className="block">
                  {line}
                </span>
              ))}
            </h2>
          ) : null}

          {body || bodySecondary ? (
            <div className="flex flex-col gap-5">
              {body ? (
                <p
                  data-reveal-part
                  className="text-[15px] leading-relaxed text-text-secondary md:text-base"
                >
                  {body}
                </p>
              ) : null}
              {bodySecondary ? (
                <p
                  data-reveal-part
                  className="text-[15px] leading-relaxed text-text-secondary md:text-base"
                >
                  {bodySecondary}
                </p>
              ) : null}
            </div>
          ) : null}

          {cta ? (
            <div data-reveal-part className="pt-2">
              <CtaButton
                href={cta.href}
                appearance={cta.appearance}
                openInNewTab={cta.openInNewTab}
              >
                {cta.label}
              </CtaButton>
            </div>
          ) : null}
        </div>

        {milestones.length ? (
          <div
            data-reveal-part
            className="flex flex-col overflow-hidden rounded-[20px] bg-brand-primary shadow-[0_16px_40px_#00663333]"
          >
            {milestones.map((item, index) => (
              <div
                key={`${item.year}-${item.title}`}
                className={
                  index === 0
                    ? 'flex items-baseline gap-6 px-8 py-7 lg:gap-10 lg:px-10 lg:py-9'
                    : 'flex items-baseline gap-6 border-t border-white/15 px-8 py-7 lg:gap-10 lg:px-10 lg:py-9'
                }
              >
                <p className="w-[72px] shrink-0 font-heading text-2xl font-bold tracking-[-0.03em] text-white lg:w-20 lg:text-[28px]">
                  {item.year}
                </p>
                <p className="font-heading text-base font-semibold leading-snug text-white lg:text-lg">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
