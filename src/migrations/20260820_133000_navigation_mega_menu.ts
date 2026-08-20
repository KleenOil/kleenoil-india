import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "navigation_main_menu" ADD COLUMN IF NOT EXISTS "enable_mega_menu" boolean DEFAULT false;
    ALTER TABLE "navigation_main_menu" ADD COLUMN IF NOT EXISTS "products_per_row" numeric;

    CREATE TABLE IF NOT EXISTS "navigation_main_menu_mega_products" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "product_id" integer
    );

    DO $$ BEGIN
      ALTER TABLE "navigation_main_menu_mega_products"
        ADD CONSTRAINT "nav_main_mega_products_product_fk"
        FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "navigation_main_menu_mega_products"
        ADD CONSTRAINT "nav_main_mega_products_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_main_menu"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE INDEX IF NOT EXISTS "nav_main_mega_products_order_idx"
      ON "navigation_main_menu_mega_products" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "nav_main_mega_products_parent_idx"
      ON "navigation_main_menu_mega_products" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "nav_main_mega_products_product_idx"
      ON "navigation_main_menu_mega_products" USING btree ("product_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "navigation_main_menu_mega_products" CASCADE;
    ALTER TABLE "navigation_main_menu" DROP COLUMN IF EXISTS "enable_mega_menu";
    ALTER TABLE "navigation_main_menu" DROP COLUMN IF EXISTS "products_per_row";
  `);
}
