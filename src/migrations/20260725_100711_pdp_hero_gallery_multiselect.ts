import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "product_templates_blocks_pdp_hero_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_pdp_hero_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_pdp_hero_gallery" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "product_templates_blocks_pdp_hero_gallery" CASCADE;
  DROP TABLE "products_blocks_pdp_hero_gallery" CASCADE;
  DROP TABLE "_products_v_blocks_pdp_hero_gallery" CASCADE;
  ALTER TABLE "product_templates_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "products_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "_products_v_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "product_templates_rels" ADD CONSTRAINT "product_templates_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "product_templates_rels_media_id_idx" ON "product_templates_rels" USING btree ("media_id");
  CREATE INDEX "products_rels_media_id_idx" ON "products_rels" USING btree ("media_id");
  CREATE INDEX "_products_v_rels_media_id_idx" ON "_products_v_rels" USING btree ("media_id");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "product_templates_blocks_pdp_hero_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"alt" varchar
  );
  
  CREATE TABLE "products_blocks_pdp_hero_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar
  );
  
  CREATE TABLE "_products_v_blocks_pdp_hero_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "product_templates_rels" DROP CONSTRAINT "product_templates_rels_media_fk";
  
  ALTER TABLE "products_rels" DROP CONSTRAINT "products_rels_media_fk";
  
  ALTER TABLE "_products_v_rels" DROP CONSTRAINT "_products_v_rels_media_fk";
  
  DROP INDEX "product_templates_rels_media_id_idx";
  DROP INDEX "products_rels_media_id_idx";
  DROP INDEX "_products_v_rels_media_id_idx";
  ALTER TABLE "product_templates_blocks_pdp_hero_gallery" ADD CONSTRAINT "product_templates_blocks_pdp_hero_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "product_templates_blocks_pdp_hero_gallery" ADD CONSTRAINT "product_templates_blocks_pdp_hero_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_templates_blocks_pdp_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_pdp_hero_gallery" ADD CONSTRAINT "products_blocks_pdp_hero_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_pdp_hero_gallery" ADD CONSTRAINT "products_blocks_pdp_hero_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_pdp_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_pdp_hero_gallery" ADD CONSTRAINT "_products_v_blocks_pdp_hero_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_pdp_hero_gallery" ADD CONSTRAINT "_products_v_blocks_pdp_hero_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_pdp_hero"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "product_templates_blocks_pdp_hero_gallery_order_idx" ON "product_templates_blocks_pdp_hero_gallery" USING btree ("_order");
  CREATE INDEX "product_templates_blocks_pdp_hero_gallery_parent_id_idx" ON "product_templates_blocks_pdp_hero_gallery" USING btree ("_parent_id");
  CREATE INDEX "product_templates_blocks_pdp_hero_gallery_image_idx" ON "product_templates_blocks_pdp_hero_gallery" USING btree ("image_id");
  CREATE INDEX "products_blocks_pdp_hero_gallery_order_idx" ON "products_blocks_pdp_hero_gallery" USING btree ("_order");
  CREATE INDEX "products_blocks_pdp_hero_gallery_parent_id_idx" ON "products_blocks_pdp_hero_gallery" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_pdp_hero_gallery_image_idx" ON "products_blocks_pdp_hero_gallery" USING btree ("image_id");
  CREATE INDEX "_products_v_blocks_pdp_hero_gallery_order_idx" ON "_products_v_blocks_pdp_hero_gallery" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_pdp_hero_gallery_parent_id_idx" ON "_products_v_blocks_pdp_hero_gallery" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_pdp_hero_gallery_image_idx" ON "_products_v_blocks_pdp_hero_gallery" USING btree ("image_id");
  ALTER TABLE "product_templates_rels" DROP COLUMN "media_id";
  ALTER TABLE "products_rels" DROP COLUMN "media_id";
  ALTER TABLE "_products_v_rels" DROP COLUMN "media_id";`);
}
