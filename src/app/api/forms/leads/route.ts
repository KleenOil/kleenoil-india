import { NextResponse } from 'next/server';
import { z } from 'zod';

import { LEAD_INDUSTRIES, LEAD_TIMINGS, type ConsultationLeadInput } from '@/lib/cms/leads';
import { sendLeadNotification } from '@/lib/email/send-lead';
import { getServerEnv } from '@/lib/env';
import { getPayloadClient } from '@/lib/payload';
import { checkRateLimit, getClientIp } from '@/lib/security/rate-limit';

export const dynamic = 'force-dynamic';

const industryValues = LEAD_INDUSTRIES.map((item) => item.value) as [
  (typeof LEAD_INDUSTRIES)[number]['value'],
  ...(typeof LEAD_INDUSTRIES)[number]['value'][],
];
const timingValues = LEAD_TIMINGS.map((item) => item.value) as [
  (typeof LEAD_TIMINGS)[number]['value'],
  ...(typeof LEAD_TIMINGS)[number]['value'][],
];

const leadSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  email: z.string().email('Enter a valid work email').max(160),
  company: z.string().trim().max(160).optional(),
  plant: z.string().trim().max(160).optional(),
  industry: z.enum(industryValues),
  timing: z.enum(timingValues),
  message: z.string().trim().min(1, 'Tell us what to look at').max(4000),
  website: z.string().optional(),
});

function emptyToUndefined(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
}

export async function POST(request: Request) {
  const env = getServerEnv();
  const ip = getClientIp(request.headers);
  const rateLimit = checkRateLimit(`leads:${ip}`, {
    max: env.RATE_LIMIT_MAX,
    windowMs: env.RATE_LIMIT_WINDOW_MS,
  });

  if (!rateLimit.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const parsed = leadSchema.safeParse({
    ...(body && typeof body === 'object' ? body : {}),
    company: emptyToUndefined((body as { company?: unknown })?.company),
    plant: emptyToUndefined((body as { plant?: unknown })?.plant),
    website: emptyToUndefined((body as { website?: unknown })?.website),
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Please check the form and try again.' },
      { status: 400 },
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const lead: ConsultationLeadInput = {
    name: parsed.data.name,
    email: parsed.data.email,
    company: parsed.data.company,
    plant: parsed.data.plant,
    industry: parsed.data.industry,
    timing: parsed.data.timing,
    message: parsed.data.message,
  };

  try {
    const payload = await getPayloadClient();
    await payload.create({
      collection: 'leads',
      data: {
        name: lead.name,
        email: lead.email,
        company: lead.company,
        plant: lead.plant,
        industry: lead.industry,
        timing: lead.timing,
        message: lead.message,
        status: 'new',
        source: 'consultation',
      },
      overrideAccess: true,
    });
  } catch (error) {
    console.error('[leads] failed to save lead', error);
    return NextResponse.json(
      { error: 'Could not save your request. Please try again or call the engineering desk.' },
      { status: 500 },
    );
  }

  try {
    await sendLeadNotification(lead);
  } catch (error) {
    console.error('[leads] saved but email failed', error);
  }

  return NextResponse.json({ ok: true });
}
