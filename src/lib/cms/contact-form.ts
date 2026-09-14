import { LEAD_INDUSTRIES, LEAD_TIMINGS } from '@/lib/cms/leads';

export type ContactFormField = 'text' | 'dropdown' | 'textarea';
export type ContactFormWidth = 'half' | 'full';

export type ContactFormOption = {
  label: string;
  value?: string | null;
  id?: string | null;
};

export type ContactFormQuestion = {
  id?: string | null;
  label: string;
  name?: string | null;
  field: ContactFormField;
  width: ContactFormWidth;
  required?: boolean | null;
  options?: ContactFormOption[] | null;
};

export const CONTACT_FORM_CORE_FIELDS = [
  'name',
  'email',
  'company',
  'plant',
  'industry',
  'timing',
  'message',
] as const;

export type ContactFormCoreField = (typeof CONTACT_FORM_CORE_FIELDS)[number];

export function slugifyContactField(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function contactQuestionName(question: ContactFormQuestion, index: number): string {
  const named = question.name?.trim();
  if (named) {
    return named;
  }

  return slugifyContactField(question.label) || `question-${index + 1}`;
}

export function contactOptionValue(option: ContactFormOption): string {
  const named = option.value?.trim();
  if (named) {
    return named;
  }

  return slugifyContactField(option.label) || option.label;
}

export function isCoreContactField(name: string): name is ContactFormCoreField {
  return (CONTACT_FORM_CORE_FIELDS as readonly string[]).includes(name);
}

export const DEFAULT_CONTACT_FORM_QUESTIONS: ContactFormQuestion[] = [
  { label: 'Full name', name: 'name', field: 'text', width: 'half', required: true },
  { label: 'Work email', name: 'email', field: 'text', width: 'half', required: true },
  { label: 'Company', name: 'company', field: 'text', width: 'half' },
  { label: 'Plant / site', name: 'plant', field: 'text', width: 'half' },
  {
    label: 'Industry',
    name: 'industry',
    field: 'dropdown',
    width: 'full',
    required: true,
    options: LEAD_INDUSTRIES.map(({ label, value }) => ({ label, value })),
  },
  {
    label: 'When can you talk',
    name: 'timing',
    field: 'dropdown',
    width: 'full',
    required: true,
    options: LEAD_TIMINGS.map(({ label, value }) => ({ label, value })),
  },
  {
    label: 'What should we look at',
    name: 'message',
    field: 'textarea',
    width: 'full',
    required: true,
  },
];

type CmsContactFormQuestion = {
  label?: string | null;
  name?: string | null;
  field?: ContactFormField | string | null;
  width?: ContactFormWidth | string | null;
  required?: boolean | null;
  options?: Array<{ label?: string | null; value?: string | null; id?: string | null }> | null;
  id?: string | null;
};

export function resolveContactFormQuestions(
  questions?: CmsContactFormQuestion[] | null,
  options?: { allowEmpty?: boolean },
): ContactFormQuestion[] {
  const resolved = (questions ?? [])
    .map((question) => {
      const label = question.label?.trim();
      if (!label) {
        return null;
      }

      const field: ContactFormField =
        question.field === 'dropdown' || question.field === 'textarea' ? question.field : 'text';
      const options: ContactFormOption[] = [];
      for (const option of question.options ?? []) {
        const optionLabel = option.label?.trim();
        if (!optionLabel) {
          continue;
        }

        const resolvedOption: ContactFormOption = { label: optionLabel };
        if (option.value != null) {
          resolvedOption.value = option.value;
        }
        if (option.id != null) {
          resolvedOption.id = option.id;
        }
        options.push(resolvedOption);
      }

      const resolvedQuestion: ContactFormQuestion = {
        id: question.id,
        label,
        name: question.name,
        field,
        width: question.width === 'half' ? 'half' : 'full',
        required: question.required,
        options: field === 'dropdown' ? options : undefined,
      };

      return resolvedQuestion;
    })
    .filter((question): question is ContactFormQuestion => question !== null);

  if (resolved.length) {
    return resolved;
  }

  return options?.allowEmpty ? [] : DEFAULT_CONTACT_FORM_QUESTIONS;
}
