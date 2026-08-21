import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_articles_hero_cta_type" AS ENUM('page', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_articles_hero_cta_appearance" AS ENUM('primary', 'secondary', 'ghost');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_articles_hero_cta_type" AS ENUM('page', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_articles_hero_cta_appearance" AS ENUM('primary', 'secondary', 'ghost');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE TABLE IF NOT EXISTS "posts" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "excerpt" varchar,
      "category" varchar,
      "featured_image_id" integer,
      "published_at" timestamp(3) with time zone,
      "show_in_journal" boolean DEFAULT true,
      "content" jsonb,
      "seo_meta_title" varchar,
      "seo_meta_description" varchar,
      "seo_og_image_id" integer,
      "seo_canonical_url" varchar,
      "seo_no_index" boolean DEFAULT false,
      "seo_no_follow" boolean DEFAULT false,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_articles_hero" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "subheadline" varchar,
      "image_id" integer,
      "cta_type" "enum_pages_blocks_articles_hero_cta_type" DEFAULT 'custom',
      "cta_label" varchar,
      "cta_page_id" integer,
      "cta_url" varchar,
      "cta_open_in_new_tab" boolean DEFAULT false,
      "cta_appearance" "enum_pages_blocks_articles_hero_cta_appearance" DEFAULT 'primary',
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_articles_hero" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "subheadline" varchar,
      "image_id" integer,
      "cta_type" "enum__pages_v_blocks_articles_hero_cta_type" DEFAULT 'custom',
      "cta_label" varchar,
      "cta_page_id" integer,
      "cta_url" varchar,
      "cta_open_in_new_tab" boolean DEFAULT false,
      "cta_appearance" "enum__pages_v_blocks_articles_hero_cta_appearance" DEFAULT 'primary',
      "_uuid" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_articles_featured" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "description" varchar,
      "featured_post_id" integer,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_articles_featured" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "description" varchar,
      "featured_post_id" integer,
      "_uuid" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_articles_index" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "description" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_articles_index_hidden_posts" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "post_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_articles_index" (
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

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_articles_index_hidden_posts" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "post_id" integer,
      "_uuid" varchar
    );

    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "posts_id" integer;

    DO $$ BEGIN
      ALTER TABLE "posts" ADD CONSTRAINT "posts_featured_image_id_media_id_fk"
        FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "posts" ADD CONSTRAINT "posts_seo_og_image_id_media_id_fk"
        FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_articles_hero" ADD CONSTRAINT "pages_blocks_articles_hero_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_articles_hero" ADD CONSTRAINT "pages_blocks_articles_hero_cta_page_id_pages_id_fk"
        FOREIGN KEY ("cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_articles_hero" ADD CONSTRAINT "pages_blocks_articles_hero_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_articles_hero" ADD CONSTRAINT "_pages_v_blocks_articles_hero_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_articles_hero" ADD CONSTRAINT "_pages_v_blocks_articles_hero_cta_page_id_pages_id_fk"
        FOREIGN KEY ("cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_articles_hero" ADD CONSTRAINT "_pages_v_blocks_articles_hero_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_articles_featured" ADD CONSTRAINT "pages_blocks_articles_featured_featured_post_id_posts_id_fk"
        FOREIGN KEY ("featured_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_articles_featured" ADD CONSTRAINT "pages_blocks_articles_featured_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_articles_featured" ADD CONSTRAINT "_pages_v_blocks_articles_featured_featured_post_id_posts_id_fk"
        FOREIGN KEY ("featured_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_articles_featured" ADD CONSTRAINT "_pages_v_blocks_articles_featured_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_articles_index" ADD CONSTRAINT "pages_blocks_articles_index_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_articles_index_hidden_posts" ADD CONSTRAINT "pages_blocks_articles_index_hidden_posts_post_id_posts_id_fk"
        FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_articles_index_hidden_posts" ADD CONSTRAINT "pages_blocks_articles_index_hidden_posts_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_articles_index"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_articles_index" ADD CONSTRAINT "_pages_v_blocks_articles_index_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_articles_index_hidden_posts" ADD CONSTRAINT "_pages_v_blocks_ai_hidden_posts_post_id_posts_id_fk"
        FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_articles_index_hidden_posts" ADD CONSTRAINT "_pages_v_blocks_ai_hidden_posts_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_articles_index"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk"
        FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE UNIQUE INDEX IF NOT EXISTS "posts_slug_idx" ON "posts" USING btree ("slug");
    CREATE INDEX IF NOT EXISTS "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "posts_created_at_idx" ON "posts" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "posts_featured_image_idx" ON "posts" USING btree ("featured_image_id");
    CREATE INDEX IF NOT EXISTS "posts_seo_og_image_idx" ON "posts" USING btree ("seo_og_image_id");

    CREATE INDEX IF NOT EXISTS "pages_blocks_articles_hero_order_idx" ON "pages_blocks_articles_hero" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_articles_hero_parent_id_idx" ON "pages_blocks_articles_hero" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_articles_hero_path_idx" ON "pages_blocks_articles_hero" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_articles_hero_image_idx" ON "pages_blocks_articles_hero" USING btree ("image_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_articles_hero_cta_cta_page_idx" ON "pages_blocks_articles_hero" USING btree ("cta_page_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_articles_hero_order_idx" ON "_pages_v_blocks_articles_hero" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_articles_hero_parent_id_idx" ON "_pages_v_blocks_articles_hero" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_articles_hero_path_idx" ON "_pages_v_blocks_articles_hero" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_articles_hero_image_idx" ON "_pages_v_blocks_articles_hero" USING btree ("image_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_articles_hero_cta_cta_page_idx" ON "_pages_v_blocks_articles_hero" USING btree ("cta_page_id");

    CREATE INDEX IF NOT EXISTS "pages_blocks_articles_featured_order_idx" ON "pages_blocks_articles_featured" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_articles_featured_parent_id_idx" ON "pages_blocks_articles_featured" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_articles_featured_path_idx" ON "pages_blocks_articles_featured" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_articles_featured_featured_post_idx" ON "pages_blocks_articles_featured" USING btree ("featured_post_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_articles_featured_order_idx" ON "_pages_v_blocks_articles_featured" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_articles_featured_parent_id_idx" ON "_pages_v_blocks_articles_featured" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_articles_featured_path_idx" ON "_pages_v_blocks_articles_featured" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_articles_featured_featured_post_idx" ON "_pages_v_blocks_articles_featured" USING btree ("featured_post_id");

    CREATE INDEX IF NOT EXISTS "pages_blocks_articles_index_order_idx" ON "pages_blocks_articles_index" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_articles_index_parent_id_idx" ON "pages_blocks_articles_index" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_articles_index_path_idx" ON "pages_blocks_articles_index" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_articles_index_hidden_posts_order_idx" ON "pages_blocks_articles_index_hidden_posts" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_articles_index_hidden_posts_parent_id_idx" ON "pages_blocks_articles_index_hidden_posts" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_articles_index_hidden_posts_post_idx" ON "pages_blocks_articles_index_hidden_posts" USING btree ("post_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_articles_index_order_idx" ON "_pages_v_blocks_articles_index" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_articles_index_parent_id_idx" ON "_pages_v_blocks_articles_index" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_articles_index_path_idx" ON "_pages_v_blocks_articles_index" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ai_hidden_posts_order_idx" ON "_pages_v_blocks_articles_index_hidden_posts" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ai_hidden_posts_parent_id_idx" ON "_pages_v_blocks_articles_index_hidden_posts" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ai_hidden_posts_post_idx" ON "_pages_v_blocks_articles_index_hidden_posts" USING btree ("post_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_posts_fk";
    DROP INDEX IF EXISTS "payload_locked_documents_rels_posts_id_idx";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "posts_id";

    DROP TABLE IF EXISTS "pages_blocks_articles_index_hidden_posts" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_articles_index_hidden_posts" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_articles_index" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_articles_index" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_articles_featured" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_articles_featured" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_articles_hero" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_articles_hero" CASCADE;
    DROP TABLE IF EXISTS "posts" CASCADE;

    DROP TYPE IF EXISTS "public"."enum_pages_blocks_articles_hero_cta_type";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_articles_hero_cta_appearance";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_articles_hero_cta_type";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_articles_hero_cta_appearance";
  `);
}
