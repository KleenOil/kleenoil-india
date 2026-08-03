import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_featured_products" ADD COLUMN "custom_engineering_tag" varchar;
  ALTER TABLE "pages_blocks_featured_products" ADD COLUMN "custom_engineering_title" varchar;
  ALTER TABLE "pages_blocks_featured_products" ADD COLUMN "custom_engineering_description" varchar;
  ALTER TABLE "pages_blocks_featured_products" ADD COLUMN "custom_engineering_cta_label" varchar;
  ALTER TABLE "pages_blocks_featured_products" ADD COLUMN "custom_engineering_href" varchar;
  ALTER TABLE "_pages_v_blocks_featured_products" ADD COLUMN "custom_engineering_tag" varchar;
  ALTER TABLE "_pages_v_blocks_featured_products" ADD COLUMN "custom_engineering_title" varchar;
  ALTER TABLE "_pages_v_blocks_featured_products" ADD COLUMN "custom_engineering_description" varchar;
  ALTER TABLE "_pages_v_blocks_featured_products" ADD COLUMN "custom_engineering_cta_label" varchar;
  ALTER TABLE "_pages_v_blocks_featured_products" ADD COLUMN "custom_engineering_href" varchar;`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_featured_products" DROP COLUMN "custom_engineering_tag";
  ALTER TABLE "pages_blocks_featured_products" DROP COLUMN "custom_engineering_title";
  ALTER TABLE "pages_blocks_featured_products" DROP COLUMN "custom_engineering_description";
  ALTER TABLE "pages_blocks_featured_products" DROP COLUMN "custom_engineering_cta_label";
  ALTER TABLE "pages_blocks_featured_products" DROP COLUMN "custom_engineering_href";
  ALTER TABLE "_pages_v_blocks_featured_products" DROP COLUMN "custom_engineering_tag";
  ALTER TABLE "_pages_v_blocks_featured_products" DROP COLUMN "custom_engineering_title";
  ALTER TABLE "_pages_v_blocks_featured_products" DROP COLUMN "custom_engineering_description";
  ALTER TABLE "_pages_v_blocks_featured_products" DROP COLUMN "custom_engineering_cta_label";
  ALTER TABLE "_pages_v_blocks_featured_products" DROP COLUMN "custom_engineering_href";`);
}
