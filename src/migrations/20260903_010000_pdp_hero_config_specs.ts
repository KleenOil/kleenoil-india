import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TYPE "public"."enum_product_templates_blocks_pdp_hero_selector_style" ADD VALUE IF NOT EXISTS 'list';
    ALTER TYPE "public"."enum_products_blocks_pdp_hero_selector_style" ADD VALUE IF NOT EXISTS 'list';
    ALTER TYPE "public"."enum__products_v_blocks_pdp_hero_selector_style" ADD VALUE IF NOT EXISTS 'list';

    ALTER TABLE "product_templates_blocks_pdp_hero" ADD COLUMN IF NOT EXISTS "config_specs_label" varchar;
    ALTER TABLE "products_blocks_pdp_hero" ADD COLUMN IF NOT EXISTS "config_specs_label" varchar;
    ALTER TABLE "_products_v_blocks_pdp_hero" ADD COLUMN IF NOT EXISTS "config_specs_label" varchar;

    CREATE TABLE IF NOT EXISTS "product_templates_blocks_pdp_hero_config_specs" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL,
      "value" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "product_templates_blocks_pdp_hero_variants_config_specs" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL,
      "value" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "products_blocks_pdp_hero_config_specs" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar,
      "value" varchar
    );

    CREATE TABLE IF NOT EXISTS "products_blocks_pdp_hero_variants_config_specs" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar,
      "value" varchar
    );

    CREATE TABLE IF NOT EXISTS "_products_v_blocks_pdp_hero_config_specs" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "label" varchar,
      "value" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "_products_v_blocks_pdp_hero_variants_config_specs" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "label" varchar,
      "value" varchar,
      "_uuid" varchar
    );

    DO $$ BEGIN
      ALTER TABLE "product_templates_blocks_pdp_hero_config_specs" ADD CONSTRAINT "product_templates_blocks_pdp_hero_config_specs_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."product_templates_blocks_pdp_hero"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "product_templates_blocks_pdp_hero_variants_config_specs" ADD CONSTRAINT "product_templates_blocks_pdp_hero_variants_config_specs_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."product_templates_blocks_pdp_hero_variants"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "products_blocks_pdp_hero_config_specs" ADD CONSTRAINT "products_blocks_pdp_hero_config_specs_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_pdp_hero"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "products_blocks_pdp_hero_variants_config_specs" ADD CONSTRAINT "products_blocks_pdp_hero_variants_config_specs_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_pdp_hero_variants"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_products_v_blocks_pdp_hero_config_specs" ADD CONSTRAINT "_products_v_blocks_pdp_hero_config_specs_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_pdp_hero"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_products_v_blocks_pdp_hero_variants_config_specs" ADD CONSTRAINT "_products_v_blocks_pdp_hero_variants_config_specs_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_pdp_hero_variants"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE INDEX IF NOT EXISTS "product_templates_blocks_pdp_hero_config_specs_order_idx"
      ON "product_templates_blocks_pdp_hero_config_specs" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "product_templates_blocks_pdp_hero_config_specs_parent_id_idx"
      ON "product_templates_blocks_pdp_hero_config_specs" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "product_templates_blocks_pdp_hero_variants_config_specs_order_idx"
      ON "product_templates_blocks_pdp_hero_variants_config_specs" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "product_templates_blocks_pdp_hero_variants_config_specs_parent_id_idx"
      ON "product_templates_blocks_pdp_hero_variants_config_specs" USING btree ("_parent_id");

    CREATE INDEX IF NOT EXISTS "products_blocks_pdp_hero_config_specs_order_idx"
      ON "products_blocks_pdp_hero_config_specs" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "products_blocks_pdp_hero_config_specs_parent_id_idx"
      ON "products_blocks_pdp_hero_config_specs" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "products_blocks_pdp_hero_variants_config_specs_order_idx"
      ON "products_blocks_pdp_hero_variants_config_specs" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "products_blocks_pdp_hero_variants_config_specs_parent_id_idx"
      ON "products_blocks_pdp_hero_variants_config_specs" USING btree ("_parent_id");

    CREATE INDEX IF NOT EXISTS "_products_v_blocks_pdp_hero_config_specs_order_idx"
      ON "_products_v_blocks_pdp_hero_config_specs" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_products_v_blocks_pdp_hero_config_specs_parent_id_idx"
      ON "_products_v_blocks_pdp_hero_config_specs" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_products_v_blocks_pdp_hero_variants_config_specs_order_idx"
      ON "_products_v_blocks_pdp_hero_variants_config_specs" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_products_v_blocks_pdp_hero_variants_config_specs_parent_id_idx"
      ON "_products_v_blocks_pdp_hero_variants_config_specs" USING btree ("_parent_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "_products_v_blocks_pdp_hero_variants_config_specs" CASCADE;
    DROP TABLE IF EXISTS "_products_v_blocks_pdp_hero_config_specs" CASCADE;
    DROP TABLE IF EXISTS "products_blocks_pdp_hero_variants_config_specs" CASCADE;
    DROP TABLE IF EXISTS "products_blocks_pdp_hero_config_specs" CASCADE;
    DROP TABLE IF EXISTS "product_templates_blocks_pdp_hero_variants_config_specs" CASCADE;
    DROP TABLE IF EXISTS "product_templates_blocks_pdp_hero_config_specs" CASCADE;

    ALTER TABLE "product_templates_blocks_pdp_hero" DROP COLUMN IF EXISTS "config_specs_label";
    ALTER TABLE "products_blocks_pdp_hero" DROP COLUMN IF EXISTS "config_specs_label";
    ALTER TABLE "_products_v_blocks_pdp_hero" DROP COLUMN IF EXISTS "config_specs_label";
  `);
}
