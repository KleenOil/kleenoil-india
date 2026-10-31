import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE IF EXISTS "pages_blocks_resource_pdfs_cards" ADD COLUMN IF NOT EXISTS "pdf_id" integer;
    ALTER TABLE IF EXISTS "_pages_v_blocks_resource_pdfs_cards" ADD COLUMN IF NOT EXISTS "pdf_id" integer;
    ALTER TABLE IF EXISTS "pages__blocks_resource-pdfs_cards" ADD COLUMN IF NOT EXISTS "pdf_id" integer;
    ALTER TABLE IF EXISTS "_pages_v_blocks_resource-pdfs_cards" ADD COLUMN IF NOT EXISTS "pdf_id" integer;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE IF EXISTS "pages_blocks_resource_pdfs_cards" DROP COLUMN IF EXISTS "pdf_id";
    ALTER TABLE IF EXISTS "_pages_v_blocks_resource_pdfs_cards" DROP COLUMN IF EXISTS "pdf_id";
    ALTER TABLE IF EXISTS "pages__blocks_resource-pdfs_cards" DROP COLUMN IF EXISTS "pdf_id";
    ALTER TABLE IF EXISTS "_pages_v_blocks_resource-pdfs_cards" DROP COLUMN IF EXISTS "pdf_id";
  `);
}
