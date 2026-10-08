import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_faq_cta_ctas_link_type" AS ENUM('page', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_faq_cta_ctas_link_appearance" AS ENUM('primary', 'secondary', 'ghost');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_faq_cta_ctas_link_type" AS ENUM('page', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_faq_cta_ctas_link_appearance" AS ENUM('primary', 'secondary', 'ghost');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE TABLE IF NOT EXISTS "pages_blocks_faq_topics" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_faq_topics_topics" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_faq_topics_topics_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "question" varchar,
      "answer" varchar,
      "default_open" boolean DEFAULT false
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_faq_topics" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_faq_topics_topics" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "label" varchar,
      "_uuid" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_faq_topics_topics_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "question" varchar,
      "answer" varchar,
      "default_open" boolean DEFAULT false,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_faq_cta" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_faq_cta_ctas" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" "enum_pages_blocks_faq_cta_ctas_link_type" DEFAULT 'custom',
      "link_label" varchar,
      "link_page_id" integer,
      "link_url" varchar,
      "link_open_in_new_tab" boolean DEFAULT false,
      "link_appearance" "enum_pages_blocks_faq_cta_ctas_link_appearance" DEFAULT 'primary'
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_faq_cta" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_faq_cta_ctas" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "link_type" "enum__pages_v_blocks_faq_cta_ctas_link_type" DEFAULT 'custom',
      "link_label" varchar,
      "link_page_id" integer,
      "link_url" varchar,
      "link_open_in_new_tab" boolean DEFAULT false,
      "link_appearance" "enum__pages_v_blocks_faq_cta_ctas_link_appearance" DEFAULT 'primary',
      "_uuid" varchar
    );

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_faq_topics" ADD CONSTRAINT "pages_blocks_faq_topics_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_faq_topics_topics" ADD CONSTRAINT "pages_blocks_faq_topics_topics_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_topics"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_faq_topics_topics_items" ADD CONSTRAINT "pages_blocks_faq_topics_topics_items_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_topics_topics"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_faq_cta" ADD CONSTRAINT "pages_blocks_faq_cta_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_faq_cta_ctas" ADD CONSTRAINT "pages_blocks_faq_cta_ctas_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_cta"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_faq_topics" ADD CONSTRAINT "_pages_v_blocks_faq_topics_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_faq_cta" ADD CONSTRAINT "_pages_v_blocks_faq_cta_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE INDEX IF NOT EXISTS "pages_blocks_faq_topics_order_idx" ON "pages_blocks_faq_topics" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_faq_topics_parent_id_idx" ON "pages_blocks_faq_topics" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_faq_topics_path_idx" ON "pages_blocks_faq_topics" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_faq_cta_order_idx" ON "pages_blocks_faq_cta" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_faq_cta_parent_id_idx" ON "pages_blocks_faq_cta" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_faq_cta_path_idx" ON "pages_blocks_faq_cta" USING btree ("_path");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "pages_blocks_faq_topics_topics_items" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_faq_topics_topics" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_faq_cta_ctas" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_faq_topics_topics_items" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_faq_topics_topics" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_faq_cta_ctas" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_faq_topics" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_faq_cta" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_faq_topics" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_faq_cta" CASCADE;
  `);
}
