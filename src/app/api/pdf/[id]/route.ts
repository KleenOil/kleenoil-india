import { NextResponse } from 'next/server';

import { getPayloadClient } from '@/lib/payload';
import { getMediaUrl } from '@/lib/cms/links';
import { isCmsUnavailable } from '@/lib/cms/unavailable';
import type { Media } from '@/payload-types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function pdfFilename(media: Media): string {
  const raw = media.filename?.split(/[/\\]/).pop() || media.alt || `document-${media.id}`;
  return raw.toLowerCase().endsWith('.pdf') ? raw : `${raw.replace(/\.[^.]+$/, '') || raw}.pdf`;
}

/**
 * Serve uploaded PDFs with the correct Content-Type and inline disposition
 * so browsers open them in a tab instead of saving as a nameless binary.
 */
export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
): Promise<Response> {
  const { id: rawId } = await context.params;
  const id = Number(rawId);
  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json({ error: 'Invalid PDF id' }, { status: 400 });
  }

  try {
    const payload = await getPayloadClient();
    const media = (await payload.findByID({
      collection: 'media',
      id,
      depth: 0,
      overrideAccess: false,
    })) as Media | null;

    if (!media) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const mime = media.mimeType?.toLowerCase() ?? '';
    if (!mime.includes('pdf')) {
      return NextResponse.json({ error: 'Not a PDF' }, { status: 415 });
    }

    const sourceUrl = getMediaUrl(media);
    if (!sourceUrl) {
      return NextResponse.json({ error: 'PDF file missing' }, { status: 404 });
    }

    const absolute =
      sourceUrl.startsWith('http://') || sourceUrl.startsWith('https://')
        ? sourceUrl
        : new URL(
            sourceUrl,
            process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
          ).toString();

    const upstream = await fetch(absolute, { cache: 'force-cache' });
    if (!upstream.ok) {
      return NextResponse.json({ error: 'Could not fetch PDF' }, { status: 502 });
    }

    const body = await upstream.arrayBuffer();
    const filename = pdfFilename(media);

    return new Response(body, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${filename.replace(/"/g, '')}"`,
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
        'Content-Length': String(body.byteLength),
      },
    });
  } catch (error) {
    if (isCmsUnavailable(error)) {
      return NextResponse.json({ error: 'CMS unavailable' }, { status: 503 });
    }
    console.error('[api/pdf] failed', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
