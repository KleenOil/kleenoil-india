import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

// Idempotent on purpose: local DBs were created with drizzle push, so this
// file is also applied from ensurePageBlockTables when tables are missing.
// Name new page-section migrations `*_page_blocks` and keep IF NOT EXISTS.

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_services_hero_ctas_link_type" AS ENUM('page', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_services_hero_ctas_link_appearance" AS ENUM('primary', 'secondary', 'ghost');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_services_hero_ctas_link_type" AS ENUM('page', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_services_hero_ctas_link_appearance" AS ENUM('primary', 'secondary', 'ghost');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_services_cta_ctas_link_type" AS ENUM('page', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_services_cta_ctas_link_appearance" AS ENUM('primary', 'secondary', 'ghost');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_services_cta_ctas_link_type" AS ENUM('page', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_services_cta_ctas_link_appearance" AS ENUM('primary', 'secondary', 'ghost');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE TABLE IF NOT EXISTS "pages_blocks_services_hero" (
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
    CREATE TABLE IF NOT EXISTS "pages_blocks_services_hero_ctas" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" "enum_pages_blocks_services_hero_ctas_link_type" DEFAULT 'custom',
      "link_label" varchar,
      "link_page_id" integer,
      "link_url" varchar,
      "link_open_in_new_tab" boolean DEFAULT false,
      "link_appearance" "enum_pages_blocks_services_hero_ctas_link_appearance" DEFAULT 'primary'
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_services_hero_cards" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "n" varchar,
      "kicker" varchar,
      "title" varchar,
      "body" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services_hero" (
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
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services_hero_ctas" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "link_type" "enum__pages_v_blocks_services_hero_ctas_link_type" DEFAULT 'custom',
      "link_label" varchar,
      "link_page_id" integer,
      "link_url" varchar,
      "link_open_in_new_tab" boolean DEFAULT false,
      "link_appearance" "enum__pages_v_blocks_services_hero_ctas_link_appearance" DEFAULT 'primary',
      "_uuid" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services_hero_cards" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "n" varchar,
      "kicker" varchar,
      "title" varchar,
      "body" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_services_offerings" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_services_offerings_cards" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "n" varchar,
      "title" varchar,
      "body" varchar,
      "link_label" varchar,
      "href" varchar,
      "image_id" integer
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services_offerings" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services_offerings_cards" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "n" varchar,
      "title" varchar,
      "body" varchar,
      "link_label" varchar,
      "href" varchar,
      "image_id" integer,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_services_fluids" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "kicker" varchar,
      "note" varchar,
      "image_id" integer,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_services_fluids_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "icon" varchar,
      "label" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services_fluids" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "kicker" varchar,
      "note" varchar,
      "image_id" integer,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services_fluids_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "icon" varchar,
      "label" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_services_program" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "description" varchar,
      "process_image_id" integer,
      "focus_kicker" varchar,
      "focus_heading" varchar,
      "focus_body" varchar,
      "focus_image_id" integer,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_services_program_questions" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "n" varchar,
      "icon" varchar,
      "title" varchar,
      "body" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_services_program_commitments" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "n" varchar,
      "title" varchar,
      "body" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services_program" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "description" varchar,
      "process_image_id" integer,
      "focus_kicker" varchar,
      "focus_heading" varchar,
      "focus_body" varchar,
      "focus_image_id" integer,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services_program_questions" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "n" varchar,
      "icon" varchar,
      "title" varchar,
      "body" varchar,
      "_uuid" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services_program_commitments" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "n" varchar,
      "title" varchar,
      "body" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_services_visit" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_services_visit_steps" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "n" varchar,
      "icon" varchar,
      "title" varchar,
      "body" varchar,
      "image_id" integer
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services_visit" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services_visit_steps" (
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

    CREATE TABLE IF NOT EXISTS "pages_blocks_services_industries" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "kicker" varchar,
      "heading" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_services_industries_photos" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar,
      "image_id" integer
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_services_industries_chips" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services_industries" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "kicker" varchar,
      "heading" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services_industries_photos" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "label" varchar,
      "image_id" integer,
      "_uuid" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services_industries_chips" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "label" varchar,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_services_cta" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "subtext" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_services_cta_ctas" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" "enum_pages_blocks_services_cta_ctas_link_type" DEFAULT 'custom',
      "link_label" varchar,
      "link_page_id" integer,
      "link_url" varchar,
      "link_open_in_new_tab" boolean DEFAULT false,
      "link_appearance" "enum_pages_blocks_services_cta_ctas_link_appearance" DEFAULT 'primary'
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services_cta" (
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
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services_cta_ctas" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "link_type" "enum__pages_v_blocks_services_cta_ctas_link_type" DEFAULT 'custom',
      "link_label" varchar,
      "link_page_id" integer,
      "link_url" varchar,
      "link_open_in_new_tab" boolean DEFAULT false,
      "link_appearance" "enum__pages_v_blocks_services_cta_ctas_link_appearance" DEFAULT 'primary',
      "_uuid" varchar
    );

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_services_hero" ADD CONSTRAINT "pages_blocks_services_hero_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_services_hero" ADD CONSTRAINT "pages_blocks_services_hero_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_services_hero_ctas" ADD CONSTRAINT "pages_blocks_services_hero_ctas_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_hero"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_services_hero_cards" ADD CONSTRAINT "pages_blocks_services_hero_cards_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_hero"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_services_offerings" ADD CONSTRAINT "pages_blocks_services_offerings_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_services_offerings_cards" ADD CONSTRAINT "pages_blocks_services_offerings_cards_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_offerings"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_services_fluids" ADD CONSTRAINT "pages_blocks_services_fluids_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_services_fluids_items" ADD CONSTRAINT "pages_blocks_services_fluids_items_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_fluids"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_services_program" ADD CONSTRAINT "pages_blocks_services_program_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_services_program_questions" ADD CONSTRAINT "pages_blocks_services_program_questions_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_program"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_services_program_commitments" ADD CONSTRAINT "pages_blocks_services_program_commitments_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_program"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_services_visit" ADD CONSTRAINT "pages_blocks_services_visit_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_services_visit_steps" ADD CONSTRAINT "pages_blocks_services_visit_steps_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_visit"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_services_industries" ADD CONSTRAINT "pages_blocks_services_industries_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_services_industries_photos" ADD CONSTRAINT "pages_blocks_services_industries_photos_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_industries"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_services_industries_chips" ADD CONSTRAINT "pages_blocks_services_industries_chips_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_industries"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_services_cta" ADD CONSTRAINT "pages_blocks_services_cta_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_services_cta_ctas" ADD CONSTRAINT "pages_blocks_services_cta_ctas_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_cta"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE INDEX IF NOT EXISTS "pages_blocks_services_hero_order_idx" ON "pages_blocks_services_hero" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_services_hero_parent_id_idx" ON "pages_blocks_services_hero" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_services_hero_path_idx" ON "pages_blocks_services_hero" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_services_offerings_order_idx" ON "pages_blocks_services_offerings" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_services_offerings_parent_id_idx" ON "pages_blocks_services_offerings" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_services_fluids_order_idx" ON "pages_blocks_services_fluids" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_services_fluids_parent_id_idx" ON "pages_blocks_services_fluids" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_services_program_order_idx" ON "pages_blocks_services_program" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_services_program_parent_id_idx" ON "pages_blocks_services_program" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_services_visit_order_idx" ON "pages_blocks_services_visit" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_services_visit_parent_id_idx" ON "pages_blocks_services_visit" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_services_industries_order_idx" ON "pages_blocks_services_industries" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_services_industries_parent_id_idx" ON "pages_blocks_services_industries" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_services_cta_order_idx" ON "pages_blocks_services_cta" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_services_cta_parent_id_idx" ON "pages_blocks_services_cta" USING btree ("_parent_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "pages_blocks_services_hero_ctas" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_services_hero_cards" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_services_hero_ctas" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_services_hero_cards" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_services_hero" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_services_hero" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_services_offerings_cards" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_services_offerings_cards" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_services_offerings" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_services_offerings" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_services_fluids_items" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_services_fluids_items" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_services_fluids" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_services_fluids" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_services_program_questions" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_services_program_commitments" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_services_program_questions" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_services_program_commitments" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_services_program" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_services_program" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_services_visit_steps" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_services_visit_steps" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_services_visit" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_services_visit" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_services_industries_photos" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_services_industries_chips" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_services_industries_photos" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_services_industries_chips" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_services_industries" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_services_industries" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_services_cta_ctas" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_services_cta_ctas" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_services_cta" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_services_cta" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_services_hero_ctas_link_type";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_services_hero_ctas_link_appearance";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_services_hero_ctas_link_type";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_services_hero_ctas_link_appearance";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_services_cta_ctas_link_type";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_services_cta_ctas_link_appearance";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_services_cta_ctas_link_type";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_services_cta_ctas_link_appearance";
  `);
}
