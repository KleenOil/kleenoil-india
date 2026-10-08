'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

import type { FaqTopic } from '@/lib/cms/library';
import { cn } from '@/lib/utils';

type FaqTopicsProps = {
  topics: FaqTopic[];
};

function openSetFor(items: FaqTopic['items']) {
  const open = new Set<number>();
  items.forEach((item, index) => {
    if (item.defaultOpen) {
      open.add(index);
    }
  });
  if (open.size === 0 && items.length) {
    open.add(0);
  }
  return open;
}

export function FaqTopics({ topics }: FaqTopicsProps) {
  const [active, setActive] = useState(0);
  const topic = topics[active] ?? topics[0];
  const items = topic?.items ?? [];
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(() => openSetFor(items));

  if (!topics.length) {
    return null;
  }

  function selectTopic(index: number) {
    setActive(index);
    setOpenIndexes(openSetFor(topics[index]?.items ?? []));
  }

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
    <section className="bg-surface">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-6 py-16 lg:px-[100px] lg:py-[80px]">
        <div className="flex flex-wrap gap-2">
          {topics.map((item, index) => {
            const selected = index === active;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => selectTopic(index)}
                className={cn(
                  'rounded-full border px-4 py-2 font-heading text-sm font-semibold transition-colors',
                  selected
                    ? 'border-brand-primary bg-brand-primary text-white'
                    : 'border-border-subtle bg-background text-text-secondary hover:border-brand-primary hover:text-brand-primary',
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-2.5">
          {items.map((item, index) => {
            const isOpen = openIndexes.has(index);
            const panelId = `library-faq-${active}-${index}`;
            const buttonId = `${panelId}-button`;

            return (
              <div
                key={`${item.question}-${index}`}
                className={cn(
                  'rounded-2xl border bg-background transition-[border-color,box-shadow] duration-300',
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
                      'relative flex size-[18px] shrink-0 items-center justify-center',
                      isOpen ? 'text-brand-primary' : 'text-text-tertiary',
                    )}
                    aria-hidden
                  >
                    <Plus
                      className={cn(
                        'absolute size-[18px] transition-all duration-300',
                        isOpen ? 'rotate-90 scale-75 opacity-0' : 'opacity-100',
                      )}
                    />
                    <Minus
                      className={cn(
                        'absolute size-[18px] transition-all duration-300',
                        isOpen ? 'opacity-100' : '-rotate-90 scale-75 opacity-0',
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
                    'grid transition-[grid-template-rows,opacity] duration-300',
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
