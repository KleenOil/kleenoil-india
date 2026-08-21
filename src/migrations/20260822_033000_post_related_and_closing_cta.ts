import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_posts_related_section_view_all_type" AS ENUM('page', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_posts_related_section_view_all_appearance" AS ENUM('primary', 'secondary', 'ghost');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_posts_closing_cta_ctas_link_type" AS ENUM('page', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_posts_closing_cta_ctas_link_appearance" AS ENUM('primary', 'secondary', 'ghost');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "related_section_eyebrow" varchar;
    ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "related_section_heading" varchar;
    ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "related_section_view_all_type" "enum_posts_related_section_view_all_type" DEFAULT 'custom';
    ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "related_section_view_all_label" varchar;
    ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "related_section_view_all_page_id" integer;
    ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "related_section_view_all_url" varchar;
    ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "related_section_view_all_open_in_new_tab" boolean DEFAULT false;
    ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "related_section_view_all_appearance" "enum_posts_related_section_view_all_appearance" DEFAULT 'ghost';
    ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "closing_cta_eyebrow" varchar;
    ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "closing_cta_heading" varchar;
    ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "closing_cta_description" varchar;

    CREATE TABLE IF NOT EXISTS "posts_related_section_posts" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "post_id" integer
    );

    CREATE TABLE IF NOT EXISTS "posts_closing_cta_ctas" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" "enum_posts_closing_cta_ctas_link_type" DEFAULT 'custom',
      "link_label" varchar,
      "link_page_id" integer,
      "link_url" varchar,
      "link_open_in_new_tab" boolean DEFAULT false,
      "link_appearance" "enum_posts_closing_cta_ctas_link_appearance" DEFAULT 'primary'
    );

    DO $$ BEGIN
      ALTER TABLE "posts" ADD CONSTRAINT "posts_related_section_view_all_page_id_pages_id_fk"
        FOREIGN KEY ("related_section_view_all_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "posts_related_section_posts" ADD CONSTRAINT "posts_related_section_posts_post_id_posts_id_fk"
        FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "posts_related_section_posts" ADD CONSTRAINT "posts_related_section_posts_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "posts_closing_cta_ctas" ADD CONSTRAINT "posts_closing_cta_ctas_link_page_id_pages_id_fk"
        FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "posts_closing_cta_ctas" ADD CONSTRAINT "posts_closing_cta_ctas_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE INDEX IF NOT EXISTS "posts_related_section_view_all_view_all_page_idx"
      ON "posts" USING btree ("related_section_view_all_page_id");
    CREATE INDEX IF NOT EXISTS "posts_related_section_posts_order_idx"
      ON "posts_related_section_posts" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "posts_related_section_posts_parent_id_idx"
      ON "posts_related_section_posts" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "posts_related_section_posts_post_idx"
      ON "posts_related_section_posts" USING btree ("post_id");
    CREATE INDEX IF NOT EXISTS "posts_closing_cta_ctas_order_idx"
      ON "posts_closing_cta_ctas" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "posts_closing_cta_ctas_parent_id_idx"
      ON "posts_closing_cta_ctas" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "posts_closing_cta_ctas_link_link_page_idx"
      ON "posts_closing_cta_ctas" USING btree ("link_page_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "posts" DROP CONSTRAINT IF EXISTS "posts_related_section_view_all_page_id_pages_id_fk";
    ALTER TABLE "posts_related_section_posts" DROP CONSTRAINT IF EXISTS "posts_related_section_posts_post_id_posts_id_fk";
    ALTER TABLE "posts_related_section_posts" DROP CONSTRAINT IF EXISTS "posts_related_section_posts_parent_id_fk";
    ALTER TABLE "posts_closing_cta_ctas" DROP CONSTRAINT IF EXISTS "posts_closing_cta_ctas_link_page_id_pages_id_fk";
    ALTER TABLE "posts_closing_cta_ctas" DROP CONSTRAINT IF EXISTS "posts_closing_cta_ctas_parent_id_fk";
    DROP TABLE IF EXISTS "posts_related_section_posts" CASCADE;
    DROP TABLE IF EXISTS "posts_closing_cta_ctas" CASCADE;
    ALTER TABLE "posts" DROP COLUMN IF EXISTS "related_section_eyebrow";
    ALTER TABLE "posts" DROP COLUMN IF EXISTS "related_section_heading";
    ALTER TABLE "posts" DROP COLUMN IF EXISTS "related_section_view_all_type";
    ALTER TABLE "posts" DROP COLUMN IF EXISTS "related_section_view_all_label";
    ALTER TABLE "posts" DROP COLUMN IF EXISTS "related_section_view_all_page_id";
    ALTER TABLE "posts" DROP COLUMN IF EXISTS "related_section_view_all_url";
    ALTER TABLE "posts" DROP COLUMN IF EXISTS "related_section_view_all_open_in_new_tab";
    ALTER TABLE "posts" DROP COLUMN IF EXISTS "related_section_view_all_appearance";
    ALTER TABLE "posts" DROP COLUMN IF EXISTS "closing_cta_eyebrow";
    ALTER TABLE "posts" DROP COLUMN IF EXISTS "closing_cta_heading";
    ALTER TABLE "posts" DROP COLUMN IF EXISTS "closing_cta_description";
    DROP TYPE IF EXISTS "public"."enum_posts_related_section_view_all_type";
    DROP TYPE IF EXISTS "public"."enum_posts_related_section_view_all_appearance";
    DROP TYPE IF EXISTS "public"."enum_posts_closing_cta_ctas_link_type";
    DROP TYPE IF EXISTS "public"."enum_posts_closing_cta_ctas_link_appearance";
  `);
}
