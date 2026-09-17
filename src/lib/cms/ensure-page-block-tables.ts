import type { Payload } from 'payload';

import { pageBlocks } from '@/blocks';
import { migrations } from '@/migrations';

type PostgresDb = {
  drizzle?: {
    execute: (query: unknown) => Promise<unknown>;
  };
  pool?: {
    query: (query: string, params?: unknown[]) => Promise<{ rows: Array<{ tablename?: unknown }> }>;
  };
};

type MigrationUp = (args: {
  db: { execute: (query: unknown) => Promise<unknown> };
  payload: Payload;
  req: never;
}) => Promise<void>;

let inFlight: Promise<void> | null = null;
let completedSignature: string | null = null;

/** Slug list used to bust the Payload client cache when page blocks change. */
export function pageBlockSchemaSignature(): string {
  return pageBlocks.map((block) => block.slug).join(',');
}

export function pageBlockTableNames(slug: string): string[] {
  const name = slug.replace(/-/g, '_');
  return [`pages_blocks_${name}`, `_pages_v_blocks_${name}`];
}

export function migrationCoversTable(migrationName: string, table: string): boolean {
  const suffix = table.replace(/^_pages_v_blocks_/, '').replace(/^pages_blocks_/, '');
  if (migrationName.includes(suffix)) {
    return true;
  }

  const family = suffix.split('_')[0];
  return Boolean(family) && migrationName.includes(`${family}_page_blocks`);
}

/**
 * Creates missing `pages_blocks_*` tables before admin or frontend queries them.
 * Local DBs were originally pushed, so `payload migrate` cannot catch up from
 * the initial migration. New page sections must ship an idempotent
 * `*_page_blocks` migration (CREATE TABLE IF NOT EXISTS).
 */
export async function ensurePageBlockTables(payload: Payload): Promise<void> {
  const signature = pageBlockSchemaSignature();
  if (completedSignature === signature) {
    return;
  }

  if (!inFlight) {
    inFlight = applyMissingPageBlockTables(payload, signature).finally(() => {
      inFlight = null;
    });
  }

  await inFlight;
  completedSignature = signature;
}

async function applyMissingPageBlockTables(payload: Payload, signature: string): Promise<void> {
  const db = payload.db as PostgresDb;
  if (typeof db.pool?.query !== 'function' || typeof db.drizzle?.execute !== 'function') {
    return;
  }

  const required = [...new Set(pageBlocks.flatMap((block) => pageBlockTableNames(block.slug)))];

  const result = await db.pool.query(
    `SELECT tablename
     FROM pg_tables
     WHERE schemaname = 'public'
       AND tablename = ANY($1::text[])`,
    [required],
  );
  const existing = new Set(
    result.rows.map((row) => (typeof row.tablename === 'string' ? row.tablename : '')),
  );
  const missing = required.filter((table) => !existing.has(table));

  if (!missing.length) {
    payload.logger.info(
      `[cms] Page block tables are in sync (${signature.split(',').length} sections)`,
    );
    return;
  }

  const toRun = migrations.filter((migration) =>
    missing.some((table) => migrationCoversTable(migration.name, table)),
  );

  if (!toRun.length) {
    throw new Error(
      `[cms] Missing page block tables with no matching *_page_blocks migration: ${missing.join(', ')}`,
    );
  }

  payload.logger.info(`[cms] Creating missing page block tables: ${missing.join(', ')}`);

  for (const migration of toRun) {
    payload.logger.info(`[cms] Applying ${migration.name}`);
    await (migration.up as unknown as MigrationUp)({
      db: db.drizzle,
      payload,
      req: undefined as never,
    });
  }

  const after = await db.pool.query(
    `SELECT tablename
     FROM pg_tables
     WHERE schemaname = 'public'
       AND tablename = ANY($1::text[])`,
    [missing],
  );
  const created = new Set(
    after.rows.map((row) => (typeof row.tablename === 'string' ? row.tablename : '')),
  );
  const stillMissing = missing.filter((table) => !created.has(table));
  if (stillMissing.length) {
    throw new Error(
      `[cms] Page block tables still missing after migrate: ${stillMissing.join(', ')}`,
    );
  }
}
