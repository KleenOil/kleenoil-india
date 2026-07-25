import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "product_templates_blocks_pdp_hero_quick_specs" ADD COLUMN "animate_counter" boolean DEFAULT false;
  ALTER TABLE "products_blocks_pdp_hero_quick_specs" ADD COLUMN "animate_counter" boolean DEFAULT false;
  ALTER TABLE "_products_v_blocks_pdp_hero_quick_specs" ADD COLUMN "animate_counter" boolean DEFAULT false;`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "product_templates_blocks_pdp_hero_quick_specs" DROP COLUMN "animate_counter";
  ALTER TABLE "products_blocks_pdp_hero_quick_specs" DROP COLUMN "animate_counter";
  ALTER TABLE "_products_v_blocks_pdp_hero_quick_specs" DROP COLUMN "animate_counter";`);
}
