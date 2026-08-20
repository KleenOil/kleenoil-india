import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_trust_indicators_heading_align" AS ENUM('left', 'center', 'right');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_trust_indicators_heading_align" AS ENUM('left', 'center', 'right');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    ALTER TABLE "pages_blocks_trust_indicators"
      ADD COLUMN IF NOT EXISTS "heading_align" "enum_pages_blocks_trust_indicators_heading_align" DEFAULT 'left';
    ALTER TABLE "_pages_v_blocks_trust_indicators"
      ADD COLUMN IF NOT EXISTS "heading_align" "enum__pages_v_blocks_trust_indicators_heading_align" DEFAULT 'left';
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_trust_indicators" DROP COLUMN IF EXISTS "heading_align";
    ALTER TABLE "_pages_v_blocks_trust_indicators" DROP COLUMN IF EXISTS "heading_align";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_trust_indicators_heading_align";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_trust_indicators_heading_align";
  `);
}
