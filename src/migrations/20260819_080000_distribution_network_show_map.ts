import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_distribution_network" ADD COLUMN IF NOT EXISTS "show_map" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_distribution_network" ADD COLUMN IF NOT EXISTS "show_map" boolean DEFAULT true;`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_distribution_network" DROP COLUMN IF EXISTS "show_map";
  ALTER TABLE "_pages_v_blocks_distribution_network" DROP COLUMN IF EXISTS "show_map";`);
}
