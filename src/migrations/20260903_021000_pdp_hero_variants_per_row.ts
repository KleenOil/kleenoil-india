import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_product_templates_blocks_pdp_hero_variants_per_row" AS ENUM('one', 'two', 'three', 'four');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_products_blocks_pdp_hero_variants_per_row" AS ENUM('one', 'two', 'three', 'four');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__products_v_blocks_pdp_hero_variants_per_row" AS ENUM('one', 'two', 'three', 'four');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    ALTER TABLE "product_templates_blocks_pdp_hero" ADD COLUMN IF NOT EXISTS "variants_per_row" "enum_product_templates_blocks_pdp_hero_variants_per_row" DEFAULT 'two';
    ALTER TABLE "products_blocks_pdp_hero" ADD COLUMN IF NOT EXISTS "variants_per_row" "enum_products_blocks_pdp_hero_variants_per_row" DEFAULT 'two';
    ALTER TABLE "_products_v_blocks_pdp_hero" ADD COLUMN IF NOT EXISTS "variants_per_row" "enum__products_v_blocks_pdp_hero_variants_per_row" DEFAULT 'two';
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "product_templates_blocks_pdp_hero" DROP COLUMN IF EXISTS "variants_per_row";
    ALTER TABLE "products_blocks_pdp_hero" DROP COLUMN IF EXISTS "variants_per_row";
    ALTER TABLE "_products_v_blocks_pdp_hero" DROP COLUMN IF EXISTS "variants_per_row";

    DROP TYPE IF EXISTS "public"."enum_product_templates_blocks_pdp_hero_variants_per_row";
    DROP TYPE IF EXISTS "public"."enum_products_blocks_pdp_hero_variants_per_row";
    DROP TYPE IF EXISTS "public"."enum__products_v_blocks_pdp_hero_variants_per_row";
  `);
}
