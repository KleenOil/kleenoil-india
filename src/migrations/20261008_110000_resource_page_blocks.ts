import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_resource_hero_ctas_link_type" AS ENUM('page', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_resource_hero_ctas_link_appearance" AS ENUM('primary', 'secondary', 'ghost');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_resource_hero_ctas_link_type" AS ENUM('page', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_resource_hero_ctas_link_appearance" AS ENUM('primary', 'secondary', 'ghost');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE TABLE IF NOT EXISTS "pages_blocks_resource_hero" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "variant" varchar DEFAULT 'industries',
      "eyebrow" varchar,
      "heading" varchar,
      "lead" varchar,
      "image_id" integer,
      "quote" varchar,
      "attribution" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_resource_hero_ctas" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" "enum_pages_blocks_resource_hero_ctas_link_type" DEFAULT 'custom',
      "link_label" varchar,
      "link_page_id" integer,
      "link_url" varchar,
      "link_open_in_new_tab" boolean DEFAULT false,
      "link_appearance" "enum_pages_blocks_resource_hero_ctas_link_appearance" DEFAULT 'primary'
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_resource_hero_stats" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "n" varchar,
      "label" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_resource_hero_previews" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "kicker" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_resource_hero" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "variant" varchar DEFAULT 'industries',
      "eyebrow" varchar,
      "heading" varchar,
      "lead" varchar,
      "image_id" integer,
      "quote" varchar,
      "attribution" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_resource_hero_ctas" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "link_type" "enum__pages_v_blocks_resource_hero_ctas_link_type" DEFAULT 'custom',
      "link_label" varchar,
      "link_page_id" integer,
      "link_url" varchar,
      "link_open_in_new_tab" boolean DEFAULT false,
      "link_appearance" "enum__pages_v_blocks_resource_hero_ctas_link_appearance" DEFAULT 'primary',
      "_uuid" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_resource_hero_stats" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "n" varchar,
      "label" varchar,
      "_uuid" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_resource_hero_previews" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "kicker" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_resource_pdfs" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "variant" varchar DEFAULT 'industries',
      "eyebrow" varchar,
      "heading" varchar,
      "description" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_resource_pdfs_cards" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "meta" varchar,
      "href" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_resource_pdfs" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "variant" varchar DEFAULT 'industries',
      "eyebrow" varchar,
      "heading" varchar,
      "description" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_resource_pdfs_cards" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "meta" varchar,
      "href" varchar,
      "_uuid" varchar
    );

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_resource_hero" ADD CONSTRAINT "pages_blocks_resource_hero_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_resource_hero" ADD CONSTRAINT "pages_blocks_resource_hero_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_resource_hero_ctas" ADD CONSTRAINT "pages_blocks_resource_hero_ctas_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_resource_hero"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_resource_hero_stats" ADD CONSTRAINT "pages_blocks_resource_hero_stats_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_resource_hero"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_resource_hero_previews" ADD CONSTRAINT "pages_blocks_resource_hero_previews_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_resource_hero"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_resource_pdfs" ADD CONSTRAINT "pages_blocks_resource_pdfs_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_resource_pdfs_cards" ADD CONSTRAINT "pages_blocks_resource_pdfs_cards_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_resource_pdfs"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_resource_hero" ADD CONSTRAINT "_pages_v_blocks_resource_hero_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_resource_pdfs" ADD CONSTRAINT "_pages_v_blocks_resource_pdfs_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE INDEX IF NOT EXISTS "pages_blocks_resource_hero_order_idx" ON "pages_blocks_resource_hero" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_resource_hero_parent_id_idx" ON "pages_blocks_resource_hero" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_resource_hero_path_idx" ON "pages_blocks_resource_hero" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_resource_pdfs_order_idx" ON "pages_blocks_resource_pdfs" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_resource_pdfs_parent_id_idx" ON "pages_blocks_resource_pdfs" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_resource_pdfs_path_idx" ON "pages_blocks_resource_pdfs" USING btree ("_path");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "pages_blocks_resource_hero_previews" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_resource_hero_stats" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_resource_hero_ctas" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_resource_pdfs_cards" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_resource_hero_previews" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_resource_hero_stats" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_resource_hero_ctas" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_resource_pdfs_cards" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_resource_hero" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_resource_pdfs" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_resource_hero" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_resource_pdfs" CASCADE;
  `);
}
