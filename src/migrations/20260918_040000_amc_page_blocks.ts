import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

// Idempotent: local DBs were created with drizzle push, so ensurePageBlockTables
// also applies this file when tables are missing. Keep CREATE TABLE IF NOT EXISTS.

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_amc_hero_ctas_link_type" AS ENUM('page', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_amc_hero_ctas_link_appearance" AS ENUM('primary', 'secondary', 'ghost');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_amc_hero_ctas_link_type" AS ENUM('page', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_amc_hero_ctas_link_appearance" AS ENUM('primary', 'secondary', 'ghost');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_amc_proof_ctas_link_type" AS ENUM('page', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_amc_proof_ctas_link_appearance" AS ENUM('primary', 'secondary', 'ghost');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_amc_proof_ctas_link_type" AS ENUM('page', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_amc_proof_ctas_link_appearance" AS ENUM('primary', 'secondary', 'ghost');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_amc_cta_ctas_link_type" AS ENUM('page', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_amc_cta_ctas_link_appearance" AS ENUM('primary', 'secondary', 'ghost');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_amc_cta_ctas_link_type" AS ENUM('page', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_amc_cta_ctas_link_appearance" AS ENUM('primary', 'secondary', 'ghost');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE TABLE IF NOT EXISTS "pages_blocks_amc_hero" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "lead" varchar,
      "note" varchar,
      "image_id" integer,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_amc_hero_ctas" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" "enum_pages_blocks_amc_hero_ctas_link_type" DEFAULT 'custom',
      "link_label" varchar,
      "link_page_id" integer,
      "link_url" varchar,
      "link_open_in_new_tab" boolean DEFAULT false,
      "link_appearance" "enum_pages_blocks_amc_hero_ctas_link_appearance" DEFAULT 'primary'
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_amc_hero_points" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "n" varchar,
      "title" varchar,
      "body" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_amc_hero_stats" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "value" varchar,
      "label" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_amc_hero_quarters" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "code" varchar,
      "label" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_amc_hero" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "lead" varchar,
      "note" varchar,
      "image_id" integer,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_amc_hero_ctas" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "link_type" "enum__pages_v_blocks_amc_hero_ctas_link_type" DEFAULT 'custom',
      "link_label" varchar,
      "link_page_id" integer,
      "link_url" varchar,
      "link_open_in_new_tab" boolean DEFAULT false,
      "link_appearance" "enum__pages_v_blocks_amc_hero_ctas_link_appearance" DEFAULT 'primary',
      "_uuid" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_amc_hero_points" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "n" varchar,
      "title" varchar,
      "body" varchar,
      "_uuid" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_amc_hero_stats" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "value" varchar,
      "label" varchar,
      "_uuid" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_amc_hero_quarters" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "code" varchar,
      "label" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_amc_why" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "kicker" varchar,
      "heading" varchar,
      "lead" varchar,
      "image_id" integer,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_amc_why_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "n" varchar,
      "icon" varchar,
      "title" varchar,
      "body" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_amc_why" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "kicker" varchar,
      "heading" varchar,
      "lead" varchar,
      "image_id" integer,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_amc_why_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "n" varchar,
      "icon" varchar,
      "title" varchar,
      "body" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_amc_coverage" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "lead" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_amc_coverage_cards" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "icon" varchar,
      "title" varchar,
      "body" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_amc_coverage" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "lead" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_amc_coverage_cards" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "icon" varchar,
      "title" varchar,
      "body" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_amc_visit" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_amc_visit_steps" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "n" varchar,
      "icon" varchar,
      "title" varchar,
      "body" varchar,
      "image_id" integer
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_amc_visit" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_amc_visit_steps" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "n" varchar,
      "icon" varchar,
      "title" varchar,
      "body" varchar,
      "image_id" integer,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_amc_industries" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "kicker" varchar,
      "heading" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_amc_industries_photos" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar,
      "image_id" integer
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_amc_industries_chips" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_amc_industries" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "kicker" varchar,
      "heading" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_amc_industries_photos" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "label" varchar,
      "image_id" integer,
      "_uuid" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_amc_industries_chips" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "label" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_amc_proof" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "lead" varchar,
      "image_id" integer,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_amc_proof_ctas" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" "enum_pages_blocks_amc_proof_ctas_link_type" DEFAULT 'custom',
      "link_label" varchar,
      "link_page_id" integer,
      "link_url" varchar,
      "link_open_in_new_tab" boolean DEFAULT false,
      "link_appearance" "enum_pages_blocks_amc_proof_ctas_link_appearance" DEFAULT 'primary'
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_amc_proof" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "lead" varchar,
      "image_id" integer,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_amc_proof_ctas" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "link_type" "enum__pages_v_blocks_amc_proof_ctas_link_type" DEFAULT 'custom',
      "link_label" varchar,
      "link_page_id" integer,
      "link_url" varchar,
      "link_open_in_new_tab" boolean DEFAULT false,
      "link_appearance" "enum__pages_v_blocks_amc_proof_ctas_link_appearance" DEFAULT 'primary',
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_amc_cta" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "subtext" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_amc_cta_ctas" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" "enum_pages_blocks_amc_cta_ctas_link_type" DEFAULT 'custom',
      "link_label" varchar,
      "link_page_id" integer,
      "link_url" varchar,
      "link_open_in_new_tab" boolean DEFAULT false,
      "link_appearance" "enum_pages_blocks_amc_cta_ctas_link_appearance" DEFAULT 'primary'
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_amc_cta" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "subtext" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_amc_cta_ctas" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "link_type" "enum__pages_v_blocks_amc_cta_ctas_link_type" DEFAULT 'custom',
      "link_label" varchar,
      "link_page_id" integer,
      "link_url" varchar,
      "link_open_in_new_tab" boolean DEFAULT false,
      "link_appearance" "enum__pages_v_blocks_amc_cta_ctas_link_appearance" DEFAULT 'primary',
      "_uuid" varchar
    );

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_amc_hero" ADD CONSTRAINT "pages_blocks_amc_hero_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_amc_hero" ADD CONSTRAINT "pages_blocks_amc_hero_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_amc_hero_ctas" ADD CONSTRAINT "pages_blocks_amc_hero_ctas_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_amc_hero"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_amc_hero_points" ADD CONSTRAINT "pages_blocks_amc_hero_points_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_amc_hero"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_amc_hero_stats" ADD CONSTRAINT "pages_blocks_amc_hero_stats_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_amc_hero"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_amc_hero_quarters" ADD CONSTRAINT "pages_blocks_amc_hero_quarters_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_amc_hero"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_amc_why" ADD CONSTRAINT "pages_blocks_amc_why_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_amc_why" ADD CONSTRAINT "pages_blocks_amc_why_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_amc_why_items" ADD CONSTRAINT "pages_blocks_amc_why_items_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_amc_why"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_amc_coverage" ADD CONSTRAINT "pages_blocks_amc_coverage_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_amc_coverage_cards" ADD CONSTRAINT "pages_blocks_amc_coverage_cards_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_amc_coverage"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_amc_visit" ADD CONSTRAINT "pages_blocks_amc_visit_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_amc_visit_steps" ADD CONSTRAINT "pages_blocks_amc_visit_steps_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_amc_visit"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_amc_industries" ADD CONSTRAINT "pages_blocks_amc_industries_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_amc_industries_photos" ADD CONSTRAINT "pages_blocks_amc_industries_photos_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_amc_industries"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_amc_industries_chips" ADD CONSTRAINT "pages_blocks_amc_industries_chips_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_amc_industries"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_amc_proof" ADD CONSTRAINT "pages_blocks_amc_proof_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_amc_proof" ADD CONSTRAINT "pages_blocks_amc_proof_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_amc_proof_ctas" ADD CONSTRAINT "pages_blocks_amc_proof_ctas_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_amc_proof"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_amc_cta" ADD CONSTRAINT "pages_blocks_amc_cta_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_amc_cta_ctas" ADD CONSTRAINT "pages_blocks_amc_cta_ctas_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_amc_cta"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE INDEX IF NOT EXISTS "pages_blocks_amc_hero_order_idx" ON "pages_blocks_amc_hero" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_amc_hero_parent_id_idx" ON "pages_blocks_amc_hero" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_amc_hero_path_idx" ON "pages_blocks_amc_hero" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_amc_why_order_idx" ON "pages_blocks_amc_why" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_amc_why_parent_id_idx" ON "pages_blocks_amc_why" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_amc_coverage_order_idx" ON "pages_blocks_amc_coverage" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_amc_coverage_parent_id_idx" ON "pages_blocks_amc_coverage" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_amc_visit_order_idx" ON "pages_blocks_amc_visit" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_amc_visit_parent_id_idx" ON "pages_blocks_amc_visit" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_amc_industries_order_idx" ON "pages_blocks_amc_industries" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_amc_industries_parent_id_idx" ON "pages_blocks_amc_industries" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_amc_proof_order_idx" ON "pages_blocks_amc_proof" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_amc_proof_parent_id_idx" ON "pages_blocks_amc_proof" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_amc_cta_order_idx" ON "pages_blocks_amc_cta" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_amc_cta_parent_id_idx" ON "pages_blocks_amc_cta" USING btree ("_parent_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "pages_blocks_amc_hero_ctas" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_amc_hero_points" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_amc_hero_stats" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_amc_hero_quarters" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_amc_hero_ctas" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_amc_hero_points" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_amc_hero_stats" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_amc_hero_quarters" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_amc_hero" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_amc_hero" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_amc_why_items" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_amc_why_items" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_amc_why" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_amc_why" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_amc_coverage_cards" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_amc_coverage_cards" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_amc_coverage" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_amc_coverage" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_amc_visit_steps" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_amc_visit_steps" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_amc_visit" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_amc_visit" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_amc_industries_photos" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_amc_industries_chips" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_amc_industries_photos" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_amc_industries_chips" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_amc_industries" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_amc_industries" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_amc_proof_ctas" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_amc_proof_ctas" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_amc_proof" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_amc_proof" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_amc_cta_ctas" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_amc_cta_ctas" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_amc_cta" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_amc_cta" CASCADE;
  `);
}
