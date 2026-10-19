import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "loader_enabled" boolean DEFAULT true;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "loader_brand_name" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "loader_show_on_first_load" boolean DEFAULT false;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "loader_status_text" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "loader_system_code" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "loader_system_code_mobile" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "loader_version_label" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "loader_corner_brand" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "loader_corner_brand_mobile" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "loader_tagline" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "loader_tagline_mobile" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "loader_min_duration_ms" numeric;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "loader_enabled";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "loader_brand_name";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "loader_show_on_first_load";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "loader_status_text";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "loader_system_code";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "loader_system_code_mobile";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "loader_version_label";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "loader_corner_brand";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "loader_corner_brand_mobile";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "loader_tagline";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "loader_tagline_mobile";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "loader_min_duration_ms";
  `);
}
