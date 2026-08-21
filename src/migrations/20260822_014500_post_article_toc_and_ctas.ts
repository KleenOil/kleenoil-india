import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_posts_hero_cta_type" AS ENUM('page', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_posts_sidebar_cta_link_type" AS ENUM('page', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "hero_cta_type" "enum_posts_hero_cta_type" DEFAULT 'custom';
    ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "hero_cta_label" varchar;
    ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "hero_cta_page_id" integer;
    ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "hero_cta_url" varchar;
    ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "hero_cta_open_in_new_tab" boolean DEFAULT false;
    ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "sidebar_cta_heading" varchar;
    ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "sidebar_cta_description" varchar;
    ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "sidebar_cta_link_type" "enum_posts_sidebar_cta_link_type" DEFAULT 'custom';
    ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "sidebar_cta_link_label" varchar;
    ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "sidebar_cta_link_page_id" integer;
    ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "sidebar_cta_link_url" varchar;
    ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "sidebar_cta_link_open_in_new_tab" boolean DEFAULT false;

    CREATE TABLE IF NOT EXISTS "posts_table_of_contents" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar,
      "heading" varchar
    );

    DO $$ BEGIN
      ALTER TABLE "posts" ADD CONSTRAINT "posts_hero_cta_page_id_pages_id_fk"
        FOREIGN KEY ("hero_cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "posts" ADD CONSTRAINT "posts_sidebar_cta_link_page_id_pages_id_fk"
        FOREIGN KEY ("sidebar_cta_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "posts_table_of_contents" ADD CONSTRAINT "posts_table_of_contents_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE INDEX IF NOT EXISTS "posts_hero_cta_hero_cta_page_idx" ON "posts" USING btree ("hero_cta_page_id");
    CREATE INDEX IF NOT EXISTS "posts_sidebar_cta_link_sidebar_cta_link_page_idx" ON "posts" USING btree ("sidebar_cta_link_page_id");
    CREATE INDEX IF NOT EXISTS "posts_table_of_contents_order_idx" ON "posts_table_of_contents" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "posts_table_of_contents_parent_id_idx" ON "posts_table_of_contents" USING btree ("_parent_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "posts" DROP CONSTRAINT IF EXISTS "posts_hero_cta_page_id_pages_id_fk";
    ALTER TABLE "posts" DROP CONSTRAINT IF EXISTS "posts_sidebar_cta_link_page_id_pages_id_fk";
    DROP TABLE IF EXISTS "posts_table_of_contents" CASCADE;
    ALTER TABLE "posts" DROP COLUMN IF EXISTS "hero_cta_type";
    ALTER TABLE "posts" DROP COLUMN IF EXISTS "hero_cta_label";
    ALTER TABLE "posts" DROP COLUMN IF EXISTS "hero_cta_page_id";
    ALTER TABLE "posts" DROP COLUMN IF EXISTS "hero_cta_url";
    ALTER TABLE "posts" DROP COLUMN IF EXISTS "hero_cta_open_in_new_tab";
    ALTER TABLE "posts" DROP COLUMN IF EXISTS "sidebar_cta_heading";
    ALTER TABLE "posts" DROP COLUMN IF EXISTS "sidebar_cta_description";
    ALTER TABLE "posts" DROP COLUMN IF EXISTS "sidebar_cta_link_type";
    ALTER TABLE "posts" DROP COLUMN IF EXISTS "sidebar_cta_link_label";
    ALTER TABLE "posts" DROP COLUMN IF EXISTS "sidebar_cta_link_page_id";
    ALTER TABLE "posts" DROP COLUMN IF EXISTS "sidebar_cta_link_url";
    ALTER TABLE "posts" DROP COLUMN IF EXISTS "sidebar_cta_link_open_in_new_tab";
    DROP TYPE IF EXISTS "public"."enum_posts_hero_cta_type";
    DROP TYPE IF EXISTS "public"."enum_posts_sidebar_cta_link_type";
  `);
}
