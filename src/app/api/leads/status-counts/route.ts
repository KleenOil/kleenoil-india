import { NextResponse } from 'next/server';
import { headers as nextHeaders } from 'next/headers';

import { LEAD_STATUSES, type LeadStatus } from '@/lib/cms/leads';
import { getPayloadClient } from '@/lib/payload';

export const dynamic = 'force-dynamic';

const EMPTY: Record<LeadStatus, number> = { new: 0, contacted: 0, closed: 0 };

export async function GET() {
  try {
    const payload = await getPayloadClient();
    const headerStore = await nextHeaders();
    const { user } = await payload.auth({ headers: headerStore });

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const counts = await Promise.all(
      LEAD_STATUSES.map(async (status) => {
        const result = await payload.count({
          collection: 'leads',
          where: { status: { equals: status.value } },
          overrideAccess: false,
          user,
        });
        return [status.value, result.totalDocs] as const;
      }),
    );

    return NextResponse.json(Object.fromEntries(counts) as Record<LeadStatus, number>);
  } catch (error) {
    console.warn('[leads/status-counts]', error instanceof Error ? error.message : error);
    return NextResponse.json(EMPTY);
  }
}
