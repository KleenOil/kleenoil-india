import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_featured_products_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"product_id" integer,
  	"href" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_featured_products_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"product_id" integer,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages_blocks_featured_products_cards" ADD CONSTRAINT "pages_blocks_featured_products_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_products_cards" ADD CONSTRAINT "pages_blocks_featured_products_cards_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_products_cards" ADD CONSTRAINT "pages_blocks_featured_products_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_featured_products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_products_cards" ADD CONSTRAINT "_pages_v_blocks_featured_products_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_products_cards" ADD CONSTRAINT "_pages_v_blocks_featured_products_cards_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_products_cards" ADD CONSTRAINT "_pages_v_blocks_featured_products_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_featured_products"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_featured_products_cards_order_idx" ON "pages_blocks_featured_products_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_featured_products_cards_parent_id_idx" ON "pages_blocks_featured_products_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_featured_products_cards_image_idx" ON "pages_blocks_featured_products_cards" USING btree ("image_id");
  CREATE INDEX "pages_blocks_featured_products_cards_product_idx" ON "pages_blocks_featured_products_cards" USING btree ("product_id");
  CREATE INDEX "_pages_v_blocks_featured_products_cards_order_idx" ON "_pages_v_blocks_featured_products_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_featured_products_cards_parent_id_idx" ON "_pages_v_blocks_featured_products_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_featured_products_cards_image_idx" ON "_pages_v_blocks_featured_products_cards" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_featured_products_cards_product_idx" ON "_pages_v_blocks_featured_products_cards" USING btree ("product_id");
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "description";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "description";`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_featured_products_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_featured_products_cards" CASCADE;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "description" varchar;`);
}
