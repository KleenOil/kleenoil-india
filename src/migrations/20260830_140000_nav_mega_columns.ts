import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_navigation_main_menu_mega_columns_layout" AS ENUM(
        'product-tiles',
        'text-list',
        'image-list',
        'profile'
      );
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_navigation_main_menu_mega_columns_items_type" AS ENUM(
        'page',
        'custom'
      );
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE TABLE IF NOT EXISTS "navigation_main_menu_mega_columns" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "heading" varchar,
      "layout" "enum_navigation_main_menu_mega_columns_layout" DEFAULT 'text-list',
      "profile_image_id" integer,
      "profile_title" varchar,
      "profile_copy" varchar,
      "cta_label" varchar,
      "cta_url" varchar
    );

    CREATE TABLE IF NOT EXISTS "navigation_main_menu_mega_columns_products" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "product_id" integer
    );

    CREATE TABLE IF NOT EXISTS "navigation_main_menu_mega_columns_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar,
      "description" varchar,
      "image_id" integer,
      "type" "enum_navigation_main_menu_mega_columns_items_type" DEFAULT 'custom',
      "page_id" integer,
      "url" varchar
    );

    DO $$ BEGIN
      ALTER TABLE "navigation_main_menu_mega_columns"
        ADD CONSTRAINT "nav_mega_columns_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_main_menu"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "navigation_main_menu_mega_columns"
        ADD CONSTRAINT "nav_mega_columns_profile_image_fk"
        FOREIGN KEY ("profile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "navigation_main_menu_mega_columns_products"
        ADD CONSTRAINT "nav_mega_col_products_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_main_menu_mega_columns"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "navigation_main_menu_mega_columns_products"
        ADD CONSTRAINT "nav_mega_col_products_product_fk"
        FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "navigation_main_menu_mega_columns_items"
        ADD CONSTRAINT "nav_mega_col_items_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_main_menu_mega_columns"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "navigation_main_menu_mega_columns_items"
        ADD CONSTRAINT "nav_mega_col_items_image_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "navigation_main_menu_mega_columns_items"
        ADD CONSTRAINT "nav_mega_col_items_page_fk"
        FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE INDEX IF NOT EXISTS "nav_mega_columns_order_idx"
      ON "navigation_main_menu_mega_columns" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "nav_mega_columns_parent_idx"
      ON "navigation_main_menu_mega_columns" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "nav_mega_columns_profile_image_idx"
      ON "navigation_main_menu_mega_columns" USING btree ("profile_image_id");
    CREATE INDEX IF NOT EXISTS "nav_mega_col_products_order_idx"
      ON "navigation_main_menu_mega_columns_products" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "nav_mega_col_products_parent_idx"
      ON "navigation_main_menu_mega_columns_products" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "nav_mega_col_items_order_idx"
      ON "navigation_main_menu_mega_columns_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "nav_mega_col_items_parent_idx"
      ON "navigation_main_menu_mega_columns_items" USING btree ("_parent_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "navigation_main_menu_mega_columns_items" CASCADE;
    DROP TABLE IF EXISTS "navigation_main_menu_mega_columns_products" CASCADE;
    DROP TABLE IF EXISTS "navigation_main_menu_mega_columns" CASCADE;
  `);
}
