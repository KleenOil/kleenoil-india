import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_process_story_steps" ADD COLUMN IF NOT EXISTS "spec" varchar;
  ALTER TABLE "_pages_v_blocks_process_story_steps" ADD COLUMN IF NOT EXISTS "spec" varchar;`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_process_story_steps" DROP COLUMN IF EXISTS "spec";
  ALTER TABLE "_pages_v_blocks_process_story_steps" DROP COLUMN IF EXISTS "spec";`);
}
