import type { Metadata } from 'next';

import { LegalDocument } from '@/components/legal/LegalDocument';
import { COMPLIANCE_NOTICE } from '@/lib/legal/content';

export const metadata: Metadata = {
  title: COMPLIANCE_NOTICE.title,
  description: COMPLIANCE_NOTICE.description,
};

export default function CompliancePage() {
  return <LegalDocument document={COMPLIANCE_NOTICE} />;
}
