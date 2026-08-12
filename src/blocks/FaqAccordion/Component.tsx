'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

import { SectionHeader } from '@/components/sections/SectionHeader';
import { DEFAULT_FAQ_ACCORDION } from '@/lib/cms/defaults';
import { cn } from '@/lib/utils';

type FaqItem = {
  question?: string | null;
  answer?: string | null;
  defaultOpen?: boolean | null;
};

export type FaqAccordionBlockData = {
  blockType: 'faq-accordion';
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  items?: FaqItem[] | null;
};

type FaqAccordionBlockProps = {
  block?: FaqAccordionBlockData | null;
};

export function FaqAccordionBlock({ block }: FaqAccordionBlockProps) {
  const eyebrow = block?.eyebrow || DEFAULT_FAQ_ACCORDION.eyebrow;
  const heading = block?.heading || DEFAULT_FAQ_ACCORDION.heading;
  const description = block?.description || DEFAULT_FAQ_ACCORDION.description;

  const items = block?.items?.filter((item) => item.question && item.answer)?.length
    ? block.items.filter((item) => item.question && item.answer)
    : DEFAULT_FAQ_ACCORDION.items;

  const initialOpen = new Set(
    items.map((item, index) => (item.defaultOpen ? index : -1)).filter((index) => index >= 0),
  );

  if (initialOpen.size === 0 && items.length > 0) {
    initialOpen.add(0);
  }

  const [openIndexes, setOpenIndexes] = useState<Set<number>>(initialOpen);

  function toggle(index: number) {
    setOpenIndexes((current) => {
      const next = new Set(current);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <section className="border-b border-border-subtle bg-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 py-16 lg:gap-12 lg:px-[100px] lg:py-[120px]">
        <SectionHeader
          eyebrow={eyebrow}
          heading={heading}
          description={description}
          align="stacked"
        />

        <div className="mx-auto flex w-full max-w-[920px] flex-col gap-2.5">
          {items.map((item, index) => {
            const isOpen = openIndexes.has(index);
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <div
                key={`${item.question}-${index}`}
                className={cn(
                  'rounded-2xl border bg-surface-elevated transition-[border-color,box-shadow] duration-300 ease-out',
                  isOpen
                    ? 'border-brand-primary shadow-[0_0_0_1px_#00663322]'
                    : 'border-border-subtle',
                )}
              >
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                >
                  <span className="font-heading text-base font-bold tracking-[-0.02em] text-text-primary md:text-[17px]">
                    {item.question}
                  </span>
                  <span
                    className={cn(
                      'relative flex size-[18px] shrink-0 items-center justify-center transition-colors duration-300',
                      isOpen ? 'text-brand-primary' : 'text-text-tertiary',
                    )}
                    aria-hidden
                  >
                    <Plus
                      className={cn(
                        'absolute size-[18px] transition-all duration-300 ease-out',
                        isOpen ? 'rotate-90 scale-75 opacity-0' : 'rotate-0 scale-100 opacity-100',
                      )}
                    />
                    <Minus
                      className={cn(
                        'absolute size-[18px] transition-all duration-300 ease-out',
                        isOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-75 opacity-0',
                      )}
                    />
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                  className={cn(
                    'grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-sm leading-relaxed text-text-secondary md:text-[15px]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
