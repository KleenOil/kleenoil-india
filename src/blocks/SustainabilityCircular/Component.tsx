import { CirculationDiagram } from '@/components/sustainability/CirculationDiagram';
import { HeadingLines } from '@/components/sustainability/HeadingLines';
import { Eyebrow } from '@/components/ui/eyebrow';
import { DEFAULT_SUSTAINABILITY_CIRCULAR } from '@/lib/cms/sustainability';

type StepItem = { n?: string | null; title?: string | null; body?: string | null };

export type SustainabilityCircularBlockData = {
  blockType: 'sustainability-circular';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  steps?: StepItem[] | null;
};

export function SustainabilityCircularBlock({
  block,
}: {
  block?: SustainabilityCircularBlockData | null;
}) {
  const defaults = DEFAULT_SUSTAINABILITY_CIRCULAR;
  const eyebrow = block?.eyebrow || defaults.eyebrow;
  const heading = block?.heading || defaults.heading;
  const lead = block?.description || defaults.lead;
  const steps = block?.steps?.filter((step) => step.title && step.body)?.length
    ? block.steps.filter((step) => step.title && step.body)
    : defaults.steps;

  return (
    <section className="overflow-x-clip bg-brand-deep text-white">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-16 lg:gap-14 lg:px-[100px] lg:py-[100px]">
        <div className="max-w-[720px] space-y-5">
          <div data-reveal-part>
            <Eyebrow className="border-white/10 bg-white/5 text-brand-soft">{eyebrow}</Eyebrow>
          </div>
          <h2 className="font-heading text-[1.75rem] font-bold leading-[1.05] tracking-[-0.04em] text-white md:text-4xl lg:text-[44px]">
            <HeadingLines text={heading} className="block" />
          </h2>
          <p
            data-reveal-part
            className="max-w-[640px] text-[15px] leading-relaxed text-brand-soft/75"
          >
            {lead}
          </p>
        </div>

        <div
          data-reveal-ignore
          className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16"
        >
          <ol className="flex flex-col gap-8">
            {steps.map((step) => (
              <li key={step.title} data-reveal-item className="flex gap-5">
                <span className="font-mono text-[11px] font-bold tracking-[1.4px] text-brand-soft/45">
                  {step.n}
                </span>
                <div className="space-y-2">
                  <h3 className="font-mono text-[12px] font-bold tracking-[1.4px] text-white uppercase">
                    {step.title}
                  </h3>
                  <p className="max-w-[360px] text-sm leading-relaxed text-brand-soft/70">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <CirculationDiagram />
        </div>
      </div>
    </section>
  );
}
