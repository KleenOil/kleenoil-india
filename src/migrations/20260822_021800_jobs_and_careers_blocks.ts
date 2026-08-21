import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_jobs_apply_type" AS ENUM('page', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE TABLE IF NOT EXISTS "jobs" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "department" varchar,
      "location" varchar,
      "employment_type" varchar DEFAULT 'Full-time',
      "excerpt" varchar,
      "about_the_role" varchar,
      "what_you_will_do" varchar,
      "what_you_bring" varchar,
      "what_we_offer" varchar,
      "apply_type" "enum_jobs_apply_type" DEFAULT 'custom',
      "apply_label" varchar,
      "apply_page_id" integer,
      "apply_url" varchar,
      "apply_open_in_new_tab" boolean DEFAULT false,
      "slug" varchar NOT NULL,
      "published_at" timestamp(3) with time zone,
      "show_on_careers" boolean DEFAULT true,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_careers_hero" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "subheadline" varchar,
      "cities" varchar,
      "image_id" integer,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_careers_hero" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "subheadline" varchar,
      "cities" varchar,
      "image_id" integer,
      "_uuid" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_careers_index" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "description" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_careers_index_hidden_jobs" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "job_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_careers_index" (
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

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_careers_index_hidden_jobs" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "job_id" integer,
      "_uuid" varchar
    );

    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "jobs_id" integer;

    DO $$ BEGIN
      ALTER TABLE "jobs" ADD CONSTRAINT "jobs_apply_page_id_pages_id_fk"
        FOREIGN KEY ("apply_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_careers_hero" ADD CONSTRAINT "pages_blocks_careers_hero_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_careers_hero" ADD CONSTRAINT "pages_blocks_careers_hero_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_careers_hero" ADD CONSTRAINT "_pages_v_blocks_careers_hero_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_careers_hero" ADD CONSTRAINT "_pages_v_blocks_careers_hero_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_careers_index" ADD CONSTRAINT "pages_blocks_careers_index_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_careers_index_hidden_jobs" ADD CONSTRAINT "pages_blocks_careers_index_hidden_jobs_job_id_jobs_id_fk"
        FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_careers_index_hidden_jobs" ADD CONSTRAINT "pages_blocks_careers_index_hidden_jobs_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_careers_index"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_careers_index" ADD CONSTRAINT "_pages_v_blocks_careers_index_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_careers_index_hidden_jobs" ADD CONSTRAINT "_pages_v_blocks_ci_hidden_jobs_job_id_jobs_id_fk"
        FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_careers_index_hidden_jobs" ADD CONSTRAINT "_pages_v_blocks_ci_hidden_jobs_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_careers_index"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_jobs_fk"
        FOREIGN KEY ("jobs_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE UNIQUE INDEX IF NOT EXISTS "jobs_slug_idx" ON "jobs" USING btree ("slug");
    CREATE INDEX IF NOT EXISTS "jobs_updated_at_idx" ON "jobs" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "jobs_created_at_idx" ON "jobs" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "jobs_apply_apply_page_idx" ON "jobs" USING btree ("apply_page_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_careers_hero_order_idx" ON "pages_blocks_careers_hero" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_careers_hero_parent_id_idx" ON "pages_blocks_careers_hero" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_careers_hero_path_idx" ON "pages_blocks_careers_hero" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_careers_hero_image_idx" ON "pages_blocks_careers_hero" USING btree ("image_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_careers_hero_order_idx" ON "_pages_v_blocks_careers_hero" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_careers_hero_parent_id_idx" ON "_pages_v_blocks_careers_hero" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_careers_hero_path_idx" ON "_pages_v_blocks_careers_hero" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_careers_hero_image_idx" ON "_pages_v_blocks_careers_hero" USING btree ("image_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_careers_index_order_idx" ON "pages_blocks_careers_index" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_careers_index_parent_id_idx" ON "pages_blocks_careers_index" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_careers_index_path_idx" ON "pages_blocks_careers_index" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_careers_index_hidden_jobs_order_idx" ON "pages_blocks_careers_index_hidden_jobs" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_careers_index_hidden_jobs_parent_id_idx" ON "pages_blocks_careers_index_hidden_jobs" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_careers_index_hidden_jobs_job_idx" ON "pages_blocks_careers_index_hidden_jobs" USING btree ("job_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_careers_index_order_idx" ON "_pages_v_blocks_careers_index" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_careers_index_parent_id_idx" ON "_pages_v_blocks_careers_index" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_careers_index_path_idx" ON "_pages_v_blocks_careers_index" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ci_hidden_jobs_order_idx" ON "_pages_v_blocks_careers_index_hidden_jobs" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ci_hidden_jobs_parent_id_idx" ON "_pages_v_blocks_careers_index_hidden_jobs" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ci_hidden_jobs_job_idx" ON "_pages_v_blocks_careers_index_hidden_jobs" USING btree ("job_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("jobs_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_jobs_fk";
    DROP INDEX IF EXISTS "payload_locked_documents_rels_jobs_id_idx";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "jobs_id";

    DROP TABLE IF EXISTS "pages_blocks_careers_index_hidden_jobs" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_careers_index_hidden_jobs" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_careers_index" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_careers_index" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_careers_hero" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_careers_hero" CASCADE;
    DROP TABLE IF EXISTS "jobs" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_jobs_apply_type";
  `);
}
