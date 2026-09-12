import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_contact_hero_questions_field" AS ENUM('text', 'dropdown', 'textarea');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_contact_hero_questions_width" AS ENUM('half', 'full');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_contact_hero_questions_field" AS ENUM('text', 'dropdown', 'textarea');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_contact_hero_questions_width" AS ENUM('half', 'full');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE TABLE IF NOT EXISTS "pages_blocks_contact_hero_questions" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar,
      "name" varchar,
      "field" "enum_pages_blocks_contact_hero_questions_field" DEFAULT 'text',
      "width" "enum_pages_blocks_contact_hero_questions_width" DEFAULT 'full',
      "required" boolean DEFAULT false
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_contact_hero_questions_options" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar,
      "value" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_contact_hero_questions" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "label" varchar,
      "name" varchar,
      "field" "enum__pages_v_blocks_contact_hero_questions_field" DEFAULT 'text',
      "width" "enum__pages_v_blocks_contact_hero_questions_width" DEFAULT 'full',
      "required" boolean DEFAULT false,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_contact_hero_questions_options" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "label" varchar,
      "value" varchar,
      "_uuid" varchar
    );

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_contact_hero_questions"
        ADD CONSTRAINT "pages_blocks_contact_hero_questions_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_hero"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_contact_hero_questions_options"
        ADD CONSTRAINT "pages_blocks_contact_hero_questions_options_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_hero_questions"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_contact_hero_questions"
        ADD CONSTRAINT "_pages_v_blocks_contact_hero_questions_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_hero"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_contact_hero_questions_options"
        ADD CONSTRAINT "_pages_v_blocks_contact_hero_questions_options_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_hero_questions"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE INDEX IF NOT EXISTS "pages_blocks_contact_hero_questions_order_idx"
      ON "pages_blocks_contact_hero_questions" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_contact_hero_questions_parent_id_idx"
      ON "pages_blocks_contact_hero_questions" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_contact_hero_questions_options_order_idx"
      ON "pages_blocks_contact_hero_questions_options" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_contact_hero_questions_options_parent_id_idx"
      ON "pages_blocks_contact_hero_questions_options" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_hero_questions_order_idx"
      ON "_pages_v_blocks_contact_hero_questions" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_hero_questions_parent_id_idx"
      ON "_pages_v_blocks_contact_hero_questions" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_hero_questions_options_order_idx"
      ON "_pages_v_blocks_contact_hero_questions_options" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_hero_questions_options_parent_id_idx"
      ON "_pages_v_blocks_contact_hero_questions_options" USING btree ("_parent_id");

    INSERT INTO "pages_blocks_contact_hero_questions" ("_order", "_parent_id", "id", "label", "name", "field", "width", "required")
    SELECT q.ord, h.id, md5(random()::text || clock_timestamp()::text || h.id || q.ord::text), q.label, q.name, q.field::"enum_pages_blocks_contact_hero_questions_field", q.width::"enum_pages_blocks_contact_hero_questions_width", q.required
    FROM "pages_blocks_contact_hero" h
    CROSS JOIN (VALUES
      (1, 'Full name', 'name', 'text', 'half', true),
      (2, 'Work email', 'email', 'text', 'half', true),
      (3, 'Company', 'company', 'text', 'half', false),
      (4, 'Plant / site', 'plant', 'text', 'half', false),
      (5, 'Industry', 'industry', 'dropdown', 'full', true),
      (6, 'When can you talk', 'timing', 'dropdown', 'full', true),
      (7, 'What should we look at', 'message', 'textarea', 'full', true)
    ) AS q(ord, label, name, field, width, required)
    WHERE NOT EXISTS (
      SELECT 1 FROM "pages_blocks_contact_hero_questions" existing WHERE existing."_parent_id" = h.id
    );

    INSERT INTO "pages_blocks_contact_hero_questions_options" ("_order", "_parent_id", "id", "label", "value")
    SELECT o.ord, q.id, md5(random()::text || clock_timestamp()::text || q.id || o.ord::text), o.label, o.value
    FROM "pages_blocks_contact_hero_questions" q
    JOIN (VALUES
      (1, 'Automotive', 'automotive'),
      (2, 'Steel', 'steel'),
      (3, 'Marine', 'marine'),
      (4, 'Power', 'power'),
      (5, 'Cement', 'cement'),
      (6, 'Rail', 'rail')
    ) AS o(ord, label, value) ON q.name = 'industry'
    WHERE NOT EXISTS (
      SELECT 1 FROM "pages_blocks_contact_hero_questions_options" existing WHERE existing."_parent_id" = q.id
    );

    INSERT INTO "pages_blocks_contact_hero_questions_options" ("_order", "_parent_id", "id", "label", "value")
    SELECT o.ord, q.id, md5(random()::text || clock_timestamp()::text || q.id || o.ord::text), o.label, o.value
    FROM "pages_blocks_contact_hero_questions" q
    JOIN (VALUES
      (1, 'This week', 'this-week'),
      (2, 'Next 2 weeks', 'next-two-weeks'),
      (3, 'Flexible', 'flexible')
    ) AS o(ord, label, value) ON q.name = 'timing'
    WHERE NOT EXISTS (
      SELECT 1 FROM "pages_blocks_contact_hero_questions_options" existing WHERE existing."_parent_id" = q.id
    );
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "pages_blocks_contact_hero_questions_options" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_contact_hero_questions_options" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_contact_hero_questions" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_contact_hero_questions" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_contact_hero_questions_field";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_contact_hero_questions_width";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_contact_hero_questions_field";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_contact_hero_questions_width";
  `);
}
