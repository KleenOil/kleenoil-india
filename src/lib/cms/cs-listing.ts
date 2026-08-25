export const CASE_STUDY_SECTORS = [
  { label: 'Automotive', value: 'automotive' },
  { label: 'Steel', value: 'steel' },
  { label: 'Marine', value: 'marine' },
  { label: 'Power', value: 'power' },
  { label: 'Cement', value: 'cement' },
  { label: 'Rail', value: 'rail' },
] as const;

export type CaseStudySector = (typeof CASE_STUDY_SECTORS)[number]['value'];

export type CaseStudyListingCard = {
  id?: number | string;
  sector: CaseStudySector;
  tag: string;
  title: string;
  description: string;
  href?: string | null;
  openInNewTab?: boolean;
  location?: string | null;
  imageUrl?: string | null;
  imageAlt?: string;
  metrics: Array<{ value: string; label: string }>;
};
