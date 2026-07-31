import { Eyebrow } from '@/components/ui/eyebrow';
import { DEFAULT_PDP_RESULTS } from '@/lib/cms/pdp-defaults';

type Metric = { value?: string | null; label?: string | null };
type ResultItem = {
  tag?: string | null;
  title?: string | null;
  description?: string | null;
  metrics?: Metric[] | null;
};

export type PdpResultsBlockData = {
  blockType: 'pdp-results';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  results?: ResultItem[] | null;
};

export function PdpResultsBlock({ block }: { block?: PdpResultsBlockData | null }) {
  const eyebrow = block?.eyebrow || DEFAULT_PDP_RESULTS.eyebrow;
  const heading = block?.heading || DEFAULT_PDP_RESULTS.heading;
  const description = block?.description || DEFAULT_PDP_RESULTS.description;
  const results = block?.results?.filter((item) => item.title)?.length
    ? block.results.filter((item) => item.title)
    : DEFAULT_PDP_RESULTS.results;

  return (
    <section className="border-y border-border-subtle bg-surface">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-16 lg:px-[100px] lg:py-[100px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[640px] space-y-4">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="font-heading text-[1.625rem] font-bold leading-[1.08] tracking-[-0.04em] text-text-primary md:text-3xl lg:text-[40px]">
              {heading.split('\n').map((line, index) => (
                <span key={`${line}-${index}`} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>
          <p className="max-w-[420px] text-[15px] leading-relaxed text-text-secondary">
            {description}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {results.map((result) => (
            <div
              key={result.title}
              className="surface-card flex flex-col gap-5 rounded-2xl border border-border-subtle bg-surface-elevated/70 p-8"
            >
              {result.tag ? (
                <p className="font-mono text-xs font-bold tracking-[1.2px] text-brand-primary uppercase">
                  {result.tag}
                </p>
              ) : null}
              <h3 className="font-heading text-2xl font-bold text-text-primary">{result.title}</h3>
              {result.description ? (
                <p className="text-sm leading-relaxed text-text-secondary">{result.description}</p>
              ) : null}
              {result.metrics?.length ? (
                <div className="flex flex-wrap gap-6 pt-2">
                  {result.metrics
                    .filter((metric) => metric.value && metric.label)
                    .map((metric) => (
                      <div key={`${metric.value}-${metric.label}`}>
                        <p className="font-heading text-2xl font-bold text-brand-primary">
                          {metric.value}
                        </p>
                        <p className="font-mono text-[10px] font-bold tracking-[1.2px] text-text-tertiary uppercase">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
