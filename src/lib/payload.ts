import config from '@payload-config';
import { getPayload, type Payload } from 'payload';

import {
  ensurePageBlockTables,
  pageBlockSchemaSignature,
} from '@/lib/cms/ensure-page-block-tables';
import { canReachDatabase, CmsUnavailableError, isCmsUnavailable } from '@/lib/cms/unavailable';

// Reuse the Payload client across requests on the same serverless instance and
// across Next.js dev HMR reloads. Without a global cache, each request would
// re-init Postgres + admin config, blowing up cold-start latency on Vercel.
type GlobalWithPayload = typeof globalThis & {
  __kleenoilPayload?: {
    client: Payload | null;
    promise: Promise<Payload> | null;
    signature: string;
    version: number;
    skipUntil: number;
    warnedOffline: boolean;
  };
};

function configSignature(): string {
  const collections =
    (config as { collections?: Array<{ slug: string }> }).collections
      ?.map((collection) => collection.slug)
      .join(',') ?? '';
  return `${collections}|${pageBlockSchemaSignature()}`;
}

const PAYLOAD_CACHE_VERSION = 2;
const globalCache: GlobalWithPayload = globalThis as GlobalWithPayload;
const signature = configSignature();
if (
  !globalCache.__kleenoilPayload ||
  globalCache.__kleenoilPayload.signature !== signature ||
  globalCache.__kleenoilPayload.version !== PAYLOAD_CACHE_VERSION
) {
  globalCache.__kleenoilPayload = {
    client: null,
    promise: null,
    signature,
    version: PAYLOAD_CACHE_VERSION,
    skipUntil: 0,
    warnedOffline: false,
  };
}

function markUnavailable() {
  const cache = globalCache.__kleenoilPayload!;
  cache.promise = null;
  cache.skipUntil = Date.now() + 15_000;
  if (!cache.warnedOffline) {
    cache.warnedOffline = true;
    console.warn('[cms] Database unavailable; using fallback content until Postgres is reachable.');
  }
}

export async function getPayloadClient(): Promise<Payload> {
  const cache = globalCache.__kleenoilPayload!;
  if (cache.client) {
    return cache.client;
  }

  if (Date.now() < cache.skipUntil) {
    throw new CmsUnavailableError();
  }

  if (process.env.NODE_ENV !== 'production' && !(await canReachDatabase())) {
    markUnavailable();
    throw new CmsUnavailableError();
  }

  if (!cache.promise) {
    cache.promise = (async () => {
      try {
        const client = await getPayload({ config });
        await ensurePageBlockTables(client);
        cache.client = client;
        cache.warnedOffline = false;
        return client;
      } catch (error) {
        cache.promise = null;
        if (isCmsUnavailable(error)) {
          markUnavailable();
          throw new CmsUnavailableError();
        }
        throw error;
      }
    })();
  }

  return cache.promise;
}
