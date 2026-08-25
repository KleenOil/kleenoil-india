import { Eyebrow } from '@/components/ui/eyebrow';
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
  const eyebrow = block?.eyebrow || DEFAULT_CONTACT_PROCESS.eyebrow;
  const heading = block?.heading || DEFAULT_CONTACT_PROCESS.heading;
  const steps = block?.steps?.filter((step) => step.title && step.description)?.length
    ? (block.steps.filter((step) => step.title && step.description) as Array<{
        title: string;
        description: string;
      }>)
    : DEFAULT_CONTACT_PROCESS.steps;

  return (
    <section id="how-it-works" className="bg-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 py-16 lg:gap-12 lg:px-[100px] lg:py-[88px]">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-6 max-w-[720px] font-heading text-3xl font-bold leading-[1.1] tracking-[-0.04em] text-text-primary md:text-4xl lg:text-[40px]">
            {heading}
          </h2>
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
