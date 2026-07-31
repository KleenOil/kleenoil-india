import Image from 'next/image';

import { Eyebrow } from '@/components/ui/eyebrow';
import { DEFAULT_PDP_MACHINES } from '@/lib/cms/pdp-defaults';
import { getMediaAlt, getMediaUrl } from '@/lib/cms/links';
import type { Media } from '@/payload-types';

type MachineItem = {
  title?: string | null;
  description?: string | null;
  image?: number | Media | null;
};

export type PdpMachinesBlockData = {
  blockType: 'pdp-machines';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  machines?: MachineItem[] | null;
};

export function PdpMachinesBlock({ block }: { block?: PdpMachinesBlockData | null }) {
  const eyebrow = block?.eyebrow || DEFAULT_PDP_MACHINES.eyebrow;
  const heading = block?.heading || DEFAULT_PDP_MACHINES.heading;
  const description = block?.description || DEFAULT_PDP_MACHINES.description;
  const machines: MachineItem[] = block?.machines?.filter((item) => item.title)?.length
    ? block.machines.filter((item) => item.title)
    : DEFAULT_PDP_MACHINES.machines.map((machine) => ({ ...machine, image: null }));

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

        <div className="grid gap-5 md:grid-cols-3">
          {machines.map((machine) => {
            const imageUrl = getMediaUrl(machine.image);
            return (
              <div
                key={machine.title}
                className="surface-card flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface-elevated/70"
              >
                <div className="relative h-44 bg-brand-soft">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={getMediaAlt(machine.image, machine.title || '')}
                      fill
                      className="object-cover"
                      sizes="33vw"
                    />
                  ) : null}
                </div>
                <div className="flex flex-col gap-3 p-7">
                  <h3 className="font-heading text-xl font-bold text-text-primary">
                    {machine.title}
                  </h3>
                  {machine.description ? (
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {machine.description}
                    </p>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
