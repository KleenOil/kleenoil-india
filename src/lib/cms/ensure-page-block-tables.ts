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
    name: '20261021_120000_featured_services_pdf_and_view_all',
    table: 'pages_blocks_featured_services_cards',
    column: 'pdf_id',
  },
  {
    name: '20261021_120000_featured_services_pdf_and_view_all',
    table: 'pages_blocks_featured_services',
    column: 'view_all_tag',
  },
  {
    name: '20261021_120000_featured_services_pdf_and_view_all',
    table: 'pages__blocks_featured-services_cards',
    column: 'pdf_id',
  },
  {
    name: '20261021_120000_featured_services_pdf_and_view_all',
    table: 'pages__blocks_featured-services',
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

/** Raw ALTERs so Vercel still gets PDF + View all columns when `payload migrate` aborts. */
const FEATURED_INDUSTRIES_ALTER_SQL = `
  ALTER TABLE IF EXISTS "pages_blocks_featured_industries_cards" ADD COLUMN IF NOT EXISTS "pdf_id" integer;
  ALTER TABLE IF EXISTS "_pages_v_blocks_featured_industries_cards" ADD COLUMN IF NOT EXISTS "pdf_id" integer;
  ALTER TABLE IF EXISTS "pages__blocks_featured-industries_cards" ADD COLUMN IF NOT EXISTS "pdf_id" integer;
  ALTER TABLE IF EXISTS "_pages_v_blocks_featured-industries_cards" ADD COLUMN IF NOT EXISTS "pdf_id" integer;
  ALTER TABLE IF EXISTS "pages_blocks_featured_industries" ADD COLUMN IF NOT EXISTS "view_all_tag" varchar;
  ALTER TABLE IF EXISTS "pages_blocks_featured_industries" ADD COLUMN IF NOT EXISTS "view_all_title" varchar;
  ALTER TABLE IF EXISTS "pages_blocks_featured_industries" ADD COLUMN IF NOT EXISTS "view_all_description" varchar;
  ALTER TABLE IF EXISTS "pages_blocks_featured_industries" ADD COLUMN IF NOT EXISTS "view_all_cta_label" varchar;
  ALTER TABLE IF EXISTS "pages_blocks_featured_industries" ADD COLUMN IF NOT EXISTS "view_all_href" varchar;
  ALTER TABLE IF EXISTS "_pages_v_blocks_featured_industries" ADD COLUMN IF NOT EXISTS "view_all_tag" varchar;
  ALTER TABLE IF EXISTS "_pages_v_blocks_featured_industries" ADD COLUMN IF NOT EXISTS "view_all_title" varchar;
  ALTER TABLE IF EXISTS "_pages_v_blocks_featured_industries" ADD COLUMN IF NOT EXISTS "view_all_description" varchar;
  ALTER TABLE IF EXISTS "_pages_v_blocks_featured_industries" ADD COLUMN IF NOT EXISTS "view_all_cta_label" varchar;
  ALTER TABLE IF EXISTS "_pages_v_blocks_featured_industries" ADD COLUMN IF NOT EXISTS "view_all_href" varchar;
  ALTER TABLE IF EXISTS "pages__blocks_featured-industries" ADD COLUMN IF NOT EXISTS "view_all_tag" varchar;
  ALTER TABLE IF EXISTS "pages__blocks_featured-industries" ADD COLUMN IF NOT EXISTS "view_all_title" varchar;
  ALTER TABLE IF EXISTS "pages__blocks_featured-industries" ADD COLUMN IF NOT EXISTS "view_all_description" varchar;
  ALTER TABLE IF EXISTS "pages__blocks_featured-industries" ADD COLUMN IF NOT EXISTS "view_all_cta_label" varchar;
  ALTER TABLE IF EXISTS "pages__blocks_featured-industries" ADD COLUMN IF NOT EXISTS "view_all_href" varchar;
  ALTER TABLE IF EXISTS "_pages_v_blocks_featured-industries" ADD COLUMN IF NOT EXISTS "view_all_tag" varchar;
  ALTER TABLE IF EXISTS "_pages_v_blocks_featured-industries" ADD COLUMN IF NOT EXISTS "view_all_title" varchar;
  ALTER TABLE IF EXISTS "_pages_v_blocks_featured-industries" ADD COLUMN IF NOT EXISTS "view_all_description" varchar;
  ALTER TABLE IF EXISTS "_pages_v_blocks_featured-industries" ADD COLUMN IF NOT EXISTS "view_all_cta_label" varchar;
  ALTER TABLE IF EXISTS "_pages_v_blocks_featured-industries" ADD COLUMN IF NOT EXISTS "view_all_href" varchar;
`;

const FEATURED_SERVICES_ALTER_SQL = `
  ALTER TABLE IF EXISTS "pages_blocks_featured_services_cards" ADD COLUMN IF NOT EXISTS "pdf_id" integer;
  ALTER TABLE IF EXISTS "_pages_v_blocks_featured_services_cards" ADD COLUMN IF NOT EXISTS "pdf_id" integer;
  ALTER TABLE IF EXISTS "pages__blocks_featured-services_cards" ADD COLUMN IF NOT EXISTS "pdf_id" integer;
  ALTER TABLE IF EXISTS "_pages_v_blocks_featured-services_cards" ADD COLUMN IF NOT EXISTS "pdf_id" integer;
  ALTER TABLE IF EXISTS "pages_blocks_featured_services" ADD COLUMN IF NOT EXISTS "view_all_tag" varchar;
  ALTER TABLE IF EXISTS "pages_blocks_featured_services" ADD COLUMN IF NOT EXISTS "view_all_title" varchar;
  ALTER TABLE IF EXISTS "pages_blocks_featured_services" ADD COLUMN IF NOT EXISTS "view_all_description" varchar;
  ALTER TABLE IF EXISTS "pages_blocks_featured_services" ADD COLUMN IF NOT EXISTS "view_all_cta_label" varchar;
  ALTER TABLE IF EXISTS "pages_blocks_featured_services" ADD COLUMN IF NOT EXISTS "view_all_href" varchar;
  ALTER TABLE IF EXISTS "_pages_v_blocks_featured_services" ADD COLUMN IF NOT EXISTS "view_all_tag" varchar;
  ALTER TABLE IF EXISTS "_pages_v_blocks_featured_services" ADD COLUMN IF NOT EXISTS "view_all_title" varchar;
  ALTER TABLE IF EXISTS "_pages_v_blocks_featured_services" ADD COLUMN IF NOT EXISTS "view_all_description" varchar;
  ALTER TABLE IF EXISTS "_pages_v_blocks_featured_services" ADD COLUMN IF NOT EXISTS "view_all_cta_label" varchar;
  ALTER TABLE IF EXISTS "_pages_v_blocks_featured_services" ADD COLUMN IF NOT EXISTS "view_all_href" varchar;
  ALTER TABLE IF EXISTS "pages__blocks_featured-services" ADD COLUMN IF NOT EXISTS "view_all_tag" varchar;
  ALTER TABLE IF EXISTS "pages__blocks_featured-services" ADD COLUMN IF NOT EXISTS "view_all_title" varchar;
  ALTER TABLE IF EXISTS "pages__blocks_featured-services" ADD COLUMN IF NOT EXISTS "view_all_description" varchar;
  ALTER TABLE IF EXISTS "pages__blocks_featured-services" ADD COLUMN IF NOT EXISTS "view_all_cta_label" varchar;
  ALTER TABLE IF EXISTS "pages__blocks_featured-services" ADD COLUMN IF NOT EXISTS "view_all_href" varchar;
  ALTER TABLE IF EXISTS "_pages_v_blocks_featured-services" ADD COLUMN IF NOT EXISTS "view_all_tag" varchar;
  ALTER TABLE IF EXISTS "_pages_v_blocks_featured-services" ADD COLUMN IF NOT EXISTS "view_all_title" varchar;
  ALTER TABLE IF EXISTS "_pages_v_blocks_featured-services" ADD COLUMN IF NOT EXISTS "view_all_description" varchar;
  ALTER TABLE IF EXISTS "_pages_v_blocks_featured-services" ADD COLUMN IF NOT EXISTS "view_all_cta_label" varchar;
  ALTER TABLE IF EXISTS "_pages_v_blocks_featured-services" ADD COLUMN IF NOT EXISTS "view_all_href" varchar;
`;

const LOADER_ALTER_SQL = `
  ALTER TABLE IF EXISTS "site_settings" ADD COLUMN IF NOT EXISTS "loader_enabled" boolean DEFAULT true;
  ALTER TABLE IF EXISTS "site_settings" ADD COLUMN IF NOT EXISTS "loader_brand_name" varchar;
  ALTER TABLE IF EXISTS "site_settings" ADD COLUMN IF NOT EXISTS "loader_show_on_first_load" boolean DEFAULT false;
  ALTER TABLE IF EXISTS "site_settings" ADD COLUMN IF NOT EXISTS "loader_status_text" varchar;
  ALTER TABLE IF EXISTS "site_settings" ADD COLUMN IF NOT EXISTS "loader_system_code" varchar;
  ALTER TABLE IF EXISTS "site_settings" ADD COLUMN IF NOT EXISTS "loader_system_code_mobile" varchar;
  ALTER TABLE IF EXISTS "site_settings" ADD COLUMN IF NOT EXISTS "loader_version_label" varchar;
  ALTER TABLE IF EXISTS "site_settings" ADD COLUMN IF NOT EXISTS "loader_corner_brand" varchar;
  ALTER TABLE IF EXISTS "site_settings" ADD COLUMN IF NOT EXISTS "loader_corner_brand_mobile" varchar;
  ALTER TABLE IF EXISTS "site_settings" ADD COLUMN IF NOT EXISTS "loader_tagline" varchar;
  ALTER TABLE IF EXISTS "site_settings" ADD COLUMN IF NOT EXISTS "loader_tagline_mobile" varchar;
  ALTER TABLE IF EXISTS "site_settings" ADD COLUMN IF NOT EXISTS "loader_min_duration_ms" numeric;
`;

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
    inFlight = applyMissingPageBlockTables(payload)
      .catch((error) => {
        payload.logger.error(
          `[cms] Could not sync page-block schema: ${error instanceof Error ? error.message : String(error)}`,
        );
      })
      .finally(() => {
        inFlight = null;
      });
  }

  await inFlight;
  completedSignature = signature;
}

async function applyMissingPageBlockTables(payload: Payload): Promise<void> {
  const db = payload.db as PostgresDb;
  if (typeof db.pool?.query !== 'function') {
    return;
  }

  if (typeof db.drizzle?.execute !== 'function') {
    await applyMissingPageBlockColumns(payload, db);
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
    payload.logger.warn(
      `[cms] Missing page block tables with no matching *_page_blocks migration: ${missing.join(', ')}`,
    );
    await applyMissingPageBlockColumns(payload, db);
    return;
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
    payload.logger.warn(
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
  if (typeof db.pool?.query !== 'function') {
    return;
  }

  payload.logger.info('[cms] Applying Featured Industries / Services / loader column patches');
  await db.pool.query(FEATURED_INDUSTRIES_ALTER_SQL);
  await db.pool.query(FEATURED_SERVICES_ALTER_SQL);
  await db.pool.query(LOADER_ALTER_SQL);

  const stillMissing: string[] = [];
  for (const patch of COLUMN_PATCHES) {
    if (!(await pageBlockTableExists(db, patch.table))) {
      continue;
    }
    if (!(await pageBlockColumnExists(db, patch.table, patch.column))) {
      stillMissing.push(`${patch.table}.${patch.column}`);
    }
  }
  if (stillMissing.length) {
    payload.logger.warn(
      `[cms] Page-block columns still missing after patch: ${stillMissing.join(', ')}`,
    );
  }
}
