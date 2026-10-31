import type { Metadata } from 'next';

import { LegalDocument } from '@/components/legal/LegalDocument';
import { PRIVACY_POLICY } from '@/lib/legal/content';

export const metadata: Metadata = {
  title: PRIVACY_POLICY.title,
  description: PRIVACY_POLICY.description,
};

export default function PrivacyPage() {
  return <LegalDocument document={PRIVACY_POLICY} />;
}
