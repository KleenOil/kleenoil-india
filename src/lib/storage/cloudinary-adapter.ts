import type { Adapter, GeneratedAdapter } from '@payloadcms/plugin-cloud-storage/types';
import { v2 as cloudinary } from 'cloudinary';

type CloudinaryAdapterArgs = {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  folder?: string;
};

/**
 * Cloudinary rejects or mangles public ids with `&`, spaces, and most punctuation
 * (e.g. "Pulp & Paper.pdf"). Keep a stable, URL-safe segment.
 */
function sanitizePublicIdSegment(name: string): string {
  const cleaned = name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[-.]+|[-.]+$/g, '');

  return cleaned || 'file';
}

/**
 * Cloudinary raw public IDs are stored without the file extension
 * (matches earlier uploads). Delivery Content-Type is fixed by `/api/pdf/[id]`.
 */
function publicIdFor(filename: string, folder: string, prefix?: string): string {
  const baseName = sanitizePublicIdSegment(filename.replace(/\.[^/.]+$/, ''));
  const safePrefix = prefix ? sanitizePublicIdSegment(prefix.replace(/\/+/g, '-')) : '';
  const segments = [folder, safePrefix, baseName].filter(Boolean);
  return segments.join('/');
}

function guessResourceType(mimeType?: string | null): 'image' | 'video' | 'raw' {
  if (!mimeType) {
    return 'image';
  }
  if (mimeType.startsWith('video/')) {
    return 'video';
  }
  if (mimeType.startsWith('image/')) {
    return 'image';
  }
  return 'raw';
}

/**
 * Cloudinary adapter for Payload cloud-storage plugin.
 * Required on Vercel — local disk uploads are not persisted there.
 */
export function cloudinaryAdapter(args: CloudinaryAdapterArgs): Adapter {
  const { cloudName, apiKey, apiSecret, folder = 'kleenoil' } = args;

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  return ({ prefix }): GeneratedAdapter => {
    return {
      name: 'cloudinary',
      async handleUpload({ file }) {
        const publicId = publicIdFor(file.filename, folder, prefix);
        // Treat anything that looks like a PDF as raw — some clients send a non-pdf mime.
        const looksLikePdf =
          file.mimeType?.toLowerCase().includes('pdf') ||
          file.filename.toLowerCase().endsWith('.pdf');
        const resourceType = looksLikePdf ? 'raw' : guessResourceType(file.mimeType);

        await new Promise<void>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              public_id: publicId,
              resource_type: resourceType,
              overwrite: true,
              invalidate: true,
              // Avoid Cloudinary treating the raw name as a path expression.
              use_filename: false,
              unique_filename: false,
            },
            (error) => {
              if (error) {
                reject(
                  new Error(
                    `Cloudinary upload failed for "${file.filename}" → ${publicId}: ${
                      error.message || String(error)
                    }`,
                  ),
                );
                return;
              }
              resolve();
            },
          );

          stream.end(file.buffer);
        });
      },
      async handleDelete({ filename, doc }) {
        const publicId = publicIdFor(filename, folder, doc.prefix || prefix);
        const mimeType = 'mimeType' in doc ? String(doc.mimeType ?? '') : '';
        const resourceType = guessResourceType(mimeType);

        try {
          await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType,
            invalidate: true,
          });
        } catch {
          // Best-effort cleanup — file may already be gone or type mismatched.
        }
      },
      generateURL({ filename, prefix: docPrefix, data }) {
        const publicId = publicIdFor(filename, folder, docPrefix || prefix);
        const mimeType = data && typeof data === 'object' ? String(data.mimeType ?? '') : '';
        const resourceType = guessResourceType(mimeType);

        return cloudinary.url(publicId, {
          secure: true,
          resource_type: resourceType,
        });
      },
      staticHandler: async () =>
        new Response('Cloudinary storage serves files via CDN URLs.', { status: 404 }),
    };
  };
}
