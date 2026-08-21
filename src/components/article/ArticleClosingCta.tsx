import { CtaButton } from '@/components/ui/cta-button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { DEFAULT_ARTICLE_PAGE } from '@/lib/cms/defaults';
import { resolveCtaList, type CmsLink } from '@/lib/cms/links';

type CtaLinkItem =
  | {
      link?: CmsLink | null;
    }
  | CmsLink
  | null;

type ArticleClosingCtaProps = {
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  ctas?: CtaLinkItem[] | null;
};

export function ArticleClosingCta({ eyebrow, heading, description, ctas }: ArticleClosingCtaProps) {
  const defaults = DEFAULT_ARTICLE_PAGE.closingCta;
  const resolvedEyebrow = eyebrow?.trim() || defaults.eyebrow;
  const resolvedHeading = heading?.trim() || defaults.heading;
  const resolvedDescription = description?.trim() || defaults.description;
  const buttons = resolveCtaList(ctas, defaults.ctas);

  return (
    <section className="bg-[#cae6d9]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-[100px] lg:py-24">
        <div className="max-w-[720px] space-y-6">
          <div data-reveal-part>
            <Eyebrow>{resolvedEyebrow}</Eyebrow>
          </div>
          <h2 className="font-heading text-[1.625rem] font-bold leading-[1.05] tracking-[-0.04em] text-text-primary md:text-3xl lg:text-[48px]">
            {resolvedHeading.split('\n').map((line, index) => (
              <span key={`${line}-${index}`} data-reveal-part className="block">
                {line}
              </span>
            ))}
          </h2>
          {resolvedDescription ? (
            <p
              data-reveal-part
              className="max-w-[560px] text-base leading-relaxed text-text-secondary md:text-[17px]"
            >
              {resolvedDescription}
            </p>
          ) : null}
        </div>

        <div data-reveal-part className="flex w-full max-w-sm flex-col gap-3.5">
          {buttons.map((cta, index) => (
            <CtaButton
              key={`${cta.label}-${index}`}
              href={cta.href}
              appearance={cta.appearance}
              openInNewTab={cta.openInNewTab}
              className="w-full"
            >
              {cta.label}
            </CtaButton>
          ))}
        </div>
      </div>
    </section>
  );
}
