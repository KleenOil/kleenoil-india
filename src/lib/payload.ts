import config from '@payload-config';
import { getPayload, type Payload } from 'payload';

// Reuse the Payload client across requests on the same serverless instance and
// across Next.js dev HMR reloads. Without a global cache, each request would
// re-init Postgres + admin config, blowing up cold-start latency on Vercel.
type GlobalWithPayload = typeof globalThis & {
  __kleenoilPayload?: {
    client: Payload | null;
    promise: Promise<Payload> | null;
  };
};

const globalCache: GlobalWithPayload = globalThis as GlobalWithPayload;
if (!globalCache.__kleenoilPayload) {
  globalCache.__kleenoilPayload = { client: null, promise: null };
}

export async function getPayloadClient(): Promise<Payload> {
  const cache = globalCache.__kleenoilPayload!;
  if (cache.client) {
    return cache.client;
  }
  if (!cache.promise) {
    cache.promise = getPayload({ config })
      .then((client) => {
        cache.client = client;
        return client;
      })
      .catch((error) => {
        cache.promise = null;
        throw error;
      });
  }
  return cache.promise;
}
