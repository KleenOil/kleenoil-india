'use client';

import { useState } from 'react';

import { CtaButton } from '@/components/ui/cta-button';
import { LEAD_INDUSTRIES, LEAD_TIMINGS, type LeadIndustry, type LeadTiming } from '@/lib/cms/leads';
import { cn } from '@/lib/utils';

const fieldClass =
  'rounded-xl border border-border-subtle bg-background/80 px-4 py-3 text-sm text-text-primary outline-none ring-brand-primary/30 focus:ring-2';

const labelClass = 'font-mono text-[11px] font-bold tracking-[1.2px] text-text-tertiary uppercase';

type ConsultationFormProps = {
  title?: string;
  lead?: string;
  submitLabel?: string;
  finePrint?: string;
  className?: string;
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ConsultationForm({
  title = 'Request a 30-minute slot',
  lead = 'An engineer replies within one business day with a time that fits your shift.',
  submitLabel = 'Book this consultation',
  finePrint = 'No brochure deck. You get a written next step — even if Kleenoil is not the fit.',
  className,
}: ConsultationFormProps) {
  const [industry, setIndustry] = useState<LeadIndustry>('automotive');
  const [timing, setTiming] = useState<LeadTiming>('this-week');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'submitting') {
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus('submitting');
    setError(null);

    try {
      const response = await fetch('/api/forms/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          company: data.get('company'),
          plant: data.get('plant'),
          industry,
          timing,
          message: data.get('message'),
          website: data.get('website'),
        }),
      });

      const result = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setStatus('error');
        setError(result?.error || 'Could not send your request. Please try again.');
        return;
      }

      setStatus('success');
      form.reset();
      setIndustry('automotive');
      setTiming('this-week');
    } catch {
      setStatus('error');
      setError('Could not send your request. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div
        className={cn(
          'rounded-[20px] border-2 border-brand-dim bg-surface-elevated p-8 text-center lg:p-9',
          className,
        )}
      >
        <p className="font-heading text-xl font-bold text-text-primary">Request received.</p>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          An engineer will reply within one business day with a time that fits your shift — and a
          written next step.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'flex flex-col gap-4 rounded-[20px] bg-surface-elevated p-7 shadow-[0_16px_48px_#00331922] lg:p-8',
        className,
      )}
    >
      <div>
        <h2 className="font-heading text-[22px] font-bold tracking-tight text-text-primary">
          {title}
        </h2>
        <p className="mt-2 text-[13px] leading-relaxed text-text-secondary">{lead}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Full name</span>
          <input required name="name" type="text" autoComplete="name" className={fieldClass} />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Work email</span>
          <input required name="email" type="email" autoComplete="email" className={fieldClass} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Company</span>
          <input name="company" type="text" autoComplete="organization" className={fieldClass} />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Plant / site</span>
          <input name="plant" type="text" className={fieldClass} />
        </label>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className={labelClass}>Industry</legend>
        <div className="flex flex-wrap gap-2">
          {LEAD_INDUSTRIES.map((item) => {
            const selected = industry === item.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => setIndustry(item.value)}
                aria-pressed={selected}
                className={cn(
                  'rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors',
                  selected
                    ? 'border-brand-primary bg-brand-primary text-white'
                    : 'border-border-subtle bg-background text-text-primary hover:border-brand-primary',
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-2">
        <legend className={labelClass}>When can you talk</legend>
        <div className="flex flex-wrap gap-2">
          {LEAD_TIMINGS.map((item) => {
            const selected = timing === item.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => setTiming(item.value)}
                aria-pressed={selected}
                className={cn(
                  'rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors',
                  selected
                    ? 'border-brand-primary bg-brand-primary text-white'
                    : 'border-border-subtle bg-background text-text-primary hover:border-brand-primary',
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>What should we look at</span>
        <textarea required name="message" rows={4} className={cn(fieldClass, 'resize-y')} />
      </label>

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      {error ? <p className="text-sm text-red-700">{error}</p> : null}

      <CtaButton type="submit" disabled={status === 'submitting'} className="w-full">
        {status === 'submitting' ? 'Sending…' : submitLabel}
      </CtaButton>

      <p className="text-xs leading-relaxed text-text-tertiary">{finePrint}</p>
    </form>
  );
}
