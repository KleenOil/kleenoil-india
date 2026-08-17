import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_variant" AS ENUM('panel', 'immersive');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_variant" AS ENUM('panel', 'immersive');
  CREATE TYPE "public"."enum_pages_blocks_about_origin_cta_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_about_origin_cta_appearance" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__pages_v_blocks_about_origin_cta_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_about_origin_cta_appearance" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_whats_new_cards_link_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_whats_new_cards_link_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_distribution_network_regional_offices_kind" AS ENUM('hq', 'hub', 'partner');
  CREATE TYPE "public"."enum__pages_v_blocks_distribution_network_regional_offices_kind" AS ENUM('hq', 'hub', 'partner');

  ALTER TABLE "pages_blocks_hero" ADD COLUMN "variant" "enum_pages_blocks_hero_variant" DEFAULT 'panel';
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "variant" "enum__pages_v_blocks_hero_variant" DEFAULT 'panel';

  CREATE TABLE "pages_blocks_manifesto" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"attribution" varchar,
  	"block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_manifesto" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"attribution" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );

  CREATE TABLE "pages_blocks_about_origin" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"body_secondary" varchar,
  	"cta_type" "enum_pages_blocks_about_origin_cta_type" DEFAULT 'custom',
  	"cta_label" varchar,
  	"cta_page_id" integer,
  	"cta_url" varchar,
  	"cta_open_in_new_tab" boolean DEFAULT false,
  	"cta_appearance" "enum_pages_blocks_about_origin_cta_appearance" DEFAULT 'primary',
  	"block_name" varchar
  );

  CREATE TABLE "pages_blocks_about_origin_milestones" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" varchar,
  	"title" varchar
  );

  CREATE TABLE "_pages_v_blocks_about_origin" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"body_secondary" varchar,
  	"cta_type" "enum__pages_v_blocks_about_origin_cta_type" DEFAULT 'custom',
  	"cta_label" varchar,
  	"cta_page_id" integer,
  	"cta_url" varchar,
  	"cta_open_in_new_tab" boolean DEFAULT false,
  	"cta_appearance" "enum__pages_v_blocks_about_origin_cta_appearance" DEFAULT 'primary',
  	"_uuid" varchar,
  	"block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_about_origin_milestones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"year" varchar,
  	"title" varchar,
  	"_uuid" varchar
  );

  CREATE TABLE "pages_blocks_whats_new" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"block_name" varchar
  );

  CREATE TABLE "pages_blocks_whats_new_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"description" varchar,
  	"link_type" "enum_pages_blocks_whats_new_cards_link_type" DEFAULT 'custom',
  	"link_label" varchar,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_open_in_new_tab" boolean DEFAULT false
  );

  CREATE TABLE "_pages_v_blocks_whats_new" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_whats_new_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"description" varchar,
  	"link_type" "enum__pages_v_blocks_whats_new_cards_link_type" DEFAULT 'custom',
  	"link_label" varchar,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_open_in_new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );

  CREATE TABLE "pages_blocks_distribution_network" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"map_image_id" integer,
  	"hq_label" varchar,
  	"hq_title" varchar,
  	"hq_address" varchar,
  	"hq_phone" varchar,
  	"hq_mobile" varchar,
  	"hq_email" varchar,
  	"hq_image_id" integer,
  	"block_name" varchar
  );

  CREATE TABLE "pages_blocks_distribution_network_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );

  CREATE TABLE "pages_blocks_distribution_network_regional_offices" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"city" varchar,
  	"region" varchar,
  	"kind" "enum_pages_blocks_distribution_network_regional_offices_kind" DEFAULT 'hub',
  	"map_x" numeric,
  	"map_y" numeric,
  	"maps_url" varchar
  );

  CREATE TABLE "_pages_v_blocks_distribution_network" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"map_image_id" integer,
  	"hq_label" varchar,
  	"hq_title" varchar,
  	"hq_address" varchar,
  	"hq_phone" varchar,
  	"hq_mobile" varchar,
  	"hq_email" varchar,
  	"hq_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_distribution_network_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );

  CREATE TABLE "_pages_v_blocks_distribution_network_regional_offices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"city" varchar,
  	"region" varchar,
  	"kind" "enum__pages_v_blocks_distribution_network_regional_offices_kind" DEFAULT 'hub',
  	"map_x" numeric,
  	"map_y" numeric,
  	"maps_url" varchar,
  	"_uuid" varchar
  );

  CREATE TABLE "pages_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"block_name" varchar
  );

  CREATE TABLE "pages_blocks_faq_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"default_open" boolean DEFAULT false
  );

  CREATE TABLE "_pages_v_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_faq_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"default_open" boolean DEFAULT false,
  	"_uuid" varchar
  );

  ALTER TABLE "pages_blocks_manifesto" ADD CONSTRAINT "pages_blocks_manifesto_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_manifesto" ADD CONSTRAINT "_pages_v_blocks_manifesto_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_origin" ADD CONSTRAINT "pages_blocks_about_origin_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_origin" ADD CONSTRAINT "pages_blocks_about_origin_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_origin_milestones" ADD CONSTRAINT "pages_blocks_about_origin_milestones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_origin"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_origin" ADD CONSTRAINT "_pages_v_blocks_about_origin_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_origin" ADD CONSTRAINT "_pages_v_blocks_about_origin_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_origin_milestones" ADD CONSTRAINT "_pages_v_blocks_about_origin_milestones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about_origin"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_whats_new" ADD CONSTRAINT "pages_blocks_whats_new_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_whats_new_cards" ADD CONSTRAINT "pages_blocks_whats_new_cards_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_whats_new_cards" ADD CONSTRAINT "pages_blocks_whats_new_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_whats_new"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_whats_new" ADD CONSTRAINT "_pages_v_blocks_whats_new_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_whats_new_cards" ADD CONSTRAINT "_pages_v_blocks_whats_new_cards_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_whats_new_cards" ADD CONSTRAINT "_pages_v_blocks_whats_new_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_whats_new"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_distribution_network" ADD CONSTRAINT "pages_blocks_distribution_network_map_image_id_media_id_fk" FOREIGN KEY ("map_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_distribution_network" ADD CONSTRAINT "pages_blocks_distribution_network_hq_image_id_media_id_fk" FOREIGN KEY ("hq_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_distribution_network" ADD CONSTRAINT "pages_blocks_distribution_network_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_distribution_network_stats" ADD CONSTRAINT "pages_blocks_distribution_network_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_distribution_network"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_distribution_network_regional_offices" ADD CONSTRAINT "pages_blocks_dn_regional_offices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_distribution_network"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_distribution_network" ADD CONSTRAINT "_pages_v_blocks_distribution_network_map_image_id_media_id_fk" FOREIGN KEY ("map_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_distribution_network" ADD CONSTRAINT "_pages_v_blocks_distribution_network_hq_image_id_media_id_fk" FOREIGN KEY ("hq_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_distribution_network" ADD CONSTRAINT "_pages_v_blocks_distribution_network_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_distribution_network_stats" ADD CONSTRAINT "_pages_v_blocks_distribution_network_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_distribution_network"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_distribution_network_regional_offices" ADD CONSTRAINT "_pages_v_blocks_dn_regional_offices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_distribution_network"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_accordion" ADD CONSTRAINT "pages_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_accordion_items" ADD CONSTRAINT "pages_blocks_faq_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_accordion" ADD CONSTRAINT "_pages_v_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_accordion_items" ADD CONSTRAINT "_pages_v_blocks_faq_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;

  CREATE INDEX "pages_blocks_manifesto_order_idx" ON "pages_blocks_manifesto" USING btree ("_order");
  CREATE INDEX "pages_blocks_manifesto_parent_id_idx" ON "pages_blocks_manifesto" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_manifesto_path_idx" ON "pages_blocks_manifesto" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_manifesto_order_idx" ON "_pages_v_blocks_manifesto" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_manifesto_parent_id_idx" ON "_pages_v_blocks_manifesto" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_manifesto_path_idx" ON "_pages_v_blocks_manifesto" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_origin_order_idx" ON "pages_blocks_about_origin" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_origin_parent_id_idx" ON "pages_blocks_about_origin" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_origin_path_idx" ON "pages_blocks_about_origin" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_origin_cta_cta_page_idx" ON "pages_blocks_about_origin" USING btree ("cta_page_id");
  CREATE INDEX "pages_blocks_about_origin_milestones_order_idx" ON "pages_blocks_about_origin_milestones" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_origin_milestones_parent_id_idx" ON "pages_blocks_about_origin_milestones" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_origin_order_idx" ON "_pages_v_blocks_about_origin" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_origin_parent_id_idx" ON "_pages_v_blocks_about_origin" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_origin_path_idx" ON "_pages_v_blocks_about_origin" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_about_origin_cta_cta_page_idx" ON "_pages_v_blocks_about_origin" USING btree ("cta_page_id");
  CREATE INDEX "_pages_v_blocks_about_origin_milestones_order_idx" ON "_pages_v_blocks_about_origin_milestones" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_origin_milestones_parent_id_idx" ON "_pages_v_blocks_about_origin_milestones" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_whats_new_order_idx" ON "pages_blocks_whats_new" USING btree ("_order");
  CREATE INDEX "pages_blocks_whats_new_parent_id_idx" ON "pages_blocks_whats_new" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_whats_new_path_idx" ON "pages_blocks_whats_new" USING btree ("_path");
  CREATE INDEX "pages_blocks_whats_new_cards_order_idx" ON "pages_blocks_whats_new_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_whats_new_cards_parent_id_idx" ON "pages_blocks_whats_new_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_whats_new_cards_link_link_page_idx" ON "pages_blocks_whats_new_cards" USING btree ("link_page_id");
  CREATE INDEX "_pages_v_blocks_whats_new_order_idx" ON "_pages_v_blocks_whats_new" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_whats_new_parent_id_idx" ON "_pages_v_blocks_whats_new" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_whats_new_path_idx" ON "_pages_v_blocks_whats_new" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_whats_new_cards_order_idx" ON "_pages_v_blocks_whats_new_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_whats_new_cards_parent_id_idx" ON "_pages_v_blocks_whats_new_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_whats_new_cards_link_link_page_idx" ON "_pages_v_blocks_whats_new_cards" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_distribution_network_order_idx" ON "pages_blocks_distribution_network" USING btree ("_order");
  CREATE INDEX "pages_blocks_distribution_network_parent_id_idx" ON "pages_blocks_distribution_network" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_distribution_network_path_idx" ON "pages_blocks_distribution_network" USING btree ("_path");
  CREATE INDEX "pages_blocks_distribution_network_map_image_idx" ON "pages_blocks_distribution_network" USING btree ("map_image_id");
  CREATE INDEX "pages_blocks_distribution_network_hq_image_idx" ON "pages_blocks_distribution_network" USING btree ("hq_image_id");
  CREATE INDEX "pages_blocks_distribution_network_stats_order_idx" ON "pages_blocks_distribution_network_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_distribution_network_stats_parent_id_idx" ON "pages_blocks_distribution_network_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_dn_regional_offices_order_idx" ON "pages_blocks_distribution_network_regional_offices" USING btree ("_order");
  CREATE INDEX "pages_blocks_dn_regional_offices_parent_id_idx" ON "pages_blocks_distribution_network_regional_offices" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_distribution_network_order_idx" ON "_pages_v_blocks_distribution_network" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_distribution_network_parent_id_idx" ON "_pages_v_blocks_distribution_network" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_distribution_network_path_idx" ON "_pages_v_blocks_distribution_network" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_distribution_network_map_image_idx" ON "_pages_v_blocks_distribution_network" USING btree ("map_image_id");
  CREATE INDEX "_pages_v_blocks_distribution_network_hq_image_idx" ON "_pages_v_blocks_distribution_network" USING btree ("hq_image_id");
  CREATE INDEX "_pages_v_blocks_distribution_network_stats_order_idx" ON "_pages_v_blocks_distribution_network_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_distribution_network_stats_parent_id_idx" ON "_pages_v_blocks_distribution_network_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_dn_regional_offices_order_idx" ON "_pages_v_blocks_distribution_network_regional_offices" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_dn_regional_offices_parent_id_idx" ON "_pages_v_blocks_distribution_network_regional_offices" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_accordion_order_idx" ON "pages_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_accordion_parent_id_idx" ON "pages_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_accordion_path_idx" ON "pages_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_accordion_items_order_idx" ON "pages_blocks_faq_accordion_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_accordion_items_parent_id_idx" ON "pages_blocks_faq_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_accordion_order_idx" ON "_pages_v_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_accordion_parent_id_idx" ON "_pages_v_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_accordion_path_idx" ON "_pages_v_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_accordion_items_order_idx" ON "_pages_v_blocks_faq_accordion_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_accordion_items_parent_id_idx" ON "_pages_v_blocks_faq_accordion_items" USING btree ("_parent_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero" DROP COLUMN "variant";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "variant";
  DROP TABLE "pages_blocks_about_origin_milestones" CASCADE;
  DROP TABLE "_pages_v_blocks_about_origin_milestones" CASCADE;
  DROP TABLE "pages_blocks_about_origin" CASCADE;
  DROP TABLE "_pages_v_blocks_about_origin" CASCADE;
  DROP TABLE "pages_blocks_whats_new_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_whats_new_cards" CASCADE;
  DROP TABLE "pages_blocks_whats_new" CASCADE;
  DROP TABLE "_pages_v_blocks_whats_new" CASCADE;
  DROP TABLE "pages_blocks_distribution_network_regional_offices" CASCADE;
  DROP TABLE "_pages_v_blocks_distribution_network_regional_offices" CASCADE;
  DROP TABLE "pages_blocks_distribution_network_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_distribution_network_stats" CASCADE;
  DROP TABLE "pages_blocks_distribution_network" CASCADE;
  DROP TABLE "_pages_v_blocks_distribution_network" CASCADE;
  DROP TABLE "pages_blocks_faq_accordion_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_accordion_items" CASCADE;
  DROP TABLE "pages_blocks_faq_accordion" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_accordion" CASCADE;
  DROP TABLE "pages_blocks_manifesto" CASCADE;
  DROP TABLE "_pages_v_blocks_manifesto" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_hero_variant";
  DROP TYPE "public"."enum__pages_v_blocks_hero_variant";
  DROP TYPE "public"."enum_pages_blocks_about_origin_cta_type";
  DROP TYPE "public"."enum_pages_blocks_about_origin_cta_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_about_origin_cta_type";
  DROP TYPE "public"."enum__pages_v_blocks_about_origin_cta_appearance";
  DROP TYPE "public"."enum_pages_blocks_whats_new_cards_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_whats_new_cards_link_type";
  DROP TYPE "public"."enum_pages_blocks_distribution_network_regional_offices_kind";
  DROP TYPE "public"."enum__pages_v_blocks_distribution_network_regional_offices_kind";
  `);
}
