'use client';

import { useMemo, useState } from 'react';

import { CtaButton } from '@/components/ui/cta-button';
import {
  contactOptionValue,
  contactQuestionName,
  isCoreContactField,
  resolveContactFormQuestions,
  type ContactFormQuestion,
} from '@/lib/cms/contact-form';
import { cn } from '@/lib/utils';

const fieldClass =
  'w-full rounded-xl border border-border-subtle bg-background/80 px-4 py-3 text-sm text-text-primary outline-none ring-brand-primary/30 focus:ring-2';

const labelClass = 'font-mono text-[11px] font-bold tracking-[1.2px] text-text-tertiary uppercase';

const AUTOCOMPLETE: Record<string, string> = {
  name: 'name',
  email: 'email',
  company: 'organization',
};

type ConsultationFormProps = {
  title?: string;
  lead?: string;
  submitLabel?: string;
  finePrint?: string;
  questions?: ContactFormQuestion[] | null;
  className?: string;
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

function uniqueQuestionNames(questions: ContactFormQuestion[]): string[] {
  const used = new Set<string>(['website']);
  return questions.map((question, index) => {
    const base = contactQuestionName(question, index);
    let name = base;
    let suffix = 2;
    while (used.has(name)) {
      name = `${base}-${suffix}`;
      suffix += 1;
    }
    used.add(name);
    return name;
  });
}

export function ConsultationForm({
  title = 'Request a 30-minute slot',
  lead = 'An engineer replies within one business day with a time that fits your shift.',
  submitLabel = 'Book this consultation',
  finePrint = 'No brochure deck. You get a written next step — even if Kleenoil is not the fit.',
  questions,
  className,
}: ConsultationFormProps) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const resolvedQuestions = useMemo(() => resolveContactFormQuestions(questions), [questions]);
  const inputNames = useMemo(() => uniqueQuestionNames(resolvedQuestions), [resolvedQuestions]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'submitting') {
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus('submitting');
    setError(null);

    const extras: string[] = [];
    const payload: Record<string, string> = {};

    resolvedQuestions.forEach((question, index) => {
      const inputName = inputNames[index];
      const value = String(data.get(inputName) ?? '').trim();
      if (isCoreContactField(inputName)) {
        payload[inputName] = value;
        return;
      }

      if (value) {
        extras.push(`${question.label}: ${value}`);
      }
    });

    const message = [payload.message, extras.join('\n')].filter(Boolean).join('\n\n');

    try {
      const response = await fetch('/api/forms/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          company: payload.company,
          plant: payload.plant,
          industry: payload.industry,
          timing: payload.timing,
          message,
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
        {resolvedQuestions.map((question, index) => {
          const inputName = inputNames[index];
          const required = Boolean(question.required);
          const widthClass = question.width === 'half' ? 'sm:col-span-1' : 'sm:col-span-2';

          if (question.field === 'dropdown') {
            return (
              <label
                key={question.id || `${inputName}-${index}`}
                className={cn('flex flex-col gap-2', widthClass)}
              >
                <span className={labelClass}>{question.label}</span>
                <select required={required} name={inputName} defaultValue="" className={fieldClass}>
                  <option value="" disabled={required}>
                    Select
                  </option>
                  {(question.options ?? []).map((option) => {
                    const value = contactOptionValue(option);
                    return (
                      <option key={option.id || value} value={value}>
                        {option.label}
                      </option>
                    );
                  })}
                </select>
              </label>
            );
          }

          if (question.field === 'textarea') {
            return (
              <label
                key={question.id || `${inputName}-${index}`}
                className={cn('flex flex-col gap-2', widthClass)}
              >
                <span className={labelClass}>{question.label}</span>
                <textarea
                  required={required}
                  name={inputName}
                  rows={4}
                  className={cn(fieldClass, 'resize-y')}
                />
              </label>
            );
          }

          return (
            <label
              key={question.id || `${inputName}-${index}`}
              className={cn('flex flex-col gap-2', widthClass)}
            >
              <span className={labelClass}>{question.label}</span>
              <input
                required={required}
                name={inputName}
                type={inputName === 'email' ? 'email' : 'text'}
                autoComplete={AUTOCOMPLETE[inputName]}
                className={fieldClass}
              />
            </label>
          );
        })}
      </div>

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
