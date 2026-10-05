import net from 'node:net';

/** Thrown when Postgres is down so pages can use fallback content. */
export class CmsUnavailableError extends Error {
  constructor() {
    super('CMS database is unavailable');
    this.name = 'CmsUnavailableError';
  }
}

export function isCmsUnavailable(error: unknown): boolean {
  if (
    error instanceof CmsUnavailableError ||
    (typeof error === 'object' &&
      error !== null &&
      'name' in error &&
      (error as { name?: unknown }).name === 'CmsUnavailableError')
  ) {
    return true;
  }

  const message = error instanceof Error ? error.message : String(error ?? '');
  const code =
    error && typeof error === 'object' && 'code' in error
      ? String((error as { code?: unknown }).code)
      : '';

  if (
    code === 'ECONNREFUSED' ||
    code === 'ENOTFOUND' ||
    code === 'ETIMEDOUT' ||
    code === 'ECONNRESET' ||
    message.includes('cannot connect to Postgres') ||
    message.includes('ECONNREFUSED') ||
    message.includes('CMS database is unavailable')
  ) {
    return true;
  }

  const cause =
    error && typeof error === 'object' && 'cause' in error
      ? (error as { cause?: unknown }).cause
      : undefined;
  return Boolean(cause) && cause !== error && isCmsUnavailable(cause);
}

export function logCmsFailure(scope: string, error: unknown) {
  if (isCmsUnavailable(error)) {
    return;
  }

  const message = error instanceof Error ? error.message : String(error ?? 'unknown error');
  console.warn(`[cms] ${scope} failed: ${message}`);
}

function databaseHost(): { host: string; port: number } | null {
  const url = process.env.DATABASE_URL;
  if (!url) {
    return null;
  }

  try {
    const parsed = new URL(url);
    return {
      host: parsed.hostname || '127.0.0.1',
      port: Number(parsed.port || 5432),
    };
  } catch {
    return null;
  }
}

/** Cheap TCP check so we do not boot Payload (and its error overlay) when Postgres is down. */
export function canReachDatabase(timeoutMs = 1200): Promise<boolean> {
  const target = databaseHost();
  if (!target) {
    return Promise.resolve(false);
  }

  return new Promise((resolve) => {
    const socket = net.connect({ host: target.host, port: target.port });
    let settled = false;
    const finish = (ok: boolean) => {
      if (settled) {
        return;
      }
      settled = true;
      socket.removeAllListeners();
      socket.destroy();
      resolve(ok);
    };

    socket.setTimeout(timeoutMs);
    socket.once('connect', () => finish(true));
    socket.once('timeout', () => finish(false));
    socket.once('error', () => finish(false));
  });
}
