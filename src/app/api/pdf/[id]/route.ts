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

function toAbsolute(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return new URL(url, process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').toString();
}

/**
 * Cloudinary raw PDFs were historically saved without a `.pdf` public-id suffix.
 * Stored URLs may still end in `.pdf` and 404 — try both forms (and a few variants).
 */
function cloudinaryPdfCandidates(sourceUrl: string, filename?: string | null): string[] {
  const candidates: string[] = [];
  const push = (value: string) => {
    if (value && !candidates.includes(value)) {
      candidates.push(value);
    }
  };

  push(sourceUrl);

  try {
    const parsed = new URL(sourceUrl);
    if (parsed.hostname.includes('cloudinary.com')) {
      // Strip trailing .pdf from the public id path.
      if (/\.pdf$/i.test(parsed.pathname)) {
        const stripped = new URL(parsed.toString());
        stripped.pathname = parsed.pathname.replace(/\.pdf$/i, '');
        push(stripped.toString());
      }

      // Rebuild raw delivery URL without version / query noise.
      const match = parsed.pathname.match(/\/(raw|image|video)\/upload\/(?:v\d+\/)?(.+)$/i);
      if (match) {
        const publicPath = match[2].replace(/\.pdf$/i, '');
        push(`${parsed.origin}/raw/upload/${publicPath}`);
        push(`${parsed.origin}/raw/upload/v1/${publicPath}`);
        if (filename) {
          const base = filename.replace(/\.[^/.]+$/, '');
          const folderMatch = publicPath.match(/^(.+)\//);
          const folder = folderMatch?.[1];
          if (folder && base) {
            push(`${parsed.origin}/raw/upload/${folder}/${base}`);
            push(`${parsed.origin}/raw/upload/v1/${folder}/${base}`);
          }
        }
      }
    }
  } catch {
    // Keep the original candidate only.
  }

  return candidates;
}

async function fetchFirstOk(urls: string[]): Promise<Response | null> {
  for (const url of urls) {
    try {
      const response = await fetch(url, {
        cache: 'no-store',
        redirect: 'follow',
        headers: { Accept: 'application/pdf,application/octet-stream,*/*' },
      });
      if (response.ok) {
        return response;
      }
    } catch {
      // Try the next candidate.
    }
  }
  return null;
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
    const filename = media.filename?.toLowerCase() ?? '';
    if (!mime.includes('pdf') && !filename.endsWith('.pdf')) {
      return NextResponse.json({ error: 'Not a PDF' }, { status: 415 });
    }

    const sourceUrl = getMediaUrl(media);
    if (!sourceUrl) {
      return NextResponse.json({ error: 'PDF file missing' }, { status: 404 });
    }

    const absolute = toAbsolute(sourceUrl);
    const candidates = cloudinaryPdfCandidates(absolute, media.filename);
    const upstream = await fetchFirstOk(candidates);
    if (!upstream) {
      return NextResponse.json(
        { error: 'Could not fetch PDF', tried: candidates.length },
        { status: 502 },
      );
    }

    const body = await upstream.arrayBuffer();
    const outName = pdfFilename(media);

    return new Response(body, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${outName.replace(/"/g, '')}"`,
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
