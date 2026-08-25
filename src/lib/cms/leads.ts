import { CASE_STUDY_SECTORS } from '@/lib/cms/cs-listing';

export const LEAD_INDUSTRIES = CASE_STUDY_SECTORS;

export const LEAD_TIMINGS = [
  { label: 'This week', value: 'this-week' },
  { label: 'Next 2 weeks', value: 'next-two-weeks' },
  { label: 'Flexible', value: 'flexible' },
] as const;

export const LEAD_STATUSES = [
  { label: 'New', value: 'new' },
  { label: 'Contacted', value: 'contacted' },
  { label: 'Closed', value: 'closed' },
] as const;

export type LeadIndustry = (typeof LEAD_INDUSTRIES)[number]['value'];
export type LeadTiming = (typeof LEAD_TIMINGS)[number]['value'];
export type LeadStatus = (typeof LEAD_STATUSES)[number]['value'];

export type ConsultationLeadInput = {
  name: string;
  email: string;
  company?: string;
  plant?: string;
  industry: LeadIndustry;
  timing: LeadTiming;
  message: string;
  website?: string;
};

export function industryLabel(value: string | null | undefined): string {
  return LEAD_INDUSTRIES.find((item) => item.value === value)?.label ?? value ?? '—';
}

export function timingLabel(value: string | null | undefined): string {
  return LEAD_TIMINGS.find((item) => item.value === value)?.label ?? value ?? '—';
}
