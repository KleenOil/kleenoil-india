'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

export type HeroVariantOption = {
  name: string;
  code?: string | null;
  series?: string | null;
  meta?: string | null;
};

type VariantSelectorProps = {
  label: string;
  style: 'chips' | 'dropdown';
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
      ) : (
        <div className="flex flex-wrap gap-2">
          {variants.map((variant, index) => {
            const active = index === selectedIndex;
            return (
              <button
                key={`${variant.name}-${index}`}
                type="button"
                onClick={() => onSelect(index)}
                aria-pressed={active}
                className={cn(
                  'inline-flex min-w-[72px] flex-col items-start rounded-lg border px-3 py-2 text-left transition-colors',
                  active
                    ? 'border-brand-primary bg-brand-primary'
                    : 'border-border-subtle bg-[#E5EDE8]/70 hover:border-brand-primary/40',
                )}
              >
                <span
                  className={cn(
                    'font-heading text-sm font-bold leading-tight',
                    active ? 'text-white' : 'text-text-primary',
                  )}
                >
                  {variant.code || variant.name}
                </span>
                {variant.series ? (
                  <span
                    className={cn(
                      'font-mono text-[10px] font-bold tracking-[0.8px] uppercase',
                      active ? 'text-brand-soft' : 'text-text-tertiary',
                    )}
                  >
                    {variant.series}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      )}

      <div className="flex items-center justify-between gap-3 rounded-xl border border-brand-primary/15 bg-brand-soft px-4 py-3">
        <div className="min-w-0">
          <p className="truncate font-heading text-sm font-bold text-text-primary">
            {selected.name}
          </p>
          {selected.meta ? (
            <p className="mt-0.5 truncate font-mono text-[11px] tracking-[0.4px] text-text-secondary">
              {selected.meta}
            </p>
          ) : null}
        </div>
        <span className="shrink-0 rounded-full bg-brand-primary px-2.5 py-1 font-mono text-[10px] font-bold tracking-[1px] text-white uppercase">
          Selected
        </span>
      </div>
    </div>
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
        <span className="min-w-0">
          <span className="block truncate font-heading text-sm font-bold text-text-primary">
            {selected?.code ? `${selected.code} — ${selected.name}` : selected?.name}
          </span>
          {selected?.series ? (
            <span className="mt-0.5 block font-mono text-[10px] font-bold tracking-[0.8px] text-text-tertiary uppercase">
              {selected.series}
            </span>
          ) : null}
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
                    'flex w-full flex-col items-start px-4 py-2.5 text-left hover:bg-brand-soft/80',
                    active && 'bg-brand-soft',
                  )}
                >
                  <span className="font-heading text-sm font-bold text-text-primary">
                    {variant.code ? `${variant.code} — ${variant.name}` : variant.name}
                  </span>
                  {variant.series || variant.meta ? (
                    <span className="mt-0.5 font-mono text-[10px] tracking-[0.4px] text-text-secondary">
                      {[variant.series, variant.meta].filter(Boolean).join(' · ')}
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
