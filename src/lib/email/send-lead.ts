import { getServerEnv } from '@/lib/env';
import { getPayloadClient } from '@/lib/payload';
import { industryLabel, timingLabel, type ConsultationLeadInput } from '@/lib/cms/leads';
import type { SiteSetting } from '@/payload-types';

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function parseRecipients(value: string | null | undefined): string[] {
  return (value ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.includes('@'));
}

async function getNotificationRecipients(): Promise<string[]> {
  const env = getServerEnv();

  try {
    const payload = await getPayloadClient();
    const settings = (await payload
      .findGlobal({ slug: 'site-settings' })
      .catch(() => null)) as SiteSetting | null;
    const fromCms = parseRecipients(settings?.leadNotificationEmail);
    if (fromCms.length) {
      return fromCms;
    }
  } catch (error) {
    console.error('[leads] could not read Site Settings notification email', error);
  }

  return parseRecipients(env.EMAIL_TO_SALES);
}

function buildEmail(lead: ConsultationLeadInput) {
  const rows: Array<[string, string]> = [
    ['Name', lead.name],
    ['Email', lead.email],
    ['Company', lead.company || '—'],
    ['Plant / site', lead.plant || '—'],
    ['Industry', industryLabel(lead.industry)],
    ['Timing', timingLabel(lead.timing)],
    ['Message', lead.message],
  ];

  const text = [
    'New consultation request from kleenoil.in',
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
  ].join('\n');

  const html = `
    <div style="font-family:Arial,sans-serif;color:#003319;line-height:1.5">
      <p style="font-size:12px;letter-spacing:1.4px;font-weight:700;color:#006633;text-transform:uppercase;margin:0 0 8px">
        Consultation request
      </p>
      <h1 style="font-size:22px;margin:0 0 16px">New lead from the contact form</h1>
      <table style="border-collapse:collapse;width:100%;max-width:560px">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:8px 12px 8px 0;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#4d6b5c;vertical-align:top;white-space:nowrap">
              ${escapeHtml(label)}
            </td>
            <td style="padding:8px 0;font-size:15px;white-space:pre-wrap">${escapeHtml(value)}</td>
          </tr>`,
          )
          .join('')}
      </table>
    </div>
  `;

  return {
    subject: `Consultation request — ${lead.name}${lead.company ? ` · ${lead.company}` : ''}`,
    text,
    html,
  };
}

async function sendWithResend(options: {
  from: string;
  to: string[];
  replyTo: string;
  subject: string;
  html: string;
  text: string;
  apiKey: string;
}): Promise<void> {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${options.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: options.from,
      to: options.to,
      reply_to: options.replyTo,
      subject: options.subject,
      html: options.html,
      text: options.text,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend ${response.status}: ${body.slice(0, 400)}`);
  }
}

/** Delivers a lead notification. Callers should catch — the lead is already saved. */
export async function sendLeadNotification(lead: ConsultationLeadInput): Promise<void> {
  const env = getServerEnv();
  const to = await getNotificationRecipients();

  if (!to.length) {
    throw new Error('No lead notification inbox is set in Site Settings or EMAIL_TO_SALES');
  }

  const email = buildEmail(lead);

  if (!env.RESEND_API_KEY) {
    throw new Error(
      'RESEND_API_KEY is not set. Consultation emails are sent through Resend even if EMAIL_PROVIDER=smtp.',
    );
  }

  await sendWithResend({
    from: env.EMAIL_FROM,
    to,
    replyTo: lead.email,
    ...email,
    apiKey: env.RESEND_API_KEY,
  });
}
