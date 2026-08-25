import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TYPE "public"."enum_pages_blocks_hero_variant" ADD VALUE 'slider';
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TYPE "public"."enum__pages_v_blocks_hero_variant" ADD VALUE 'slider';
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_hero_slides_ctas_link_type" AS ENUM('page', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_hero_slides_ctas_link_appearance" AS ENUM('primary', 'secondary', 'ghost');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_hero_slides_ctas_link_type" AS ENUM('page', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_hero_slides_ctas_link_appearance" AS ENUM('primary', 'secondary', 'ghost');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE TABLE IF NOT EXISTS "pages_blocks_hero_slides" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "index_label" varchar NOT NULL,
      "stat" varchar NOT NULL,
      "eyebrow" varchar,
      "headline" varchar,
      "subheadline" varchar,
      "image_id" integer
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_hero_slides_ctas" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" "enum_pages_blocks_hero_slides_ctas_link_type" DEFAULT 'custom',
      "link_label" varchar,
      "link_page_id" integer,
      "link_url" varchar,
      "link_open_in_new_tab" boolean DEFAULT false,
      "link_appearance" "enum_pages_blocks_hero_slides_ctas_link_appearance" DEFAULT 'primary'
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_hero_slides" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "index_label" varchar,
      "stat" varchar,
      "eyebrow" varchar,
      "headline" varchar,
      "subheadline" varchar,
      "image_id" integer,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_hero_slides_ctas" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "link_type" "enum__pages_v_blocks_hero_slides_ctas_link_type" DEFAULT 'custom',
      "link_label" varchar,
      "link_page_id" integer,
      "link_url" varchar,
      "link_open_in_new_tab" boolean DEFAULT false,
      "link_appearance" "enum__pages_v_blocks_hero_slides_ctas_link_appearance" DEFAULT 'primary',
      "_uuid" varchar
    );

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_hero_slides" ADD CONSTRAINT "pages_blocks_hero_slides_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_hero_slides" ADD CONSTRAINT "pages_blocks_hero_slides_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_hero_slides_ctas" ADD CONSTRAINT "pages_blocks_hero_slides_ctas_link_page_id_fk"
        FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_hero_slides_ctas" ADD CONSTRAINT "pages_blocks_hero_slides_ctas_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_slides"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_hero_slides" ADD CONSTRAINT "_pages_v_blocks_hero_slides_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_hero_slides" ADD CONSTRAINT "_pages_v_blocks_hero_slides_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_hero_slides_ctas" ADD CONSTRAINT "_pages_v_blocks_hero_slides_ctas_link_page_id_fk"
        FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_hero_slides_ctas" ADD CONSTRAINT "_pages_v_blocks_hero_slides_ctas_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_slides"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE INDEX IF NOT EXISTS "pages_blocks_hero_slides_order_idx" ON "pages_blocks_hero_slides" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_hero_slides_parent_id_idx" ON "pages_blocks_hero_slides" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_hero_slides_image_idx" ON "pages_blocks_hero_slides" USING btree ("image_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_hero_slides_ctas_order_idx" ON "pages_blocks_hero_slides_ctas" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_hero_slides_ctas_parent_id_idx" ON "pages_blocks_hero_slides_ctas" USING btree ("_parent_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "pages_blocks_hero_slides_ctas" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_hero_slides_ctas" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_hero_slides" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_hero_slides" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_hero_slides_ctas_link_type";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_hero_slides_ctas_link_appearance";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_hero_slides_ctas_link_type";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_hero_slides_ctas_link_appearance";
  `);
}
