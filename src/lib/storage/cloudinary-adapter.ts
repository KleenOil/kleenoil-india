import type { Adapter, GeneratedAdapter } from '@payloadcms/plugin-cloud-storage/types';
import { v2 as cloudinary } from 'cloudinary';

type CloudinaryAdapterArgs = {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  folder?: string;
};

function publicIdFor(filename: string, folder: string, prefix?: string): string {
  const baseName = filename.replace(/\.[^/.]+$/, '');
  const segments = [folder, prefix, baseName].filter(Boolean);
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
        const resourceType = guessResourceType(file.mimeType);

        await new Promise<void>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              public_id: publicId,
              resource_type: resourceType,
              overwrite: true,
              invalidate: true,
            },
            (error) => {
              if (error) {
                reject(error);
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
