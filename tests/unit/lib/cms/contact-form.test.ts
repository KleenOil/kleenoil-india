import { describe, expect, it } from 'vitest';

import {
  contactOptionValue,
  contactQuestionName,
  DEFAULT_CONTACT_FORM_QUESTIONS,
  resolveContactFormQuestions,
} from '@/lib/cms/contact-form';

describe('resolveContactFormQuestions', () => {
  it('falls back to the default consultation questions when none are saved', () => {
    expect(resolveContactFormQuestions(null)).toEqual(DEFAULT_CONTACT_FORM_QUESTIONS);
    expect(resolveContactFormQuestions([])).toEqual(DEFAULT_CONTACT_FORM_QUESTIONS);
  });

  it('keeps CMS questions with width, field type, and dropdown options', () => {
    const questions = resolveContactFormQuestions([
      { label: 'Full name', name: 'name', field: 'text', width: 'half', required: true },
      {
        label: 'Plant type',
        field: 'dropdown',
        width: 'full',
        options: [{ label: 'Steel mill', value: 'steel' }, { label: '  ' }],
      },
    ]);

    expect(questions).toHaveLength(2);
    expect(questions[0]).toMatchObject({ field: 'text', width: 'half', name: 'name' });
    expect(questions[1].options).toEqual([{ label: 'Steel mill', value: 'steel' }]);
  });
});

describe('contact field names', () => {
  it('uses the explicit field name when set', () => {
    expect(
      contactQuestionName({ label: 'Work email', name: 'email', field: 'text', width: 'half' }, 0),
    ).toBe('email');
  });

  it('slugifies the label when no field name is set', () => {
    expect(contactQuestionName({ label: 'Plant / site', field: 'text', width: 'half' }, 0)).toBe(
      'plant-site',
    );
  });

  it('prefers an option value over the label', () => {
    expect(contactOptionValue({ label: 'Next 2 weeks', value: 'next-two-weeks' })).toBe(
      'next-two-weeks',
    );
    expect(contactOptionValue({ label: 'This week' })).toBe('this-week');
  });
});
