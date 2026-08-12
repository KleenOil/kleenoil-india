import { DEFAULT_MANIFESTO } from '@/lib/cms/defaults';

export type ManifestoBlockData = {
  blockType: 'manifesto';
  quote?: string | null;
  attribution?: string | null;
};

type ManifestoBlockProps = {
  block?: ManifestoBlockData | null;
};

export function ManifestoBlock({ block }: ManifestoBlockProps) {
  const quote = block?.quote || DEFAULT_MANIFESTO.quote;
  const attribution = block?.attribution || DEFAULT_MANIFESTO.attribution;

  return (
    <section className="border-b border-border-subtle bg-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 px-6 py-16 text-center lg:gap-12 lg:px-[100px] lg:py-[120px]">
        <span
          aria-hidden
          data-reveal-part
          className="font-heading text-8xl font-bold leading-none text-brand-soft lg:text-[144px]"
        >
          “
        </span>

        <blockquote
          data-reveal-part
          className="max-w-[920px] font-heading text-xl font-semibold leading-snug tracking-[-0.03em] text-text-primary md:text-2xl lg:text-[32px] lg:leading-[1.35]"
        >
          {quote}
        </blockquote>

        <span aria-hidden data-reveal-part className="h-0.5 w-16 bg-brand-primary" />

        {attribution ? (
          <p
            data-reveal-part
            className="font-mono text-[11px] font-bold tracking-[2px] text-text-tertiary uppercase"
          >
            {attribution}
          </p>
        ) : null}
      </div>
    </section>
  );
}
