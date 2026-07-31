import type { Plugin } from 'payload';
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage';
import { s3Storage } from '@payloadcms/storage-s3';

import type { ServerEnv } from '@/lib/env';
import { cloudinaryAdapter } from '@/lib/storage/cloudinary-adapter';

/** Storage plugins for Media uploads (local disk is used when this returns []). */
export function getStoragePlugins(env: ServerEnv): Plugin[] {
  if (env.STORAGE_PROVIDER === 'cloudinary') {
    return [
      cloudStoragePlugin({
        enabled: true,
        collections: {
          media: {
            adapter: cloudinaryAdapter({
              cloudName: env.CLOUDINARY_CLOUD_NAME!,
              apiKey: env.CLOUDINARY_API_KEY!,
              apiSecret: env.CLOUDINARY_API_SECRET!,
              folder: 'kleenoil',
            }),
            disableLocalStorage: true,
            // Media is public (`read: anyone`) — serve CDN URLs directly.
            disablePayloadAccessControl: true,
          },
        },
      }),
    ];
  }

  if (env.STORAGE_PROVIDER === 's3') {
    return [
      s3Storage({
        enabled: true,
        collections: {
          media: true,
        },
        bucket: env.S3_BUCKET!,
        // Helps avoid Vercel’s ~4.5MB serverless upload body limit.
        clientUploads: Boolean(process.env.VERCEL),
        acl: 'public-read',
        config: {
          credentials: {
            accessKeyId: env.S3_ACCESS_KEY_ID!,
            secretAccessKey: env.S3_SECRET_ACCESS_KEY!,
          },
          region: env.S3_REGION!,
          ...(env.S3_ENDPOINT
            ? {
                endpoint: env.S3_ENDPOINT,
                forcePathStyle: true,
              }
            : {}),
        },
      }),
    ];
  }

  return [];
}
