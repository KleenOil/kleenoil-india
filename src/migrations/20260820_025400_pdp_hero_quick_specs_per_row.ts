import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "product_templates_blocks_pdp_hero" ADD COLUMN IF NOT EXISTS "quick_specs_per_row" varchar;
    ALTER TABLE "products_blocks_pdp_hero" ADD COLUMN IF NOT EXISTS "quick_specs_per_row" varchar;
    ALTER TABLE "_products_v_blocks_pdp_hero" ADD COLUMN IF NOT EXISTS "quick_specs_per_row" varchar;

    ALTER TABLE "product_templates_blocks_pdp_hero" ALTER COLUMN "quick_specs_per_row" DROP DEFAULT;
    ALTER TABLE "products_blocks_pdp_hero" ALTER COLUMN "quick_specs_per_row" DROP DEFAULT;
    ALTER TABLE "_products_v_blocks_pdp_hero" ALTER COLUMN "quick_specs_per_row" DROP DEFAULT;

    ALTER TABLE "product_templates_blocks_pdp_hero" ALTER COLUMN "quick_specs_per_row" TYPE varchar USING (
      CASE "quick_specs_per_row"::text
        WHEN '1' THEN 'one'
        WHEN '2' THEN 'two'
        WHEN '3' THEN 'three'
        WHEN '4' THEN 'four'
        WHEN 'one' THEN 'one'
        WHEN 'two' THEN 'two'
        WHEN 'three' THEN 'three'
        WHEN 'four' THEN 'four'
        ELSE 'auto'
      END
    );
    ALTER TABLE "products_blocks_pdp_hero" ALTER COLUMN "quick_specs_per_row" TYPE varchar USING (
      CASE "quick_specs_per_row"::text
        WHEN '1' THEN 'one'
        WHEN '2' THEN 'two'
        WHEN '3' THEN 'three'
        WHEN '4' THEN 'four'
        WHEN 'one' THEN 'one'
        WHEN 'two' THEN 'two'
        WHEN 'three' THEN 'three'
        WHEN 'four' THEN 'four'
        ELSE 'auto'
      END
    );
    ALTER TABLE "_products_v_blocks_pdp_hero" ALTER COLUMN "quick_specs_per_row" TYPE varchar USING (
      CASE "quick_specs_per_row"::text
        WHEN '1' THEN 'one'
        WHEN '2' THEN 'two'
        WHEN '3' THEN 'three'
        WHEN '4' THEN 'four'
        WHEN 'one' THEN 'one'
        WHEN 'two' THEN 'two'
        WHEN 'three' THEN 'three'
        WHEN 'four' THEN 'four'
        ELSE 'auto'
      END
    );

    DROP TYPE IF EXISTS "public"."enum_pdp_hero_quick_specs_per_row";
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pdp_hero_quick_specs_per_row" AS ENUM('auto', 'one', 'two', 'three', 'four');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    ALTER TABLE "product_templates_blocks_pdp_hero" ALTER COLUMN "quick_specs_per_row" TYPE "enum_pdp_hero_quick_specs_per_row" USING "quick_specs_per_row"::"enum_pdp_hero_quick_specs_per_row";
    ALTER TABLE "products_blocks_pdp_hero" ALTER COLUMN "quick_specs_per_row" TYPE "enum_pdp_hero_quick_specs_per_row" USING "quick_specs_per_row"::"enum_pdp_hero_quick_specs_per_row";
    ALTER TABLE "_products_v_blocks_pdp_hero" ALTER COLUMN "quick_specs_per_row" TYPE "enum_pdp_hero_quick_specs_per_row" USING "quick_specs_per_row"::"enum_pdp_hero_quick_specs_per_row";

    ALTER TABLE "product_templates_blocks_pdp_hero" ALTER COLUMN "quick_specs_per_row" SET DEFAULT 'auto';
    ALTER TABLE "products_blocks_pdp_hero" ALTER COLUMN "quick_specs_per_row" SET DEFAULT 'auto';
    ALTER TABLE "_products_v_blocks_pdp_hero" ALTER COLUMN "quick_specs_per_row" SET DEFAULT 'auto';
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "product_templates_blocks_pdp_hero" DROP COLUMN IF EXISTS "quick_specs_per_row";
    ALTER TABLE "products_blocks_pdp_hero" DROP COLUMN IF EXISTS "quick_specs_per_row";
    ALTER TABLE "_products_v_blocks_pdp_hero" DROP COLUMN IF EXISTS "quick_specs_per_row";
    DROP TYPE IF EXISTS "public"."enum_pdp_hero_quick_specs_per_row";
  `);
}
