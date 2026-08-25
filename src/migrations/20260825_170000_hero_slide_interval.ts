import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_hero_slide_interval" AS ENUM('4', '6', '8', '10', '0');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_hero_slide_interval" AS ENUM('4', '6', '8', '10', '0');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    ALTER TABLE "pages_blocks_hero"
      ADD COLUMN IF NOT EXISTS "slide_interval" "enum_pages_blocks_hero_slide_interval" DEFAULT '6';
    ALTER TABLE "_pages_v_blocks_hero"
      ADD COLUMN IF NOT EXISTS "slide_interval" "enum__pages_v_blocks_hero_slide_interval" DEFAULT '6';
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_hero" DROP COLUMN IF EXISTS "slide_interval";
    ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN IF EXISTS "slide_interval";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_hero_slide_interval";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_hero_slide_interval";
  `);
}
