import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_product_templates_blocks_pdp_hero_selector_style" AS ENUM('chips', 'dropdown');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_products_blocks_pdp_hero_selector_style" AS ENUM('chips', 'dropdown');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__products_v_blocks_pdp_hero_selector_style" AS ENUM('chips', 'dropdown');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    ALTER TABLE "product_templates_blocks_pdp_hero" ADD COLUMN IF NOT EXISTS "enable_variants" boolean DEFAULT false;
    ALTER TABLE "product_templates_blocks_pdp_hero" ADD COLUMN IF NOT EXISTS "selector_style" "enum_product_templates_blocks_pdp_hero_selector_style" DEFAULT 'chips';
    ALTER TABLE "product_templates_blocks_pdp_hero" ADD COLUMN IF NOT EXISTS "selector_label" varchar;

    ALTER TABLE "products_blocks_pdp_hero" ADD COLUMN IF NOT EXISTS "enable_variants" boolean DEFAULT false;
    ALTER TABLE "products_blocks_pdp_hero" ADD COLUMN IF NOT EXISTS "selector_style" "enum_products_blocks_pdp_hero_selector_style" DEFAULT 'chips';
    ALTER TABLE "products_blocks_pdp_hero" ADD COLUMN IF NOT EXISTS "selector_label" varchar;

    ALTER TABLE "_products_v_blocks_pdp_hero" ADD COLUMN IF NOT EXISTS "enable_variants" boolean DEFAULT false;
    ALTER TABLE "_products_v_blocks_pdp_hero" ADD COLUMN IF NOT EXISTS "selector_style" "enum__products_v_blocks_pdp_hero_selector_style" DEFAULT 'chips';
    ALTER TABLE "_products_v_blocks_pdp_hero" ADD COLUMN IF NOT EXISTS "selector_label" varchar;

    CREATE TABLE IF NOT EXISTS "product_templates_blocks_pdp_hero_variants" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "code" varchar,
      "series" varchar,
      "meta" varchar,
      "is_default" boolean DEFAULT false,
      "badge" varchar,
      "title" varchar,
      "summary" varchar
    );

    CREATE TABLE IF NOT EXISTS "product_templates_blocks_pdp_hero_variants_quick_specs" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "value" varchar NOT NULL,
      "label" varchar NOT NULL,
      "animate_counter" boolean DEFAULT false
    );

    CREATE TABLE IF NOT EXISTS "products_blocks_pdp_hero_variants" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar,
      "code" varchar,
      "series" varchar,
      "meta" varchar,
      "is_default" boolean DEFAULT false,
      "badge" varchar,
      "title" varchar,
      "summary" varchar
    );

    CREATE TABLE IF NOT EXISTS "products_blocks_pdp_hero_variants_quick_specs" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "value" varchar,
      "label" varchar,
      "animate_counter" boolean DEFAULT false
    );

    CREATE TABLE IF NOT EXISTS "_products_v_blocks_pdp_hero_variants" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar,
      "code" varchar,
      "series" varchar,
      "meta" varchar,
      "is_default" boolean DEFAULT false,
      "badge" varchar,
      "title" varchar,
      "summary" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "_products_v_blocks_pdp_hero_variants_quick_specs" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "value" varchar,
      "label" varchar,
      "animate_counter" boolean DEFAULT false,
      "_uuid" varchar
    );

    DO $$ BEGIN
      ALTER TABLE "product_templates_blocks_pdp_hero_variants" ADD CONSTRAINT "product_templates_blocks_pdp_hero_variants_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."product_templates_blocks_pdp_hero"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "product_templates_blocks_pdp_hero_variants_quick_specs" ADD CONSTRAINT "product_templates_blocks_pdp_hero_variants_quick_specs_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."product_templates_blocks_pdp_hero_variants"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "products_blocks_pdp_hero_variants" ADD CONSTRAINT "products_blocks_pdp_hero_variants_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_pdp_hero"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "products_blocks_pdp_hero_variants_quick_specs" ADD CONSTRAINT "products_blocks_pdp_hero_variants_quick_specs_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_pdp_hero_variants"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_products_v_blocks_pdp_hero_variants" ADD CONSTRAINT "_products_v_blocks_pdp_hero_variants_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_pdp_hero"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_products_v_blocks_pdp_hero_variants_quick_specs" ADD CONSTRAINT "_products_v_blocks_pdp_hero_variants_quick_specs_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_pdp_hero_variants"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE INDEX IF NOT EXISTS "product_templates_blocks_pdp_hero_variants_order_idx"
      ON "product_templates_blocks_pdp_hero_variants" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "product_templates_blocks_pdp_hero_variants_parent_id_idx"
      ON "product_templates_blocks_pdp_hero_variants" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "product_templates_blocks_pdp_hero_variants_quick_specs_order_idx"
      ON "product_templates_blocks_pdp_hero_variants_quick_specs" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "product_templates_blocks_pdp_hero_variants_quick_specs_parent_id_idx"
      ON "product_templates_blocks_pdp_hero_variants_quick_specs" USING btree ("_parent_id");

    CREATE INDEX IF NOT EXISTS "products_blocks_pdp_hero_variants_order_idx"
      ON "products_blocks_pdp_hero_variants" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "products_blocks_pdp_hero_variants_parent_id_idx"
      ON "products_blocks_pdp_hero_variants" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "products_blocks_pdp_hero_variants_quick_specs_order_idx"
      ON "products_blocks_pdp_hero_variants_quick_specs" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "products_blocks_pdp_hero_variants_quick_specs_parent_id_idx"
      ON "products_blocks_pdp_hero_variants_quick_specs" USING btree ("_parent_id");

    CREATE INDEX IF NOT EXISTS "_products_v_blocks_pdp_hero_variants_order_idx"
      ON "_products_v_blocks_pdp_hero_variants" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_products_v_blocks_pdp_hero_variants_parent_id_idx"
      ON "_products_v_blocks_pdp_hero_variants" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_products_v_blocks_pdp_hero_variants_quick_specs_order_idx"
      ON "_products_v_blocks_pdp_hero_variants_quick_specs" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_products_v_blocks_pdp_hero_variants_quick_specs_parent_id_idx"
      ON "_products_v_blocks_pdp_hero_variants_quick_specs" USING btree ("_parent_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "_products_v_blocks_pdp_hero_variants_quick_specs" CASCADE;
    DROP TABLE IF EXISTS "_products_v_blocks_pdp_hero_variants" CASCADE;
    DROP TABLE IF EXISTS "products_blocks_pdp_hero_variants_quick_specs" CASCADE;
    DROP TABLE IF EXISTS "products_blocks_pdp_hero_variants" CASCADE;
    DROP TABLE IF EXISTS "product_templates_blocks_pdp_hero_variants_quick_specs" CASCADE;
    DROP TABLE IF EXISTS "product_templates_blocks_pdp_hero_variants" CASCADE;

    ALTER TABLE "product_templates_blocks_pdp_hero" DROP COLUMN IF EXISTS "enable_variants";
    ALTER TABLE "product_templates_blocks_pdp_hero" DROP COLUMN IF EXISTS "selector_style";
    ALTER TABLE "product_templates_blocks_pdp_hero" DROP COLUMN IF EXISTS "selector_label";
    ALTER TABLE "products_blocks_pdp_hero" DROP COLUMN IF EXISTS "enable_variants";
    ALTER TABLE "products_blocks_pdp_hero" DROP COLUMN IF EXISTS "selector_style";
    ALTER TABLE "products_blocks_pdp_hero" DROP COLUMN IF EXISTS "selector_label";
    ALTER TABLE "_products_v_blocks_pdp_hero" DROP COLUMN IF EXISTS "enable_variants";
    ALTER TABLE "_products_v_blocks_pdp_hero" DROP COLUMN IF EXISTS "selector_style";
    ALTER TABLE "_products_v_blocks_pdp_hero" DROP COLUMN IF EXISTS "selector_label";

    DROP TYPE IF EXISTS "public"."enum_product_templates_blocks_pdp_hero_selector_style";
    DROP TYPE IF EXISTS "public"."enum_products_blocks_pdp_hero_selector_style";
    DROP TYPE IF EXISTS "public"."enum__products_v_blocks_pdp_hero_selector_style";
  `);
}
