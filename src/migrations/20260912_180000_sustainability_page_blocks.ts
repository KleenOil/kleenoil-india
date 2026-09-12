import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_sustainability_hero_ctas_link_type" AS ENUM('page', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_sustainability_hero_ctas_link_appearance" AS ENUM('primary', 'secondary', 'ghost');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_sustainability_hero_ctas_link_type" AS ENUM('page', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_sustainability_hero_ctas_link_appearance" AS ENUM('primary', 'secondary', 'ghost');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_sustainability_cta_ctas_link_type" AS ENUM('page', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_sustainability_cta_ctas_link_appearance" AS ENUM('primary', 'secondary', 'ghost');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_sustainability_cta_ctas_link_type" AS ENUM('page', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_sustainability_cta_ctas_link_appearance" AS ENUM('primary', 'secondary', 'ghost');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE TABLE IF NOT EXISTS "pages_blocks_sustainability_hero" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "lead" varchar,
      "body" varchar,
      "image_id" integer,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_sustainability_hero_ctas" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" "enum_pages_blocks_sustainability_hero_ctas_link_type" DEFAULT 'custom',
      "link_label" varchar,
      "link_page_id" integer,
      "link_url" varchar,
      "link_open_in_new_tab" boolean DEFAULT false,
      "link_appearance" "enum_pages_blocks_sustainability_hero_ctas_link_appearance" DEFAULT 'primary'
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_sustainability_hero_pills" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "n" varchar,
      "label" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_sustainability_hero" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "lead" varchar,
      "body" varchar,
      "image_id" integer,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_sustainability_hero_ctas" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "link_type" "enum__pages_v_blocks_sustainability_hero_ctas_link_type" DEFAULT 'custom',
      "link_label" varchar,
      "link_page_id" integer,
      "link_url" varchar,
      "link_open_in_new_tab" boolean DEFAULT false,
      "link_appearance" "enum__pages_v_blocks_sustainability_hero_ctas_link_appearance" DEFAULT 'primary',
      "_uuid" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_sustainability_hero_pills" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "n" varchar,
      "label" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_sustainability_impact" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "description" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_sustainability_impact_cards" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "body" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_sustainability_impact" (
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
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_sustainability_impact_cards" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "body" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_sustainability_circular" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "description" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_sustainability_circular_steps" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "n" varchar,
      "title" varchar,
      "body" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_sustainability_circular" (
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
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_sustainability_circular_steps" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "n" varchar,
      "title" varchar,
      "body" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_sustainability_drop" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "image_id" integer,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_sustainability_drop_paragraphs" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "text" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_sustainability_drop" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "image_id" integer,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_sustainability_drop_paragraphs" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "text" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_sustainability_numbers" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "description" varchar,
      "disclaimer" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_sustainability_numbers_stats" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "value" varchar,
      "label" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_sustainability_numbers" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "description" varchar,
      "disclaimer" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_sustainability_numbers_stats" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "value" varchar,
      "label" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_sustainability_applications" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "description" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_sustainability_applications_cards" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "body" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_sustainability_applications" (
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
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_sustainability_applications_cards" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "body" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_sustainability_cta" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "subtext" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_sustainability_cta_ctas" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" "enum_pages_blocks_sustainability_cta_ctas_link_type" DEFAULT 'custom',
      "link_label" varchar,
      "link_page_id" integer,
      "link_url" varchar,
      "link_open_in_new_tab" boolean DEFAULT false,
      "link_appearance" "enum_pages_blocks_sustainability_cta_ctas_link_appearance" DEFAULT 'primary'
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_sustainability_cta" (
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
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_sustainability_cta_ctas" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "link_type" "enum__pages_v_blocks_sustainability_cta_ctas_link_type" DEFAULT 'custom',
      "link_label" varchar,
      "link_page_id" integer,
      "link_url" varchar,
      "link_open_in_new_tab" boolean DEFAULT false,
      "link_appearance" "enum__pages_v_blocks_sustainability_cta_ctas_link_appearance" DEFAULT 'primary',
      "_uuid" varchar
    );

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_sustainability_hero" ADD CONSTRAINT "pages_blocks_sustainability_hero_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_sustainability_hero" ADD CONSTRAINT "pages_blocks_sustainability_hero_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_sustainability_hero_ctas" ADD CONSTRAINT "pages_blocks_sustainability_hero_ctas_link_page_id_fk"
        FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_sustainability_hero_ctas" ADD CONSTRAINT "pages_blocks_sustainability_hero_ctas_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_sustainability_hero"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_sustainability_hero_pills" ADD CONSTRAINT "pages_blocks_sustainability_hero_pills_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_sustainability_hero"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_sustainability_hero" ADD CONSTRAINT "_pages_v_blocks_sustainability_hero_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_sustainability_hero" ADD CONSTRAINT "_pages_v_blocks_sustainability_hero_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_sustainability_hero_ctas" ADD CONSTRAINT "_pages_v_blocks_sustainability_hero_ctas_link_page_id_fk"
        FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_sustainability_hero_ctas" ADD CONSTRAINT "_pages_v_blocks_sustainability_hero_ctas_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_sustainability_hero"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_sustainability_hero_pills" ADD CONSTRAINT "_pages_v_blocks_sustainability_hero_pills_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_sustainability_hero"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_sustainability_impact" ADD CONSTRAINT "pages_blocks_sustainability_impact_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_sustainability_impact_cards" ADD CONSTRAINT "pages_blocks_sustainability_impact_cards_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_sustainability_impact"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_sustainability_impact" ADD CONSTRAINT "_pages_v_blocks_sustainability_impact_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_sustainability_impact_cards" ADD CONSTRAINT "_pages_v_blocks_sustainability_impact_cards_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_sustainability_impact"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_sustainability_circular" ADD CONSTRAINT "pages_blocks_sustainability_circular_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_sustainability_circular_steps" ADD CONSTRAINT "pages_blocks_sustainability_circular_steps_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_sustainability_circular"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_sustainability_circular" ADD CONSTRAINT "_pages_v_blocks_sustainability_circular_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_sustainability_circular_steps" ADD CONSTRAINT "_pages_v_blocks_sustainability_circular_steps_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_sustainability_circular"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_sustainability_drop" ADD CONSTRAINT "pages_blocks_sustainability_drop_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_sustainability_drop" ADD CONSTRAINT "pages_blocks_sustainability_drop_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_sustainability_drop_paragraphs" ADD CONSTRAINT "pages_blocks_sustainability_drop_paragraphs_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_sustainability_drop"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_sustainability_drop" ADD CONSTRAINT "_pages_v_blocks_sustainability_drop_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_sustainability_drop" ADD CONSTRAINT "_pages_v_blocks_sustainability_drop_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_sustainability_drop_paragraphs" ADD CONSTRAINT "_pages_v_blocks_sustainability_drop_paragraphs_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_sustainability_drop"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_sustainability_numbers" ADD CONSTRAINT "pages_blocks_sustainability_numbers_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_sustainability_numbers_stats" ADD CONSTRAINT "pages_blocks_sustainability_numbers_stats_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_sustainability_numbers"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_sustainability_numbers" ADD CONSTRAINT "_pages_v_blocks_sustainability_numbers_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_sustainability_numbers_stats" ADD CONSTRAINT "_pages_v_blocks_sustainability_numbers_stats_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_sustainability_numbers"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_sustainability_applications" ADD CONSTRAINT "pages_blocks_sustainability_applications_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_sustainability_applications_cards" ADD CONSTRAINT "pages_blocks_sustainability_applications_cards_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_sustainability_applications"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_sustainability_applications" ADD CONSTRAINT "_pages_v_blocks_sustainability_applications_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_sustainability_applications_cards" ADD CONSTRAINT "_pages_v_blocks_sustainability_applications_cards_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_sustainability_applications"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_sustainability_cta" ADD CONSTRAINT "pages_blocks_sustainability_cta_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_sustainability_cta_ctas" ADD CONSTRAINT "pages_blocks_sustainability_cta_ctas_link_page_id_fk"
        FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_sustainability_cta_ctas" ADD CONSTRAINT "pages_blocks_sustainability_cta_ctas_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_sustainability_cta"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_sustainability_cta" ADD CONSTRAINT "_pages_v_blocks_sustainability_cta_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_sustainability_cta_ctas" ADD CONSTRAINT "_pages_v_blocks_sustainability_cta_ctas_link_page_id_fk"
        FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_sustainability_cta_ctas" ADD CONSTRAINT "_pages_v_blocks_sustainability_cta_ctas_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_sustainability_cta"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE INDEX IF NOT EXISTS "pages_blocks_sustainability_hero_order_idx" ON "pages_blocks_sustainability_hero" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_sustainability_hero_parent_id_idx" ON "pages_blocks_sustainability_hero" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_sustainability_hero_path_idx" ON "pages_blocks_sustainability_hero" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_sustainability_hero_image_idx" ON "pages_blocks_sustainability_hero" USING btree ("image_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_sustainability_hero_ctas_order_idx" ON "pages_blocks_sustainability_hero_ctas" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_sustainability_hero_ctas_parent_id_idx" ON "pages_blocks_sustainability_hero_ctas" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_sustainability_hero_pills_order_idx" ON "pages_blocks_sustainability_hero_pills" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_sustainability_hero_pills_parent_id_idx" ON "pages_blocks_sustainability_hero_pills" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_sustainability_hero_order_idx" ON "_pages_v_blocks_sustainability_hero" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_sustainability_hero_parent_id_idx" ON "_pages_v_blocks_sustainability_hero" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_sustainability_hero_path_idx" ON "_pages_v_blocks_sustainability_hero" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_sustainability_hero_image_idx" ON "_pages_v_blocks_sustainability_hero" USING btree ("image_id");

    CREATE INDEX IF NOT EXISTS "pages_blocks_sustainability_impact_order_idx" ON "pages_blocks_sustainability_impact" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_sustainability_impact_parent_id_idx" ON "pages_blocks_sustainability_impact" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_sustainability_impact_path_idx" ON "pages_blocks_sustainability_impact" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_sustainability_circular_order_idx" ON "pages_blocks_sustainability_circular" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_sustainability_circular_parent_id_idx" ON "pages_blocks_sustainability_circular" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_sustainability_circular_path_idx" ON "pages_blocks_sustainability_circular" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_sustainability_drop_order_idx" ON "pages_blocks_sustainability_drop" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_sustainability_drop_parent_id_idx" ON "pages_blocks_sustainability_drop" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_sustainability_drop_path_idx" ON "pages_blocks_sustainability_drop" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_sustainability_drop_image_idx" ON "pages_blocks_sustainability_drop" USING btree ("image_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_sustainability_numbers_order_idx" ON "pages_blocks_sustainability_numbers" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_sustainability_numbers_parent_id_idx" ON "pages_blocks_sustainability_numbers" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_sustainability_numbers_path_idx" ON "pages_blocks_sustainability_numbers" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_sustainability_applications_order_idx" ON "pages_blocks_sustainability_applications" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_sustainability_applications_parent_id_idx" ON "pages_blocks_sustainability_applications" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_sustainability_applications_path_idx" ON "pages_blocks_sustainability_applications" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_sustainability_cta_order_idx" ON "pages_blocks_sustainability_cta" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_sustainability_cta_parent_id_idx" ON "pages_blocks_sustainability_cta" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_sustainability_cta_path_idx" ON "pages_blocks_sustainability_cta" USING btree ("_path");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "pages_blocks_sustainability_hero_ctas" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_sustainability_hero_pills" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_sustainability_hero_ctas" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_sustainability_hero_pills" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_sustainability_hero" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_sustainability_hero" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_sustainability_impact_cards" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_sustainability_impact_cards" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_sustainability_impact" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_sustainability_impact" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_sustainability_circular_steps" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_sustainability_circular_steps" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_sustainability_circular" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_sustainability_circular" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_sustainability_drop_paragraphs" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_sustainability_drop_paragraphs" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_sustainability_drop" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_sustainability_drop" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_sustainability_numbers_stats" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_sustainability_numbers_stats" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_sustainability_numbers" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_sustainability_numbers" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_sustainability_applications_cards" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_sustainability_applications_cards" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_sustainability_applications" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_sustainability_applications" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_sustainability_cta_ctas" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_sustainability_cta_ctas" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_sustainability_cta" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_sustainability_cta" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_sustainability_hero_ctas_link_type";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_sustainability_hero_ctas_link_appearance";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_sustainability_hero_ctas_link_type";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_sustainability_hero_ctas_link_appearance";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_sustainability_cta_ctas_link_type";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_sustainability_cta_ctas_link_appearance";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_sustainability_cta_ctas_link_type";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_sustainability_cta_ctas_link_appearance";
  `);
}
