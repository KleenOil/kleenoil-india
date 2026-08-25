import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_case_studies_sector" AS ENUM('automotive', 'steel', 'marine', 'power', 'cement', 'rail');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_cs_hero_cta_type" AS ENUM('page', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_cs_hero_cta_appearance" AS ENUM('primary', 'secondary', 'ghost');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_cs_hero_cta_type" AS ENUM('page', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_cs_hero_cta_appearance" AS ENUM('primary', 'secondary', 'ghost');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_cs_cta_ctas_link_type" AS ENUM('page', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_cs_cta_ctas_link_appearance" AS ENUM('primary', 'secondary', 'ghost');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_cs_cta_ctas_link_type" AS ENUM('page', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_cs_cta_ctas_link_appearance" AS ENUM('primary', 'secondary', 'ghost');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE TABLE IF NOT EXISTS "case_studies" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "sector" "enum_case_studies_sector" DEFAULT 'automotive' NOT NULL,
      "tag" varchar,
      "location" varchar,
      "excerpt" varchar,
      "featured_headline" varchar,
      "featured_image_id" integer,
      "href" varchar,
      "show_on_listing" boolean DEFAULT true,
      "published_at" timestamp(3) with time zone,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "case_studies_metrics" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "value" varchar NOT NULL,
      "label" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_cs_hero" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "subheadline" varchar,
      "watermark" varchar,
      "image_id" integer,
      "cta_type" "enum_pages_blocks_cs_hero_cta_type" DEFAULT 'custom',
      "cta_label" varchar,
      "cta_page_id" integer,
      "cta_url" varchar,
      "cta_open_in_new_tab" boolean DEFAULT false,
      "cta_appearance" "enum_pages_blocks_cs_hero_cta_appearance" DEFAULT 'primary',
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_cs_hero_stats" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "value" varchar NOT NULL,
      "label" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cs_hero" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "subheadline" varchar,
      "watermark" varchar,
      "image_id" integer,
      "cta_type" "enum__pages_v_blocks_cs_hero_cta_type" DEFAULT 'custom',
      "cta_label" varchar,
      "cta_page_id" integer,
      "cta_url" varchar,
      "cta_open_in_new_tab" boolean DEFAULT false,
      "cta_appearance" "enum__pages_v_blocks_cs_hero_cta_appearance" DEFAULT 'primary',
      "_uuid" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cs_hero_stats" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "value" varchar,
      "label" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_cs_featured" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "description" varchar,
      "featured_study_id" integer,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cs_featured" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "description" varchar,
      "featured_study_id" integer,
      "_uuid" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_cs_index" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "description" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_cs_index_hidden_studies" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "study_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cs_index" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "description" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cs_index_hidden_studies" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "study_id" integer,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_cs_cta" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "subtext" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_cs_cta_ctas" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" "enum_pages_blocks_cs_cta_ctas_link_type" DEFAULT 'custom',
      "link_label" varchar,
      "link_page_id" integer,
      "link_url" varchar,
      "link_open_in_new_tab" boolean DEFAULT false,
      "link_appearance" "enum_pages_blocks_cs_cta_ctas_link_appearance" DEFAULT 'primary'
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cs_cta" (
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

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cs_cta_ctas" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "link_type" "enum__pages_v_blocks_cs_cta_ctas_link_type" DEFAULT 'custom',
      "link_label" varchar,
      "link_page_id" integer,
      "link_url" varchar,
      "link_open_in_new_tab" boolean DEFAULT false,
      "link_appearance" "enum__pages_v_blocks_cs_cta_ctas_link_appearance" DEFAULT 'primary',
      "_uuid" varchar
    );

    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "case_studies_id" integer;

    DO $$ BEGIN
      ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_featured_image_id_media_id_fk"
        FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "case_studies_metrics" ADD CONSTRAINT "case_studies_metrics_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_cs_hero" ADD CONSTRAINT "pages_blocks_cs_hero_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_cs_hero" ADD CONSTRAINT "pages_blocks_cs_hero_cta_page_id_pages_id_fk"
        FOREIGN KEY ("cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_cs_hero" ADD CONSTRAINT "pages_blocks_cs_hero_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_cs_hero_stats" ADD CONSTRAINT "pages_blocks_cs_hero_stats_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cs_hero"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_cs_hero" ADD CONSTRAINT "_pages_v_blocks_cs_hero_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_cs_hero" ADD CONSTRAINT "_pages_v_blocks_cs_hero_cta_page_id_pages_id_fk"
        FOREIGN KEY ("cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_cs_hero" ADD CONSTRAINT "_pages_v_blocks_cs_hero_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_cs_hero_stats" ADD CONSTRAINT "_pages_v_blocks_cs_hero_stats_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cs_hero"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_cs_featured" ADD CONSTRAINT "pages_blocks_cs_featured_featured_study_id_fk"
        FOREIGN KEY ("featured_study_id") REFERENCES "public"."case_studies"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_cs_featured" ADD CONSTRAINT "pages_blocks_cs_featured_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_cs_featured" ADD CONSTRAINT "_pages_v_blocks_cs_featured_featured_study_id_fk"
        FOREIGN KEY ("featured_study_id") REFERENCES "public"."case_studies"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_cs_featured" ADD CONSTRAINT "_pages_v_blocks_cs_featured_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_cs_index" ADD CONSTRAINT "pages_blocks_cs_index_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_cs_index_hidden_studies" ADD CONSTRAINT "pages_blocks_cs_index_hidden_studies_study_id_fk"
        FOREIGN KEY ("study_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_cs_index_hidden_studies" ADD CONSTRAINT "pages_blocks_cs_index_hidden_studies_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cs_index"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_cs_index" ADD CONSTRAINT "_pages_v_blocks_cs_index_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_cs_index_hidden_studies" ADD CONSTRAINT "_pages_v_blocks_cs_index_hidden_studies_study_id_fk"
        FOREIGN KEY ("study_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_cs_index_hidden_studies" ADD CONSTRAINT "_pages_v_blocks_cs_index_hidden_studies_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cs_index"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_cs_cta" ADD CONSTRAINT "pages_blocks_cs_cta_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_cs_cta_ctas" ADD CONSTRAINT "pages_blocks_cs_cta_ctas_link_page_id_fk"
        FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_cs_cta_ctas" ADD CONSTRAINT "pages_blocks_cs_cta_ctas_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cs_cta"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_cs_cta" ADD CONSTRAINT "_pages_v_blocks_cs_cta_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_cs_cta_ctas" ADD CONSTRAINT "_pages_v_blocks_cs_cta_ctas_link_page_id_fk"
        FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_cs_cta_ctas" ADD CONSTRAINT "_pages_v_blocks_cs_cta_ctas_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cs_cta"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_case_studies_fk"
        FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE UNIQUE INDEX IF NOT EXISTS "case_studies_slug_idx" ON "case_studies" USING btree ("slug");
    CREATE INDEX IF NOT EXISTS "case_studies_updated_at_idx" ON "case_studies" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "case_studies_created_at_idx" ON "case_studies" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "case_studies_featured_image_idx" ON "case_studies" USING btree ("featured_image_id");
    CREATE INDEX IF NOT EXISTS "case_studies_metrics_order_idx" ON "case_studies_metrics" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "case_studies_metrics_parent_id_idx" ON "case_studies_metrics" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_cs_hero_order_idx" ON "pages_blocks_cs_hero" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_cs_hero_parent_id_idx" ON "pages_blocks_cs_hero" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_cs_hero_path_idx" ON "pages_blocks_cs_hero" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_cs_hero_image_idx" ON "pages_blocks_cs_hero" USING btree ("image_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_cs_hero_stats_order_idx" ON "pages_blocks_cs_hero_stats" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_cs_hero_stats_parent_id_idx" ON "pages_blocks_cs_hero_stats" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_cs_featured_order_idx" ON "pages_blocks_cs_featured" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_cs_featured_parent_id_idx" ON "pages_blocks_cs_featured" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_cs_featured_path_idx" ON "pages_blocks_cs_featured" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_cs_featured_featured_study_idx" ON "pages_blocks_cs_featured" USING btree ("featured_study_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_cs_index_order_idx" ON "pages_blocks_cs_index" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_cs_index_parent_id_idx" ON "pages_blocks_cs_index" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_cs_index_path_idx" ON "pages_blocks_cs_index" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_cs_index_hidden_studies_order_idx" ON "pages_blocks_cs_index_hidden_studies" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_cs_index_hidden_studies_parent_id_idx" ON "pages_blocks_cs_index_hidden_studies" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_cs_cta_order_idx" ON "pages_blocks_cs_cta" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_cs_cta_parent_id_idx" ON "pages_blocks_cs_cta" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_cs_cta_path_idx" ON "pages_blocks_cs_cta" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_case_studies_id_idx" ON "payload_locked_documents_rels" USING btree ("case_studies_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_case_studies_fk";
    DROP INDEX IF EXISTS "payload_locked_documents_rels_case_studies_id_idx";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "case_studies_id";

    DROP TABLE IF EXISTS "pages_blocks_cs_cta_ctas" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_cs_cta_ctas" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_cs_cta" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_cs_cta" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_cs_index_hidden_studies" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_cs_index_hidden_studies" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_cs_index" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_cs_index" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_cs_featured" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_cs_featured" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_cs_hero_stats" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_cs_hero_stats" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_cs_hero" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_cs_hero" CASCADE;
    DROP TABLE IF EXISTS "case_studies_metrics" CASCADE;
    DROP TABLE IF EXISTS "case_studies" CASCADE;

    DROP TYPE IF EXISTS "public"."enum_case_studies_sector";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_cs_hero_cta_type";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_cs_hero_cta_appearance";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_cs_hero_cta_type";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_cs_hero_cta_appearance";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_cs_cta_ctas_link_type";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_cs_cta_ctas_link_appearance";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_cs_cta_ctas_link_type";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_cs_cta_ctas_link_appearance";
  `);
}
