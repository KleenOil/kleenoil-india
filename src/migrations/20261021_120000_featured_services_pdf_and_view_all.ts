import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
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
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    SELECT 1;
  `);
}
