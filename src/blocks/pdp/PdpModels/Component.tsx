import { Eyebrow } from '@/components/ui/eyebrow';
import { blockHasCmsData, cmsList, cmsText } from '@/lib/cms/block-content';
import { DEFAULT_PDP_MODELS } from '@/lib/cms/pdp-defaults';

type ColumnItem = { label?: string | null };
type ModelItem = {
  name?: string | null;
  values?: Array<{ value?: string | null }> | null;
};

export type PdpModelsBlockData = {
  blockType: 'pdp-models';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  columns?: ColumnItem[] | null;
  models?: ModelItem[] | null;
};

export function PdpModelsBlock({ block }: { block?: PdpModelsBlockData | null }) {
  const hasCms = blockHasCmsData(block);
  const eyebrow = cmsText(block?.eyebrow, DEFAULT_PDP_MODELS.eyebrow, hasCms);
  const heading = cmsText(block?.heading, DEFAULT_PDP_MODELS.heading, hasCms);
  const description = cmsText(block?.description, DEFAULT_PDP_MODELS.description, hasCms);
  const columns = cmsList(block?.columns, DEFAULT_PDP_MODELS.columns, hasCms, (col) =>
    Boolean(col.label),
  );
  const models = cmsList(block?.models, DEFAULT_PDP_MODELS.models, hasCms, (model) =>
    Boolean(model.name),
  );

  return (
    <section className="bg-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 py-16 lg:px-[100px] lg:py-[100px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[640px] space-y-4">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="font-heading text-[1.625rem] font-bold leading-[1.08] tracking-[-0.04em] text-text-primary md:text-3xl lg:text-[36px]">
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

        <div className="surface-card overflow-hidden rounded-2xl border border-border-subtle bg-surface-elevated/70">
          <div
            className="hidden gap-4 bg-brand-dim px-7 py-4 md:grid"
            style={{
              gridTemplateColumns: `repeat(${Math.max(columns.length, 1)}, minmax(0, 1fr))`,
            }}
          >
            {columns.map((column) => (
              <p
                key={column.label}
                className="font-mono text-[11px] font-bold tracking-[1.2px] text-brand-primary uppercase"
              >
                {column.label}
              </p>
            ))}
          </div>
          <div className="divide-y divide-border-subtle">
            {models.map((model) => (
              <div
                key={model.name}
                className="grid gap-2 px-5 py-5 md:gap-4 md:px-7"
                style={{
                  gridTemplateColumns: `repeat(${Math.max(columns.length, 1)}, minmax(0, 1fr))`,
                }}
              >
                <p className="font-heading text-base font-bold text-text-primary">{model.name}</p>
                {(model.values ?? []).map((cell, index) => (
                  <p key={`${model.name}-${index}`} className="text-sm text-text-secondary">
                    <span className="mr-2 font-mono text-[10px] font-bold tracking-wider text-text-tertiary uppercase md:hidden">
                      {columns[index + 1]?.label || `Col ${index + 1}`}
                    </span>
                    {cell.value}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
