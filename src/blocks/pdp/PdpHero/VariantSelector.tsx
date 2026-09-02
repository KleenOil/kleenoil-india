'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

export type HeroVariantOption = {
  name: string;
};

type VariantSelectorProps = {
  label: string;
  style: 'chips' | 'list' | 'dropdown';
  variants: HeroVariantOption[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

export function VariantSelector({
  label,
  style,
  variants,
  selectedIndex,
  onSelect,
}: VariantSelectorProps) {
  const selected = variants[selectedIndex] ?? variants[0];

  if (!selected) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="font-mono text-[11px] font-bold tracking-[1.4px] text-text-tertiary uppercase">
        {label}
      </p>

      {style === 'dropdown' ? (
        <DropdownList variants={variants} selectedIndex={selectedIndex} onSelect={onSelect} />
      ) : style === 'list' ? (
        <div className="flex flex-col gap-2">
          {variants.map((variant, index) => (
            <VariantRow
              key={`${variant.name}-${index}`}
              variant={variant}
              active={index === selectedIndex}
              onSelect={() => onSelect(index)}
              layout="list"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {variants.map((variant, index) => (
            <VariantRow
              key={`${variant.name}-${index}`}
              variant={variant}
              active={index === selectedIndex}
              onSelect={() => onSelect(index)}
              layout="chip"
            />
          ))}
        </div>
      )}
    </div>
  );
}

function VariantRow({
  variant,
  active,
  onSelect,
  layout,
}: {
  variant: HeroVariantOption;
  active: boolean;
  onSelect: () => void;
  layout: 'list' | 'chip';
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={cn(
        'flex border text-left transition-[color,background-color,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
        layout === 'list'
          ? 'w-full items-center justify-between gap-3 rounded-xl px-4 py-3.5'
          : 'min-h-11 items-center justify-center rounded-xl px-3.5 py-3',
        active
          ? 'border-brand-primary bg-brand-primary'
          : 'border-border-subtle bg-surface-elevated/70 hover:border-brand-primary/40',
      )}
    >
      <span
        className={cn(
          'min-w-0 font-heading font-bold leading-[1.25] tracking-[-0.2px]',
          layout === 'list' ? 'text-[15px]' : 'text-center text-[13px]',
          active ? 'text-white' : 'text-text-primary',
        )}
      >
        {variant.name}
      </span>
      {layout === 'list' ? (
        active ? (
          <Check className="size-4 shrink-0 text-white" aria-hidden />
        ) : (
          <ChevronRight className="size-4 shrink-0 text-text-tertiary" aria-hidden />
        )
      ) : null}
    </button>
  );
}

function DropdownList({
  variants,
  selectedIndex,
  onSelect,
}: {
  variants: HeroVariantOption[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = variants[selectedIndex] ?? variants[0];

  useEffect(() => {
    if (!open) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-border-subtle bg-surface-elevated px-4 py-3 text-left"
      >
        <span className="block min-w-0 truncate font-heading text-sm font-bold text-text-primary">
          {selected?.name}
        </span>
        <ChevronDown
          className={cn(
            'size-4 shrink-0 text-text-secondary transition-transform',
            open && 'rotate-180',
          )}
          aria-hidden
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          className="absolute z-20 mt-1 max-h-72 w-full overflow-auto rounded-xl border border-border-subtle bg-surface-elevated py-1 shadow-lg"
        >
          {variants.map((variant, index) => {
            const active = index === selectedIndex;
            return (
              <li key={`${variant.name}-${index}`} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => {
                    onSelect(index);
                    setOpen(false);
                  }}
                  className={cn(
                    'flex w-full items-start px-4 py-2.5 text-left font-heading text-sm font-bold text-text-primary hover:bg-brand-soft/80',
                    active && 'bg-brand-soft',
                  )}
                >
                  {variant.name}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
