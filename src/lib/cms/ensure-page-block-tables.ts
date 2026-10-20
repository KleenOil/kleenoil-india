import type { Payload } from 'payload';

import { pageBlocks } from '@/blocks';
import { migrations } from '@/migrations';

type PostgresDb = {
  drizzle?: {
    execute: (query: unknown) => Promise<unknown>;
  };
  pool?: {
    query: (
      query: string,
      params?: unknown[],
    ) => Promise<{
      rows: Array<{ tablename?: unknown; table_name?: unknown; column_name?: unknown }>;
    }>;
  };
};

type MigrationUp = (args: {
  db: { execute: (query: unknown) => Promise<unknown> };
  payload: Payload;
  req: never;
}) => Promise<void>;

let inFlight: Promise<void> | null = null;
let completedSignature: string | null = null;

/** Idempotent ALTER migrations for new columns on existing page-block tables.
 *  Local DBs used drizzle push, so `payload migrate` cannot apply these.
 *  Hyphenated `pages__blocks_*` names are included because drizzle-push DBs
 *  keep the block slug as-is. Missing tables are skipped, not treated as errors. */
const COLUMN_PATCHES: Array<{ name: string; table: string; column: string }> = [
  {
    name: '20261021_010000_featured_industries_cms_columns',
    table: 'pages_blocks_featured_industries_cards',
    column: 'pdf_id',
  },
  {
    name: '20261021_010000_featured_industries_cms_columns',
    table: 'pages_blocks_featured_industries',
    column: 'view_all_tag',
  },
  {
    name: '20261021_010000_featured_industries_cms_columns',
    table: 'pages__blocks_featured-industries_cards',
    column: 'pdf_id',
  },
  {
    name: '20261021_010000_featured_industries_cms_columns',
    table: 'pages__blocks_featured-industries',
    column: 'view_all_tag',
  },
  {
    name: '20261020_030000_site_settings_loader',
    table: 'site_settings',
    column: 'loader_enabled',
  },
  {
    name: '20261020_030000_site_settings_loader',
    table: 'site_settings',
    column: 'loader_brand_name',
  },
];

/** Slug list used to bust the Payload client cache when page blocks change. */
export function pageBlockSchemaSignature(): string {
  const blocks = pageBlocks.map((block) => block.slug).join(',');
  const columns = COLUMN_PATCHES.map((patch) => `${patch.table}.${patch.column}`).join(',');
  return `${blocks}|${columns}`;
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
    inFlight = applyMissingPageBlockTables(payload).finally(() => {
      inFlight = null;
    });
  }

  await inFlight;
  completedSignature = signature;
}

async function applyMissingPageBlockTables(payload: Payload): Promise<void> {
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
    payload.logger.info(`[cms] Page block tables are in sync (${pageBlocks.length} sections)`);
    await applyMissingPageBlockColumns(payload, db);
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

  await applyMissingPageBlockColumns(payload, db);
}

async function pageBlockTableExists(db: PostgresDb, table: string): Promise<boolean> {
  const result = await db.pool!.query(
    `SELECT 1
     FROM information_schema.tables
     WHERE table_schema = 'public'
       AND table_name = $1`,
    [table],
  );
  return result.rows.length > 0;
}

async function pageBlockColumnExists(
  db: PostgresDb,
  table: string,
  column: string,
): Promise<boolean> {
  const result = await db.pool!.query(
    `SELECT 1
     FROM information_schema.columns
     WHERE table_schema = 'public'
       AND table_name = $1
       AND column_name = $2`,
    [table, column],
  );
  return result.rows.length > 0;
}

async function applyMissingPageBlockColumns(payload: Payload, db: PostgresDb): Promise<void> {
  if (typeof db.pool?.query !== 'function' || typeof db.drizzle?.execute !== 'function') {
    return;
  }

  const needed = COLUMN_PATCHES.filter((patch) =>
    migrations.some((migration) => migration.name === patch.name),
  );
  if (!needed.length) {
    return;
  }

  const toRunNames: string[] = [];
  const existingPatches: typeof needed = [];
  for (const patch of needed) {
    if (!(await pageBlockTableExists(db, patch.table))) {
      continue;
    }
    existingPatches.push(patch);
    const missingColumn = !(await pageBlockColumnExists(db, patch.table, patch.column));
    if (missingColumn && !toRunNames.includes(patch.name)) {
      toRunNames.push(patch.name);
    }
  }

  if (!toRunNames.length) {
    return;
  }

  const toRun = migrations.filter((migration) => toRunNames.includes(migration.name));
  payload.logger.info(`[cms] Applying page-block column patches: ${toRunNames.join(', ')}`);

  for (const migration of toRun) {
    payload.logger.info(`[cms] Applying ${migration.name}`);
    await (migration.up as unknown as MigrationUp)({
      db: db.drizzle,
      payload,
      req: undefined as never,
    });
  }

  const stillMissing: string[] = [];
  for (const patch of existingPatches.filter((item) => toRunNames.includes(item.name))) {
    if (!(await pageBlockColumnExists(db, patch.table, patch.column))) {
      stillMissing.push(`${patch.table}.${patch.column}`);
    }
  }
  if (stillMissing.length) {
    throw new Error(
      `[cms] Page-block columns still missing after migrate: ${stillMissing.join(', ')}`,
    );
  }
}
