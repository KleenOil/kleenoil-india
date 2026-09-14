import Image from 'next/image';
import { Circle } from 'lucide-react';

import { Eyebrow } from '@/components/ui/eyebrow';
import { blockHasCmsData, cmsText } from '@/lib/cms/block-content';
import { DEFAULT_PDP_CONTAMINATION } from '@/lib/cms/pdp-defaults';
import { getMediaUrl } from '@/lib/cms/links';
import type { Media } from '@/payload-types';
import { cn } from '@/lib/utils';

type Item = {
  icon?: number | Media | null;
  text?: string | null;
  onRight?: boolean | null;
};

export type PdpContaminationBlockData = {
  blockType: 'pdp-contamination';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  leftHeading?: string | null;
  leftDescription?: string | null;
  rightHeading?: string | null;
  rightDescription?: string | null;
  items?: Item[] | null;
};

type ListItem = {
  text: string;
  iconUrl: string | null;
};

function mapItems(
  items: Item[] | null | undefined,
  hasCms: boolean,
): { left: ListItem[]; right: ListItem[] } {
  const cmsItems =
    items
      ?.filter((item): item is Item & { text: string } => Boolean(item.text?.trim()))
      .map((item) => ({
        text: item.text.trim(),
        iconUrl: getMediaUrl(item.icon),
        onRight: Boolean(item.onRight),
      })) ?? [];

  if (cmsItems.length > 0) {
    return {
      left: cmsItems.filter((item) => !item.onRight),
      right: cmsItems.filter((item) => item.onRight),
    };
  }

  if (hasCms) {
    return { left: [], right: [] };
  }

  return {
    left: DEFAULT_PDP_CONTAMINATION.leftItems.map((text) => ({ text, iconUrl: null })),
    right: DEFAULT_PDP_CONTAMINATION.rightItems.map((text) => ({ text, iconUrl: null })),
  };
}

function ContaminationColumn({
  heading,
  description,
  items,
}: {
  heading: string;
  description: string;
  items: ListItem[];
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-border-subtle bg-background p-8 sm:p-10">
      <h3 className="font-heading text-2xl font-bold tracking-[-0.03em] text-text-primary md:text-[28px]">
        {heading}
      </h3>
      {description ? (
        <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">{description}</p>
      ) : null}

      {items.length > 0 ? (
        <ul className="mt-8 flex flex-col">
          {items.map((item, index) => (
            <li
              key={`${item.text}-${index}`}
              className={cn(
                'flex items-center gap-4 py-4',
                index > 0 && 'border-t border-border-subtle',
              )}
            >
              {item.iconUrl ? (
                <Image
                  src={item.iconUrl}
                  alt=""
                  width={28}
                  height={28}
                  className="size-7 shrink-0 object-contain"
                />
              ) : (
                <Circle
                  className="size-7 shrink-0 text-brand-primary"
                  strokeWidth={1.5}
                  aria-hidden
                />
              )}
              <span className="text-[15px] leading-snug text-text-primary">{item.text}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function PdpContaminationBlock({ block }: { block?: PdpContaminationBlockData | null }) {
  const hasCms = blockHasCmsData(block);
  const defaults = DEFAULT_PDP_CONTAMINATION;
  const eyebrow = cmsText(block?.eyebrow, defaults.eyebrow, hasCms);
  const heading = cmsText(block?.heading, defaults.heading, hasCms);
  const description = cmsText(block?.description, defaults.description, hasCms);
  const leftHeading = cmsText(block?.leftHeading, defaults.leftHeading, hasCms);
  const leftDescription = cmsText(block?.leftDescription, defaults.leftDescription, hasCms);
  const rightHeading = cmsText(block?.rightHeading, defaults.rightHeading, hasCms);
  const rightDescription = cmsText(block?.rightDescription, defaults.rightDescription, hasCms);
  const { left, right } = mapItems(block?.items, hasCms);

  return (
    <section className="border-y border-border-subtle bg-surface">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-16 lg:gap-14 lg:px-[100px] lg:py-[100px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-[640px] space-y-5">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="font-heading text-[1.625rem] font-bold leading-[1.08] tracking-[-0.04em] text-text-primary md:text-3xl lg:text-[40px]">
              {heading.split('\n').map((line, index) => (
                <span key={`${line}-${index}`} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>
          <p className="max-w-[480px] text-[15px] leading-relaxed text-text-secondary lg:pb-1">
            {description}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ContaminationColumn heading={leftHeading} description={leftDescription} items={left} />
          <ContaminationColumn
            heading={rightHeading}
            description={rightDescription}
            items={right}
          />
        </div>
      </div>
    </section>
  );
}
