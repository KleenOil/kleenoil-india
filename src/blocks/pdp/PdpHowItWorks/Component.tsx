import { Eyebrow } from '@/components/ui/eyebrow';
import { DEFAULT_PDP_HOW_IT_WORKS } from '@/lib/cms/pdp-defaults';

type StepItem = {
  label?: string | null;
  title?: string | null;
  description?: string | null;
};

export type PdpHowItWorksBlockData = {
  blockType: 'pdp-how-it-works';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  steps?: StepItem[] | null;
};

export function PdpHowItWorksBlock({ block }: { block?: PdpHowItWorksBlockData | null }) {
  const eyebrow = block?.eyebrow || DEFAULT_PDP_HOW_IT_WORKS.eyebrow;
  const heading = block?.heading || DEFAULT_PDP_HOW_IT_WORKS.heading;
  const description = block?.description || DEFAULT_PDP_HOW_IT_WORKS.description;
  const steps = block?.steps?.filter((step) => step.title)?.length
    ? block.steps.filter((step) => step.title)
    : DEFAULT_PDP_HOW_IT_WORKS.steps;

  return (
    <section className="bg-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-16 lg:gap-12 lg:px-[100px] lg:py-[100px]">
        <div className="mx-auto flex max-w-[720px] flex-col items-center gap-5 text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="font-heading text-3xl font-bold tracking-[-0.04em] text-text-primary lg:text-[40px]">
            {heading}
          </h2>
          <p className="text-base leading-relaxed text-text-secondary">{description}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={`${step.title}-${index}`}
              className="surface-card flex flex-col gap-4 rounded-2xl border border-border-subtle bg-surface-elevated/70 p-7"
            >
              <p className="font-heading text-4xl font-bold tracking-tight text-brand-primary">
                {step.label || String(index + 1).padStart(2, '0')}
              </p>
              <span className="h-[3px] w-10 rounded-full bg-brand-primary" aria-hidden />
              <h3 className="font-heading text-xl font-bold text-text-primary">{step.title}</h3>
              {step.description ? (
                <p className="text-sm leading-relaxed text-text-secondary">{step.description}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
