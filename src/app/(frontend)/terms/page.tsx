import type { Metadata } from 'next';

import { LegalDocument } from '@/components/legal/LegalDocument';
import { TERMS_OF_USE } from '@/lib/legal/content';

export const metadata: Metadata = {
  title: TERMS_OF_USE.title,
  description: TERMS_OF_USE.description,
};

export default function TermsPage() {
  return <LegalDocument document={TERMS_OF_USE} />;
}
