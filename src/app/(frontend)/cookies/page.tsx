import type { Metadata } from 'next';

import { LegalDocument } from '@/components/legal/LegalDocument';
import { COOKIE_POLICY } from '@/lib/legal/content';

export const metadata: Metadata = {
  title: COOKIE_POLICY.title,
  description: COOKIE_POLICY.description,
};

export default function CookiesPage() {
  return <LegalDocument document={COOKIE_POLICY} />;
}
