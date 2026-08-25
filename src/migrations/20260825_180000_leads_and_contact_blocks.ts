import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_leads_industry" AS ENUM('automotive', 'steel', 'marine', 'power', 'cement', 'rail');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_leads_timing" AS ENUM('this-week', 'next-two-weeks', 'flexible');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_leads_status" AS ENUM('new', 'contacted', 'closed');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE TABLE IF NOT EXISTS "leads" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "email" varchar NOT NULL,
      "company" varchar,
      "plant" varchar,
      "industry" "enum_leads_industry",
      "timing" "enum_leads_timing",
      "message" varchar,
      "status" "enum_leads_status" DEFAULT 'new' NOT NULL,
      "source" varchar DEFAULT 'consultation',
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    ALTER TABLE "site_settings"
      ADD COLUMN IF NOT EXISTS "lead_notification_email" varchar;

    CREATE TABLE IF NOT EXISTS "pages_blocks_contact_hero" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "subheadline" varchar,
      "image_id" integer,
      "phone_label" varchar,
      "phone_number" varchar,
      "form_title" varchar,
      "form_lead" varchar,
      "submit_label" varchar,
      "fine_print" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_contact_hero_benefits" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_contact_hero" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "subheadline" varchar,
      "image_id" integer,
      "phone_label" varchar,
      "phone_number" varchar,
      "form_title" varchar,
      "form_lead" varchar,
      "submit_label" varchar,
      "fine_print" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_contact_hero_benefits" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "label" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_contact_process" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_contact_process_steps" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_contact_process" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_contact_process_steps" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "description" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_contact_channels" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_contact_channels" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );

    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "leads_id" integer;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_contact_hero" ADD CONSTRAINT "pages_blocks_contact_hero_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_contact_hero" ADD CONSTRAINT "pages_blocks_contact_hero_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_contact_hero_benefits" ADD CONSTRAINT "pages_blocks_contact_hero_benefits_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_hero"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_contact_hero" ADD CONSTRAINT "_pages_v_blocks_contact_hero_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_contact_hero" ADD CONSTRAINT "_pages_v_blocks_contact_hero_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_contact_hero_benefits" ADD CONSTRAINT "_pages_v_blocks_contact_hero_benefits_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_hero"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_contact_process" ADD CONSTRAINT "pages_blocks_contact_process_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_contact_process_steps" ADD CONSTRAINT "pages_blocks_contact_process_steps_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_process"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_contact_process" ADD CONSTRAINT "_pages_v_blocks_contact_process_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_contact_process_steps" ADD CONSTRAINT "_pages_v_blocks_contact_process_steps_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_process"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_contact_channels" ADD CONSTRAINT "pages_blocks_contact_channels_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_contact_channels" ADD CONSTRAINT "_pages_v_blocks_contact_channels_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leads_fk"
        FOREIGN KEY ("leads_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE INDEX IF NOT EXISTS "leads_updated_at_idx" ON "leads" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "leads_created_at_idx" ON "leads" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "pages_blocks_contact_hero_order_idx" ON "pages_blocks_contact_hero" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_contact_hero_parent_id_idx" ON "pages_blocks_contact_hero" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_contact_hero_path_idx" ON "pages_blocks_contact_hero" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_contact_hero_image_idx" ON "pages_blocks_contact_hero" USING btree ("image_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_contact_hero_benefits_order_idx" ON "pages_blocks_contact_hero_benefits" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_contact_hero_benefits_parent_id_idx" ON "pages_blocks_contact_hero_benefits" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_hero_order_idx" ON "_pages_v_blocks_contact_hero" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_hero_parent_id_idx" ON "_pages_v_blocks_contact_hero" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_hero_path_idx" ON "_pages_v_blocks_contact_hero" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_hero_image_idx" ON "_pages_v_blocks_contact_hero" USING btree ("image_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_hero_benefits_order_idx" ON "_pages_v_blocks_contact_hero_benefits" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_hero_benefits_parent_id_idx" ON "_pages_v_blocks_contact_hero_benefits" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_contact_process_order_idx" ON "pages_blocks_contact_process" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_contact_process_parent_id_idx" ON "pages_blocks_contact_process" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_contact_process_path_idx" ON "pages_blocks_contact_process" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_contact_process_steps_order_idx" ON "pages_blocks_contact_process_steps" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_contact_process_steps_parent_id_idx" ON "pages_blocks_contact_process_steps" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_process_order_idx" ON "_pages_v_blocks_contact_process" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_process_parent_id_idx" ON "_pages_v_blocks_contact_process" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_process_path_idx" ON "_pages_v_blocks_contact_process" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_process_steps_order_idx" ON "_pages_v_blocks_contact_process_steps" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_process_steps_parent_id_idx" ON "_pages_v_blocks_contact_process_steps" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_contact_channels_order_idx" ON "pages_blocks_contact_channels" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_contact_channels_parent_id_idx" ON "pages_blocks_contact_channels" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_contact_channels_path_idx" ON "pages_blocks_contact_channels" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_channels_order_idx" ON "_pages_v_blocks_contact_channels" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_channels_parent_id_idx" ON "_pages_v_blocks_contact_channels" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_channels_path_idx" ON "_pages_v_blocks_contact_channels" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_leads_id_idx" ON "payload_locked_documents_rels" USING btree ("leads_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_leads_fk";
    DROP INDEX IF EXISTS "payload_locked_documents_rels_leads_id_idx";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "leads_id";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "lead_notification_email";

    DROP TABLE IF EXISTS "pages_blocks_contact_hero_benefits" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_contact_hero_benefits" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_contact_hero" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_contact_hero" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_contact_process_steps" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_contact_process_steps" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_contact_process" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_contact_process" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_contact_channels" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_contact_channels" CASCADE;
    DROP TABLE IF EXISTS "leads" CASCADE;

    DROP TYPE IF EXISTS "public"."enum_leads_industry";
    DROP TYPE IF EXISTS "public"."enum_leads_timing";
    DROP TYPE IF EXISTS "public"."enum_leads_status";
  `);
}
