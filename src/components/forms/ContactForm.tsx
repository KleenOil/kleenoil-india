'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

import { cn } from '@/lib/utils';

type ContactFormProps = {
  className?: string;
};

type FormState = 'idle' | 'submitted';

export function ContactForm({ className }: ContactFormProps) {
  const [state, setState] = useState<FormState>('idle');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('submitted');
  }

  if (state === 'submitted') {
    return (
      <div
        className={cn(
          'rounded-2xl border-2 border-brand-dim bg-surface-elevated/90 p-8 text-center',
          className,
        )}
      >
        <p className="font-heading text-xl font-bold text-text-primary">Message received</p>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          Thank you for reaching out. A Kleenoil engineer will respond within one business day once
          form submissions are live on this environment.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'surface-card flex flex-col gap-5 rounded-2xl border-2 border-border-subtle bg-surface-elevated/90 p-8',
        className,
      )}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[11px] font-bold tracking-[1.2px] text-text-tertiary uppercase">
            Full name
          </span>
          <input
            required
            name="name"
            type="text"
            autoComplete="name"
            className="rounded-xl border border-border-subtle bg-background/80 px-4 py-3 text-sm text-text-primary outline-none ring-brand-primary/30 focus:ring-2"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[11px] font-bold tracking-[1.2px] text-text-tertiary uppercase">
            Work email
          </span>
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            className="rounded-xl border border-border-subtle bg-background/80 px-4 py-3 text-sm text-text-primary outline-none ring-brand-primary/30 focus:ring-2"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-mono text-[11px] font-bold tracking-[1.2px] text-text-tertiary uppercase">
          Company
        </span>
        <input
          name="company"
          type="text"
          autoComplete="organization"
          className="rounded-xl border border-border-subtle bg-background/80 px-4 py-3 text-sm text-text-primary outline-none ring-brand-primary/30 focus:ring-2"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-mono text-[11px] font-bold tracking-[1.2px] text-text-tertiary uppercase">
          How can we help?
        </span>
        <textarea
          required
          name="message"
          rows={5}
          className="resize-y rounded-xl border border-border-subtle bg-background/80 px-4 py-3 text-sm text-text-primary outline-none ring-brand-primary/30 focus:ring-2"
        />
      </label>

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <button
        type="submit"
        className="group inline-flex items-center justify-center gap-2.5 rounded-[10px] bg-brand-primary px-8 py-4 font-heading text-base font-bold text-white shadow-[0_8px_24px_#00663344] transition-colors hover:bg-brand-bright"
      >
        Send message
        <ArrowUpRight
          className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </button>

      <p className="text-xs leading-relaxed text-text-tertiary">
        Form preview only — API submission will connect in the forms milestone.
      </p>
    </form>
  );
}
