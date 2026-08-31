import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "navigation_main_menu" ADD COLUMN IF NOT EXISTS "mega_heading" varchar;
    ALTER TABLE "navigation_main_menu" ADD COLUMN IF NOT EXISTS "mega_description" varchar;

    CREATE TABLE IF NOT EXISTS "navigation_main_menu_mega_pointers" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "value" varchar,
      "label" varchar
    );

    DO $$ BEGIN
      CREATE TYPE "public"."enum_navigation_main_menu_mega_links_type" AS ENUM ('page', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_navigation_main_menu_mega_links_children_type" AS ENUM ('page', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_navigation_main_menu_mega_links_children_items_type" AS ENUM ('page', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE TABLE IF NOT EXISTS "navigation_main_menu_mega_links" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar,
      "type" "enum_navigation_main_menu_mega_links_type" DEFAULT 'custom',
      "page_id" integer,
      "url" varchar
    );

    CREATE TABLE IF NOT EXISTS "navigation_main_menu_mega_links_children" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar,
      "type" "enum_navigation_main_menu_mega_links_children_type" DEFAULT 'custom',
      "page_id" integer,
      "url" varchar
    );

    CREATE TABLE IF NOT EXISTS "navigation_main_menu_mega_links_children_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar,
      "type" "enum_navigation_main_menu_mega_links_children_items_type" DEFAULT 'custom',
      "page_id" integer,
      "url" varchar
    );

    DO $$ BEGIN
      ALTER TABLE "navigation_main_menu_mega_pointers"
        ADD CONSTRAINT "nav_mega_pointers_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_main_menu"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "navigation_main_menu_mega_links"
        ADD CONSTRAINT "nav_mega_links_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_main_menu"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "navigation_main_menu_mega_links"
        ADD CONSTRAINT "nav_mega_links_page_fk"
        FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "navigation_main_menu_mega_links_children"
        ADD CONSTRAINT "nav_mega_links_l2_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_main_menu_mega_links"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "navigation_main_menu_mega_links_children"
        ADD CONSTRAINT "nav_mega_links_l2_page_fk"
        FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "navigation_main_menu_mega_links_children_items"
        ADD CONSTRAINT "nav_mega_links_l3_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_main_menu_mega_links_children"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "navigation_main_menu_mega_links_children_items"
        ADD CONSTRAINT "nav_mega_links_l3_page_fk"
        FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE INDEX IF NOT EXISTS "nav_mega_pointers_order_idx"
      ON "navigation_main_menu_mega_pointers" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "nav_mega_pointers_parent_idx"
      ON "navigation_main_menu_mega_pointers" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "nav_mega_links_order_idx"
      ON "navigation_main_menu_mega_links" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "nav_mega_links_parent_idx"
      ON "navigation_main_menu_mega_links" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "nav_mega_links_page_idx"
      ON "navigation_main_menu_mega_links" USING btree ("page_id");
    CREATE INDEX IF NOT EXISTS "nav_mega_links_l2_order_idx"
      ON "navigation_main_menu_mega_links_children" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "nav_mega_links_l2_parent_idx"
      ON "navigation_main_menu_mega_links_children" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "nav_mega_links_l2_page_idx"
      ON "navigation_main_menu_mega_links_children" USING btree ("page_id");
    CREATE INDEX IF NOT EXISTS "nav_mega_links_l3_order_idx"
      ON "navigation_main_menu_mega_links_children_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "nav_mega_links_l3_parent_idx"
      ON "navigation_main_menu_mega_links_children_items" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "nav_mega_links_l3_page_idx"
      ON "navigation_main_menu_mega_links_children_items" USING btree ("page_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "navigation_main_menu_mega_links_children_items" CASCADE;
    DROP TABLE IF EXISTS "navigation_main_menu_mega_links_children_children" CASCADE;
    DROP TABLE IF EXISTS "navigation_main_menu_mega_links_children" CASCADE;
    DROP TABLE IF EXISTS "navigation_main_menu_mega_links" CASCADE;
    DROP TABLE IF EXISTS "navigation_main_menu_mega_pointers" CASCADE;
    ALTER TABLE "navigation_main_menu" DROP COLUMN IF EXISTS "mega_heading";
    ALTER TABLE "navigation_main_menu" DROP COLUMN IF EXISTS "mega_description";
  `);
}
