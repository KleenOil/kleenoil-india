import { ProcessStageCard } from '@/components/cards/ProcessStageCard';
import type { ProcessStageData } from '@/components/cards/ProcessStageCard';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { DEFAULT_PROCESS_STORY } from '@/lib/cms/defaults';
import type { Media } from '@/payload-types';

type ProcessStep = {
  year?: string | null;
  title?: string | null;
  description?: string | null;
  icon?: number | Media | null;
};

export type ProcessStoryBlockData = {
  blockType: 'process-story';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  steps?: ProcessStep[] | null;
};

type ProcessStoryBlockProps = {
  block?: ProcessStoryBlockData | null;
};

function mapCmsStep(step: ProcessStep, index: number): ProcessStageData | null {
  if (!step.title) {
    return null;
  }

  const fallback = DEFAULT_PROCESS_STORY.steps[index];

  return {
    stage: step.year || fallback?.stage || `STAGE ${String(index + 1).padStart(2, '0')}`,
    title: step.title,
    description: step.description || fallback?.description || '',
    spec: fallback?.spec || '',
    theme: fallback?.theme || 'contaminated',
  };
}

export function ProcessStoryBlock({ block }: ProcessStoryBlockProps) {
  const eyebrow = block?.eyebrow || DEFAULT_PROCESS_STORY.eyebrow;
  const heading = block?.heading || DEFAULT_PROCESS_STORY.heading;
  const description = block?.description || DEFAULT_PROCESS_STORY.description;

  const cmsSteps = block?.steps?.map(mapCmsStep).filter((s): s is ProcessStageData => Boolean(s));
  const steps = cmsSteps?.length ? cmsSteps : DEFAULT_PROCESS_STORY.steps;

  return (
    <section className="relative overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-48 size-[800px] -translate-x-1/2 rounded-full opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(0,102,51,0.13) 0%, rgba(0,102,51,0) 60%)',
        }}
      />

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-6 py-16 lg:gap-24 lg:px-[100px] lg:py-[160px]">
        <div className="surface-panel mx-auto w-full max-w-[1100px] rounded-[20px] p-8 lg:p-12">
          <SectionHeader
            align="center"
            eyebrow={eyebrow}
            heading={heading}
            description={description}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => (
            <ProcessStageCard key={`${step.stage}-${step.title}`} stage={step} />
          ))}
        </div>
      </div>
    </section>
  );
}
