import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "product_templates_blocks_pdp_contamination" ADD COLUMN IF NOT EXISTS "left_heading" varchar;
   ALTER TABLE "product_templates_blocks_pdp_contamination" ADD COLUMN IF NOT EXISTS "left_description" varchar;
   ALTER TABLE "product_templates_blocks_pdp_contamination" ADD COLUMN IF NOT EXISTS "right_heading" varchar;
   ALTER TABLE "product_templates_blocks_pdp_contamination" ADD COLUMN IF NOT EXISTS "right_description" varchar;

   ALTER TABLE "products_blocks_pdp_contamination" ADD COLUMN IF NOT EXISTS "left_heading" varchar;
   ALTER TABLE "products_blocks_pdp_contamination" ADD COLUMN IF NOT EXISTS "left_description" varchar;
   ALTER TABLE "products_blocks_pdp_contamination" ADD COLUMN IF NOT EXISTS "right_heading" varchar;
   ALTER TABLE "products_blocks_pdp_contamination" ADD COLUMN IF NOT EXISTS "right_description" varchar;

   ALTER TABLE "_products_v_blocks_pdp_contamination" ADD COLUMN IF NOT EXISTS "left_heading" varchar;
   ALTER TABLE "_products_v_blocks_pdp_contamination" ADD COLUMN IF NOT EXISTS "left_description" varchar;
   ALTER TABLE "_products_v_blocks_pdp_contamination" ADD COLUMN IF NOT EXISTS "right_heading" varchar;
   ALTER TABLE "_products_v_blocks_pdp_contamination" ADD COLUMN IF NOT EXISTS "right_description" varchar;

   CREATE TABLE IF NOT EXISTS "product_templates_blocks_pdp_contamination_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"text" varchar,
  	"on_right" boolean DEFAULT false
   );

   CREATE TABLE IF NOT EXISTS "products_blocks_pdp_contamination_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"text" varchar,
  	"on_right" boolean DEFAULT false
   );

   CREATE TABLE IF NOT EXISTS "_products_v_blocks_pdp_contamination_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"text" varchar,
  	"on_right" boolean DEFAULT false,
  	"_uuid" varchar
   );

   DO $$ BEGIN
     ALTER TABLE "product_templates_blocks_pdp_contamination_items" ADD CONSTRAINT "pt_pdp_contam_items_icon_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
   EXCEPTION WHEN duplicate_object THEN NULL; END $$;
   DO $$ BEGIN
     ALTER TABLE "product_templates_blocks_pdp_contamination_items" ADD CONSTRAINT "pt_pdp_contam_items_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_templates_blocks_pdp_contamination"("id") ON DELETE cascade ON UPDATE no action;
   EXCEPTION WHEN duplicate_object THEN NULL; END $$;
   DO $$ BEGIN
     ALTER TABLE "products_blocks_pdp_contamination_items" ADD CONSTRAINT "p_pdp_contam_items_icon_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
   EXCEPTION WHEN duplicate_object THEN NULL; END $$;
   DO $$ BEGIN
     ALTER TABLE "products_blocks_pdp_contamination_items" ADD CONSTRAINT "p_pdp_contam_items_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_pdp_contamination"("id") ON DELETE cascade ON UPDATE no action;
   EXCEPTION WHEN duplicate_object THEN NULL; END $$;
   DO $$ BEGIN
     ALTER TABLE "_products_v_blocks_pdp_contamination_items" ADD CONSTRAINT "pv_pdp_contam_items_icon_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
   EXCEPTION WHEN duplicate_object THEN NULL; END $$;
   DO $$ BEGIN
     ALTER TABLE "_products_v_blocks_pdp_contamination_items" ADD CONSTRAINT "pv_pdp_contam_items_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_pdp_contamination"("id") ON DELETE cascade ON UPDATE no action;
   EXCEPTION WHEN duplicate_object THEN NULL; END $$;

   CREATE INDEX IF NOT EXISTS "pt_pdp_contam_items_order_idx" ON "product_templates_blocks_pdp_contamination_items" USING btree ("_order");
   CREATE INDEX IF NOT EXISTS "pt_pdp_contam_items_parent_idx" ON "product_templates_blocks_pdp_contamination_items" USING btree ("_parent_id");
   CREATE INDEX IF NOT EXISTS "pt_pdp_contam_items_icon_idx" ON "product_templates_blocks_pdp_contamination_items" USING btree ("icon_id");
   CREATE INDEX IF NOT EXISTS "p_pdp_contam_items_order_idx" ON "products_blocks_pdp_contamination_items" USING btree ("_order");
   CREATE INDEX IF NOT EXISTS "p_pdp_contam_items_parent_idx" ON "products_blocks_pdp_contamination_items" USING btree ("_parent_id");
   CREATE INDEX IF NOT EXISTS "p_pdp_contam_items_icon_idx" ON "products_blocks_pdp_contamination_items" USING btree ("icon_id");
   CREATE INDEX IF NOT EXISTS "pv_pdp_contam_items_order_idx" ON "_products_v_blocks_pdp_contamination_items" USING btree ("_order");
   CREATE INDEX IF NOT EXISTS "pv_pdp_contam_items_parent_idx" ON "_products_v_blocks_pdp_contamination_items" USING btree ("_parent_id");
   CREATE INDEX IF NOT EXISTS "pv_pdp_contam_items_icon_idx" ON "_products_v_blocks_pdp_contamination_items" USING btree ("icon_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "product_templates_blocks_pdp_contamination_items" CASCADE;
   DROP TABLE IF EXISTS "products_blocks_pdp_contamination_items" CASCADE;
   DROP TABLE IF EXISTS "_products_v_blocks_pdp_contamination_items" CASCADE;

   ALTER TABLE "product_templates_blocks_pdp_contamination" DROP COLUMN IF EXISTS "left_heading";
   ALTER TABLE "product_templates_blocks_pdp_contamination" DROP COLUMN IF EXISTS "left_description";
   ALTER TABLE "product_templates_blocks_pdp_contamination" DROP COLUMN IF EXISTS "right_heading";
   ALTER TABLE "product_templates_blocks_pdp_contamination" DROP COLUMN IF EXISTS "right_description";
   ALTER TABLE "products_blocks_pdp_contamination" DROP COLUMN IF EXISTS "left_heading";
   ALTER TABLE "products_blocks_pdp_contamination" DROP COLUMN IF EXISTS "left_description";
   ALTER TABLE "products_blocks_pdp_contamination" DROP COLUMN IF EXISTS "right_heading";
   ALTER TABLE "products_blocks_pdp_contamination" DROP COLUMN IF EXISTS "right_description";
   ALTER TABLE "_products_v_blocks_pdp_contamination" DROP COLUMN IF EXISTS "left_heading";
   ALTER TABLE "_products_v_blocks_pdp_contamination" DROP COLUMN IF EXISTS "left_description";
   ALTER TABLE "_products_v_blocks_pdp_contamination" DROP COLUMN IF EXISTS "right_heading";
   ALTER TABLE "_products_v_blocks_pdp_contamination" DROP COLUMN IF EXISTS "right_description";
  `);
}
