import { Eyebrow } from '@/components/ui/eyebrow';
import { blockHasCmsData, cmsList, cmsText } from '@/lib/cms/block-content';
import { DEFAULT_CONTACT_PROCESS } from '@/lib/cms/defaults';

type ProcessStep = {
  title?: string | null;
  description?: string | null;
};

export type ContactProcessBlockData = {
  blockType: 'contact-process';
  eyebrow?: string | null;
  heading?: string | null;
  steps?: ProcessStep[] | null;
};

type ContactProcessBlockProps = {
  block?: ContactProcessBlockData | null;
};

export function ContactProcessBlock({ block }: ContactProcessBlockProps) {
  const hasCms = blockHasCmsData(block);
  const eyebrow = cmsText(block?.eyebrow, DEFAULT_CONTACT_PROCESS.eyebrow, hasCms);
  const heading = cmsText(block?.heading, DEFAULT_CONTACT_PROCESS.heading, hasCms);
  const steps = cmsList(
    block?.steps,
    DEFAULT_CONTACT_PROCESS.steps,
    hasCms,
    (step): step is ProcessStep & { title: string; description: string } =>
      Boolean(step.title && step.description),
  );

  return (
    <section id="how-it-works" className="bg-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 py-16 lg:gap-12 lg:px-[100px] lg:py-[88px]">
        <div>
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          {heading ? (
            <h2 className="mt-6 max-w-[720px] font-heading text-3xl font-bold leading-[1.1] tracking-[-0.04em] text-text-primary md:text-4xl lg:text-[40px]">
              {heading}
            </h2>
          ) : null}
        </div>

        <ol className="grid gap-8 md:grid-cols-3 md:gap-10">
          {steps.map((step, index) => (
            <li key={step.title} className="flex flex-col gap-3">
              <p className="font-mono text-[13px] font-bold tracking-[1.6px] text-brand-primary">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="font-heading text-[22px] font-bold tracking-tight text-text-primary">
                {step.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-text-secondary">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
