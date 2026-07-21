import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages" DROP COLUMN IF EXISTS "layout_preset";
    ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_layout_preset";
    DROP TYPE IF EXISTS "public"."enum_pages_layout_preset";
    DROP TYPE IF EXISTS "public"."enum__pages_v_version_layout_preset";
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_pages_layout_preset" AS ENUM('homepage-replace', 'homepage-append', 'core-replace');
    CREATE TYPE "public"."enum__pages_v_version_layout_preset" AS ENUM('homepage-replace', 'homepage-append', 'core-replace');
    ALTER TABLE "pages" ADD COLUMN "layout_preset" "enum_pages_layout_preset";
    ALTER TABLE "_pages_v" ADD COLUMN "version_layout_preset" "enum__pages_v_version_layout_preset";
  `);
}
