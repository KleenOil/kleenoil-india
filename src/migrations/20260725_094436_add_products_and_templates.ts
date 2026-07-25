import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_product_templates_blocks_pdp_hero_ctas_link_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum_product_templates_blocks_pdp_hero_ctas_link_appearance" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_product_templates_blocks_pdp_cta_ctas_link_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum_product_templates_blocks_pdp_cta_ctas_link_appearance" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_products_blocks_pdp_hero_ctas_link_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum_products_blocks_pdp_hero_ctas_link_appearance" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_products_blocks_pdp_hero_data_source" AS ENUM('common', 'custom');
  CREATE TYPE "public"."enum_products_blocks_pdp_contamination_data_source" AS ENUM('common', 'custom');
  CREATE TYPE "public"."enum_products_blocks_pdp_how_it_works_data_source" AS ENUM('common', 'custom');
  CREATE TYPE "public"."enum_products_blocks_pdp_machines_data_source" AS ENUM('common', 'custom');
  CREATE TYPE "public"."enum_products_blocks_pdp_models_data_source" AS ENUM('common', 'custom');
  CREATE TYPE "public"."enum_products_blocks_pdp_results_data_source" AS ENUM('common', 'custom');
  CREATE TYPE "public"."enum_products_blocks_pdp_related_data_source" AS ENUM('common', 'custom');
  CREATE TYPE "public"."enum_products_blocks_pdp_cta_ctas_link_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum_products_blocks_pdp_cta_ctas_link_appearance" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_products_blocks_pdp_cta_data_source" AS ENUM('common', 'custom');
  CREATE TYPE "public"."enum_products_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_v_blocks_pdp_hero_ctas_link_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum__products_v_blocks_pdp_hero_ctas_link_appearance" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__products_v_blocks_pdp_hero_data_source" AS ENUM('common', 'custom');
  CREATE TYPE "public"."enum__products_v_blocks_pdp_contamination_data_source" AS ENUM('common', 'custom');
  CREATE TYPE "public"."enum__products_v_blocks_pdp_how_it_works_data_source" AS ENUM('common', 'custom');
  CREATE TYPE "public"."enum__products_v_blocks_pdp_machines_data_source" AS ENUM('common', 'custom');
  CREATE TYPE "public"."enum__products_v_blocks_pdp_models_data_source" AS ENUM('common', 'custom');
  CREATE TYPE "public"."enum__products_v_blocks_pdp_results_data_source" AS ENUM('common', 'custom');
  CREATE TYPE "public"."enum__products_v_blocks_pdp_related_data_source" AS ENUM('common', 'custom');
  CREATE TYPE "public"."enum__products_v_blocks_pdp_cta_ctas_link_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum__products_v_blocks_pdp_cta_ctas_link_appearance" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__products_v_blocks_pdp_cta_data_source" AS ENUM('common', 'custom');
  CREATE TYPE "public"."enum__products_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "product_templates_blocks_pdp_hero_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"alt" varchar
  );
  
  CREATE TABLE "product_templates_blocks_pdp_hero_quick_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "product_templates_blocks_pdp_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_product_templates_blocks_pdp_hero_ctas_link_type" DEFAULT 'custom' NOT NULL,
  	"link_label" varchar,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_open_in_new_tab" boolean DEFAULT false,
  	"link_appearance" "enum_product_templates_blocks_pdp_hero_ctas_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "product_templates_blocks_pdp_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"summary" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "product_templates_blocks_pdp_contamination_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"stat" varchar
  );
  
  CREATE TABLE "product_templates_blocks_pdp_contamination" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "product_templates_blocks_pdp_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "product_templates_blocks_pdp_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "product_templates_blocks_pdp_machines_machines" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "product_templates_blocks_pdp_machines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "product_templates_blocks_pdp_models_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "product_templates_blocks_pdp_models_models_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "product_templates_blocks_pdp_models_models" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "product_templates_blocks_pdp_models" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "product_templates_blocks_pdp_results_results_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "product_templates_blocks_pdp_results_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "product_templates_blocks_pdp_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "product_templates_blocks_pdp_related_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"href" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "product_templates_blocks_pdp_related" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "product_templates_blocks_pdp_cta_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_product_templates_blocks_pdp_cta_ctas_link_type" DEFAULT 'custom' NOT NULL,
  	"link_label" varchar,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_open_in_new_tab" boolean DEFAULT false,
  	"link_appearance" "enum_product_templates_blocks_pdp_cta_ctas_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "product_templates_blocks_pdp_cta_trust_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "product_templates_blocks_pdp_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subtext" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "product_templates" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "product_templates_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "products_blocks_pdp_hero_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar
  );
  
  CREATE TABLE "products_blocks_pdp_hero_quick_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "products_blocks_pdp_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_products_blocks_pdp_hero_ctas_link_type" DEFAULT 'custom',
  	"link_label" varchar,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_open_in_new_tab" boolean DEFAULT false,
  	"link_appearance" "enum_products_blocks_pdp_hero_ctas_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "products_blocks_pdp_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"data_source" "enum_products_blocks_pdp_hero_data_source" DEFAULT 'common',
  	"badge" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"summary" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "products_blocks_pdp_contamination_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"stat" varchar
  );
  
  CREATE TABLE "products_blocks_pdp_contamination" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"data_source" "enum_products_blocks_pdp_contamination_data_source" DEFAULT 'common',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "products_blocks_pdp_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "products_blocks_pdp_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"data_source" "enum_products_blocks_pdp_how_it_works_data_source" DEFAULT 'common',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "products_blocks_pdp_machines_machines" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "products_blocks_pdp_machines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"data_source" "enum_products_blocks_pdp_machines_data_source" DEFAULT 'common',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "products_blocks_pdp_models_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "products_blocks_pdp_models_models_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "products_blocks_pdp_models_models" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "products_blocks_pdp_models" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"data_source" "enum_products_blocks_pdp_models_data_source" DEFAULT 'common',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "products_blocks_pdp_results_results_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "products_blocks_pdp_results_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "products_blocks_pdp_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"data_source" "enum_products_blocks_pdp_results_data_source" DEFAULT 'common',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "products_blocks_pdp_related_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "products_blocks_pdp_related" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"data_source" "enum_products_blocks_pdp_related_data_source" DEFAULT 'common',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "products_blocks_pdp_cta_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_products_blocks_pdp_cta_ctas_link_type" DEFAULT 'custom',
  	"link_label" varchar,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_open_in_new_tab" boolean DEFAULT false,
  	"link_appearance" "enum_products_blocks_pdp_cta_ctas_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "products_blocks_pdp_cta_trust_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "products_blocks_pdp_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"data_source" "enum_products_blocks_pdp_cta_data_source" DEFAULT 'common',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subtext" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"slug" varchar,
  	"short_description" varchar,
  	"featured_image_id" integer,
  	"featured" boolean DEFAULT false,
  	"template_id" integer,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical_url" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_products_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "products_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "_products_v_blocks_pdp_hero_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_blocks_pdp_hero_quick_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_blocks_pdp_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__products_v_blocks_pdp_hero_ctas_link_type" DEFAULT 'custom',
  	"link_label" varchar,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_open_in_new_tab" boolean DEFAULT false,
  	"link_appearance" "enum__products_v_blocks_pdp_hero_ctas_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_blocks_pdp_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"data_source" "enum__products_v_blocks_pdp_hero_data_source" DEFAULT 'common',
  	"badge" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"summary" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_products_v_blocks_pdp_contamination_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"stat" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_blocks_pdp_contamination" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"data_source" "enum__products_v_blocks_pdp_contamination_data_source" DEFAULT 'common',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_products_v_blocks_pdp_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_blocks_pdp_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"data_source" "enum__products_v_blocks_pdp_how_it_works_data_source" DEFAULT 'common',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_products_v_blocks_pdp_machines_machines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_blocks_pdp_machines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"data_source" "enum__products_v_blocks_pdp_machines_data_source" DEFAULT 'common',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_products_v_blocks_pdp_models_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_blocks_pdp_models_models_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_blocks_pdp_models_models" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_blocks_pdp_models" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"data_source" "enum__products_v_blocks_pdp_models_data_source" DEFAULT 'common',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_products_v_blocks_pdp_results_results_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_blocks_pdp_results_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_blocks_pdp_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"data_source" "enum__products_v_blocks_pdp_results_data_source" DEFAULT 'common',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_products_v_blocks_pdp_related_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_blocks_pdp_related" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"data_source" "enum__products_v_blocks_pdp_related_data_source" DEFAULT 'common',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_products_v_blocks_pdp_cta_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__products_v_blocks_pdp_cta_ctas_link_type" DEFAULT 'custom',
  	"link_label" varchar,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_open_in_new_tab" boolean DEFAULT false,
  	"link_appearance" "enum__products_v_blocks_pdp_cta_ctas_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_blocks_pdp_cta_trust_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_blocks_pdp_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"data_source" "enum__products_v_blocks_pdp_cta_data_source" DEFAULT 'common',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subtext" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_products_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_short_description" varchar,
  	"version_featured_image_id" integer,
  	"version_featured" boolean DEFAULT false,
  	"version_template_id" integer,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_canonical_url" varchar,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_seo_no_follow" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__products_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_products_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "product_templates_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "product_templates_blocks_pdp_hero_gallery" ADD CONSTRAINT "product_templates_blocks_pdp_hero_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "product_templates_blocks_pdp_hero_gallery" ADD CONSTRAINT "product_templates_blocks_pdp_hero_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_templates_blocks_pdp_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_templates_blocks_pdp_hero_quick_specs" ADD CONSTRAINT "product_templates_blocks_pdp_hero_quick_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_templates_blocks_pdp_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_templates_blocks_pdp_hero_ctas" ADD CONSTRAINT "product_templates_blocks_pdp_hero_ctas_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "product_templates_blocks_pdp_hero_ctas" ADD CONSTRAINT "product_templates_blocks_pdp_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_templates_blocks_pdp_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_templates_blocks_pdp_hero" ADD CONSTRAINT "product_templates_blocks_pdp_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_templates_blocks_pdp_contamination_cards" ADD CONSTRAINT "product_templates_blocks_pdp_contamination_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_templates_blocks_pdp_contamination"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_templates_blocks_pdp_contamination" ADD CONSTRAINT "product_templates_blocks_pdp_contamination_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_templates_blocks_pdp_how_it_works_steps" ADD CONSTRAINT "product_templates_blocks_pdp_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_templates_blocks_pdp_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_templates_blocks_pdp_how_it_works" ADD CONSTRAINT "product_templates_blocks_pdp_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_templates_blocks_pdp_machines_machines" ADD CONSTRAINT "product_templates_blocks_pdp_machines_machines_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "product_templates_blocks_pdp_machines_machines" ADD CONSTRAINT "product_templates_blocks_pdp_machines_machines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_templates_blocks_pdp_machines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_templates_blocks_pdp_machines" ADD CONSTRAINT "product_templates_blocks_pdp_machines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_templates_blocks_pdp_models_columns" ADD CONSTRAINT "product_templates_blocks_pdp_models_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_templates_blocks_pdp_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_templates_blocks_pdp_models_models_values" ADD CONSTRAINT "product_templates_blocks_pdp_models_models_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_templates_blocks_pdp_models_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_templates_blocks_pdp_models_models" ADD CONSTRAINT "product_templates_blocks_pdp_models_models_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_templates_blocks_pdp_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_templates_blocks_pdp_models" ADD CONSTRAINT "product_templates_blocks_pdp_models_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_templates_blocks_pdp_results_results_metrics" ADD CONSTRAINT "product_templates_blocks_pdp_results_results_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_templates_blocks_pdp_results_results"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_templates_blocks_pdp_results_results" ADD CONSTRAINT "product_templates_blocks_pdp_results_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_templates_blocks_pdp_results"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_templates_blocks_pdp_results" ADD CONSTRAINT "product_templates_blocks_pdp_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_templates_blocks_pdp_related_cards" ADD CONSTRAINT "product_templates_blocks_pdp_related_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "product_templates_blocks_pdp_related_cards" ADD CONSTRAINT "product_templates_blocks_pdp_related_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_templates_blocks_pdp_related"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_templates_blocks_pdp_related" ADD CONSTRAINT "product_templates_blocks_pdp_related_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_templates_blocks_pdp_cta_ctas" ADD CONSTRAINT "product_templates_blocks_pdp_cta_ctas_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "product_templates_blocks_pdp_cta_ctas" ADD CONSTRAINT "product_templates_blocks_pdp_cta_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_templates_blocks_pdp_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_templates_blocks_pdp_cta_trust_badges" ADD CONSTRAINT "product_templates_blocks_pdp_cta_trust_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_templates_blocks_pdp_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_templates_blocks_pdp_cta" ADD CONSTRAINT "product_templates_blocks_pdp_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_templates_rels" ADD CONSTRAINT "product_templates_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."product_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_templates_rels" ADD CONSTRAINT "product_templates_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_pdp_hero_gallery" ADD CONSTRAINT "products_blocks_pdp_hero_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_pdp_hero_gallery" ADD CONSTRAINT "products_blocks_pdp_hero_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_pdp_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_pdp_hero_quick_specs" ADD CONSTRAINT "products_blocks_pdp_hero_quick_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_pdp_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_pdp_hero_ctas" ADD CONSTRAINT "products_blocks_pdp_hero_ctas_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_pdp_hero_ctas" ADD CONSTRAINT "products_blocks_pdp_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_pdp_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_pdp_hero" ADD CONSTRAINT "products_blocks_pdp_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_pdp_contamination_cards" ADD CONSTRAINT "products_blocks_pdp_contamination_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_pdp_contamination"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_pdp_contamination" ADD CONSTRAINT "products_blocks_pdp_contamination_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_pdp_how_it_works_steps" ADD CONSTRAINT "products_blocks_pdp_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_pdp_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_pdp_how_it_works" ADD CONSTRAINT "products_blocks_pdp_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_pdp_machines_machines" ADD CONSTRAINT "products_blocks_pdp_machines_machines_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_pdp_machines_machines" ADD CONSTRAINT "products_blocks_pdp_machines_machines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_pdp_machines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_pdp_machines" ADD CONSTRAINT "products_blocks_pdp_machines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_pdp_models_columns" ADD CONSTRAINT "products_blocks_pdp_models_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_pdp_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_pdp_models_models_values" ADD CONSTRAINT "products_blocks_pdp_models_models_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_pdp_models_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_pdp_models_models" ADD CONSTRAINT "products_blocks_pdp_models_models_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_pdp_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_pdp_models" ADD CONSTRAINT "products_blocks_pdp_models_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_pdp_results_results_metrics" ADD CONSTRAINT "products_blocks_pdp_results_results_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_pdp_results_results"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_pdp_results_results" ADD CONSTRAINT "products_blocks_pdp_results_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_pdp_results"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_pdp_results" ADD CONSTRAINT "products_blocks_pdp_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_pdp_related_cards" ADD CONSTRAINT "products_blocks_pdp_related_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_pdp_related_cards" ADD CONSTRAINT "products_blocks_pdp_related_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_pdp_related"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_pdp_related" ADD CONSTRAINT "products_blocks_pdp_related_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_pdp_cta_ctas" ADD CONSTRAINT "products_blocks_pdp_cta_ctas_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_pdp_cta_ctas" ADD CONSTRAINT "products_blocks_pdp_cta_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_pdp_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_pdp_cta_trust_badges" ADD CONSTRAINT "products_blocks_pdp_cta_trust_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_pdp_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_pdp_cta" ADD CONSTRAINT "products_blocks_pdp_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_template_id_product_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."product_templates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_pdp_hero_gallery" ADD CONSTRAINT "_products_v_blocks_pdp_hero_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_pdp_hero_gallery" ADD CONSTRAINT "_products_v_blocks_pdp_hero_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_pdp_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_pdp_hero_quick_specs" ADD CONSTRAINT "_products_v_blocks_pdp_hero_quick_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_pdp_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_pdp_hero_ctas" ADD CONSTRAINT "_products_v_blocks_pdp_hero_ctas_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_pdp_hero_ctas" ADD CONSTRAINT "_products_v_blocks_pdp_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_pdp_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_pdp_hero" ADD CONSTRAINT "_products_v_blocks_pdp_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_pdp_contamination_cards" ADD CONSTRAINT "_products_v_blocks_pdp_contamination_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_pdp_contamination"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_pdp_contamination" ADD CONSTRAINT "_products_v_blocks_pdp_contamination_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_pdp_how_it_works_steps" ADD CONSTRAINT "_products_v_blocks_pdp_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_pdp_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_pdp_how_it_works" ADD CONSTRAINT "_products_v_blocks_pdp_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_pdp_machines_machines" ADD CONSTRAINT "_products_v_blocks_pdp_machines_machines_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_pdp_machines_machines" ADD CONSTRAINT "_products_v_blocks_pdp_machines_machines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_pdp_machines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_pdp_machines" ADD CONSTRAINT "_products_v_blocks_pdp_machines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_pdp_models_columns" ADD CONSTRAINT "_products_v_blocks_pdp_models_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_pdp_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_pdp_models_models_values" ADD CONSTRAINT "_products_v_blocks_pdp_models_models_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_pdp_models_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_pdp_models_models" ADD CONSTRAINT "_products_v_blocks_pdp_models_models_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_pdp_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_pdp_models" ADD CONSTRAINT "_products_v_blocks_pdp_models_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_pdp_results_results_metrics" ADD CONSTRAINT "_products_v_blocks_pdp_results_results_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_pdp_results_results"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_pdp_results_results" ADD CONSTRAINT "_products_v_blocks_pdp_results_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_pdp_results"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_pdp_results" ADD CONSTRAINT "_products_v_blocks_pdp_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_pdp_related_cards" ADD CONSTRAINT "_products_v_blocks_pdp_related_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_pdp_related_cards" ADD CONSTRAINT "_products_v_blocks_pdp_related_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_pdp_related"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_pdp_related" ADD CONSTRAINT "_products_v_blocks_pdp_related_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_pdp_cta_ctas" ADD CONSTRAINT "_products_v_blocks_pdp_cta_ctas_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_pdp_cta_ctas" ADD CONSTRAINT "_products_v_blocks_pdp_cta_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_pdp_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_pdp_cta_trust_badges" ADD CONSTRAINT "_products_v_blocks_pdp_cta_trust_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_pdp_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_pdp_cta" ADD CONSTRAINT "_products_v_blocks_pdp_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_parent_id_products_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_template_id_product_templates_id_fk" FOREIGN KEY ("version_template_id") REFERENCES "public"."product_templates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "product_templates_blocks_pdp_hero_gallery_order_idx" ON "product_templates_blocks_pdp_hero_gallery" USING btree ("_order");
  CREATE INDEX "product_templates_blocks_pdp_hero_gallery_parent_id_idx" ON "product_templates_blocks_pdp_hero_gallery" USING btree ("_parent_id");
  CREATE INDEX "product_templates_blocks_pdp_hero_gallery_image_idx" ON "product_templates_blocks_pdp_hero_gallery" USING btree ("image_id");
  CREATE INDEX "product_templates_blocks_pdp_hero_quick_specs_order_idx" ON "product_templates_blocks_pdp_hero_quick_specs" USING btree ("_order");
  CREATE INDEX "product_templates_blocks_pdp_hero_quick_specs_parent_id_idx" ON "product_templates_blocks_pdp_hero_quick_specs" USING btree ("_parent_id");
  CREATE INDEX "product_templates_blocks_pdp_hero_ctas_order_idx" ON "product_templates_blocks_pdp_hero_ctas" USING btree ("_order");
  CREATE INDEX "product_templates_blocks_pdp_hero_ctas_parent_id_idx" ON "product_templates_blocks_pdp_hero_ctas" USING btree ("_parent_id");
  CREATE INDEX "product_templates_blocks_pdp_hero_ctas_link_link_page_idx" ON "product_templates_blocks_pdp_hero_ctas" USING btree ("link_page_id");
  CREATE INDEX "product_templates_blocks_pdp_hero_order_idx" ON "product_templates_blocks_pdp_hero" USING btree ("_order");
  CREATE INDEX "product_templates_blocks_pdp_hero_parent_id_idx" ON "product_templates_blocks_pdp_hero" USING btree ("_parent_id");
  CREATE INDEX "product_templates_blocks_pdp_hero_path_idx" ON "product_templates_blocks_pdp_hero" USING btree ("_path");
  CREATE INDEX "product_templates_blocks_pdp_contamination_cards_order_idx" ON "product_templates_blocks_pdp_contamination_cards" USING btree ("_order");
  CREATE INDEX "product_templates_blocks_pdp_contamination_cards_parent_id_idx" ON "product_templates_blocks_pdp_contamination_cards" USING btree ("_parent_id");
  CREATE INDEX "product_templates_blocks_pdp_contamination_order_idx" ON "product_templates_blocks_pdp_contamination" USING btree ("_order");
  CREATE INDEX "product_templates_blocks_pdp_contamination_parent_id_idx" ON "product_templates_blocks_pdp_contamination" USING btree ("_parent_id");
  CREATE INDEX "product_templates_blocks_pdp_contamination_path_idx" ON "product_templates_blocks_pdp_contamination" USING btree ("_path");
  CREATE INDEX "product_templates_blocks_pdp_how_it_works_steps_order_idx" ON "product_templates_blocks_pdp_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "product_templates_blocks_pdp_how_it_works_steps_parent_id_idx" ON "product_templates_blocks_pdp_how_it_works_steps" USING btree ("_parent_id");
  CREATE INDEX "product_templates_blocks_pdp_how_it_works_order_idx" ON "product_templates_blocks_pdp_how_it_works" USING btree ("_order");
  CREATE INDEX "product_templates_blocks_pdp_how_it_works_parent_id_idx" ON "product_templates_blocks_pdp_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "product_templates_blocks_pdp_how_it_works_path_idx" ON "product_templates_blocks_pdp_how_it_works" USING btree ("_path");
  CREATE INDEX "product_templates_blocks_pdp_machines_machines_order_idx" ON "product_templates_blocks_pdp_machines_machines" USING btree ("_order");
  CREATE INDEX "product_templates_blocks_pdp_machines_machines_parent_id_idx" ON "product_templates_blocks_pdp_machines_machines" USING btree ("_parent_id");
  CREATE INDEX "product_templates_blocks_pdp_machines_machines_image_idx" ON "product_templates_blocks_pdp_machines_machines" USING btree ("image_id");
  CREATE INDEX "product_templates_blocks_pdp_machines_order_idx" ON "product_templates_blocks_pdp_machines" USING btree ("_order");
  CREATE INDEX "product_templates_blocks_pdp_machines_parent_id_idx" ON "product_templates_blocks_pdp_machines" USING btree ("_parent_id");
  CREATE INDEX "product_templates_blocks_pdp_machines_path_idx" ON "product_templates_blocks_pdp_machines" USING btree ("_path");
  CREATE INDEX "product_templates_blocks_pdp_models_columns_order_idx" ON "product_templates_blocks_pdp_models_columns" USING btree ("_order");
  CREATE INDEX "product_templates_blocks_pdp_models_columns_parent_id_idx" ON "product_templates_blocks_pdp_models_columns" USING btree ("_parent_id");
  CREATE INDEX "product_templates_blocks_pdp_models_models_values_order_idx" ON "product_templates_blocks_pdp_models_models_values" USING btree ("_order");
  CREATE INDEX "product_templates_blocks_pdp_models_models_values_parent_id_idx" ON "product_templates_blocks_pdp_models_models_values" USING btree ("_parent_id");
  CREATE INDEX "product_templates_blocks_pdp_models_models_order_idx" ON "product_templates_blocks_pdp_models_models" USING btree ("_order");
  CREATE INDEX "product_templates_blocks_pdp_models_models_parent_id_idx" ON "product_templates_blocks_pdp_models_models" USING btree ("_parent_id");
  CREATE INDEX "product_templates_blocks_pdp_models_order_idx" ON "product_templates_blocks_pdp_models" USING btree ("_order");
  CREATE INDEX "product_templates_blocks_pdp_models_parent_id_idx" ON "product_templates_blocks_pdp_models" USING btree ("_parent_id");
  CREATE INDEX "product_templates_blocks_pdp_models_path_idx" ON "product_templates_blocks_pdp_models" USING btree ("_path");
  CREATE INDEX "product_templates_blocks_pdp_results_results_metrics_order_idx" ON "product_templates_blocks_pdp_results_results_metrics" USING btree ("_order");
  CREATE INDEX "product_templates_blocks_pdp_results_results_metrics_parent_id_idx" ON "product_templates_blocks_pdp_results_results_metrics" USING btree ("_parent_id");
  CREATE INDEX "product_templates_blocks_pdp_results_results_order_idx" ON "product_templates_blocks_pdp_results_results" USING btree ("_order");
  CREATE INDEX "product_templates_blocks_pdp_results_results_parent_id_idx" ON "product_templates_blocks_pdp_results_results" USING btree ("_parent_id");
  CREATE INDEX "product_templates_blocks_pdp_results_order_idx" ON "product_templates_blocks_pdp_results" USING btree ("_order");
  CREATE INDEX "product_templates_blocks_pdp_results_parent_id_idx" ON "product_templates_blocks_pdp_results" USING btree ("_parent_id");
  CREATE INDEX "product_templates_blocks_pdp_results_path_idx" ON "product_templates_blocks_pdp_results" USING btree ("_path");
  CREATE INDEX "product_templates_blocks_pdp_related_cards_order_idx" ON "product_templates_blocks_pdp_related_cards" USING btree ("_order");
  CREATE INDEX "product_templates_blocks_pdp_related_cards_parent_id_idx" ON "product_templates_blocks_pdp_related_cards" USING btree ("_parent_id");
  CREATE INDEX "product_templates_blocks_pdp_related_cards_image_idx" ON "product_templates_blocks_pdp_related_cards" USING btree ("image_id");
  CREATE INDEX "product_templates_blocks_pdp_related_order_idx" ON "product_templates_blocks_pdp_related" USING btree ("_order");
  CREATE INDEX "product_templates_blocks_pdp_related_parent_id_idx" ON "product_templates_blocks_pdp_related" USING btree ("_parent_id");
  CREATE INDEX "product_templates_blocks_pdp_related_path_idx" ON "product_templates_blocks_pdp_related" USING btree ("_path");
  CREATE INDEX "product_templates_blocks_pdp_cta_ctas_order_idx" ON "product_templates_blocks_pdp_cta_ctas" USING btree ("_order");
  CREATE INDEX "product_templates_blocks_pdp_cta_ctas_parent_id_idx" ON "product_templates_blocks_pdp_cta_ctas" USING btree ("_parent_id");
  CREATE INDEX "product_templates_blocks_pdp_cta_ctas_link_link_page_idx" ON "product_templates_blocks_pdp_cta_ctas" USING btree ("link_page_id");
  CREATE INDEX "product_templates_blocks_pdp_cta_trust_badges_order_idx" ON "product_templates_blocks_pdp_cta_trust_badges" USING btree ("_order");
  CREATE INDEX "product_templates_blocks_pdp_cta_trust_badges_parent_id_idx" ON "product_templates_blocks_pdp_cta_trust_badges" USING btree ("_parent_id");
  CREATE INDEX "product_templates_blocks_pdp_cta_order_idx" ON "product_templates_blocks_pdp_cta" USING btree ("_order");
  CREATE INDEX "product_templates_blocks_pdp_cta_parent_id_idx" ON "product_templates_blocks_pdp_cta" USING btree ("_parent_id");
  CREATE INDEX "product_templates_blocks_pdp_cta_path_idx" ON "product_templates_blocks_pdp_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "product_templates_slug_idx" ON "product_templates" USING btree ("slug");
  CREATE INDEX "product_templates_updated_at_idx" ON "product_templates" USING btree ("updated_at");
  CREATE INDEX "product_templates_created_at_idx" ON "product_templates" USING btree ("created_at");
  CREATE INDEX "product_templates_rels_order_idx" ON "product_templates_rels" USING btree ("order");
  CREATE INDEX "product_templates_rels_parent_idx" ON "product_templates_rels" USING btree ("parent_id");
  CREATE INDEX "product_templates_rels_path_idx" ON "product_templates_rels" USING btree ("path");
  CREATE INDEX "product_templates_rels_products_id_idx" ON "product_templates_rels" USING btree ("products_id");
  CREATE INDEX "products_blocks_pdp_hero_gallery_order_idx" ON "products_blocks_pdp_hero_gallery" USING btree ("_order");
  CREATE INDEX "products_blocks_pdp_hero_gallery_parent_id_idx" ON "products_blocks_pdp_hero_gallery" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_pdp_hero_gallery_image_idx" ON "products_blocks_pdp_hero_gallery" USING btree ("image_id");
  CREATE INDEX "products_blocks_pdp_hero_quick_specs_order_idx" ON "products_blocks_pdp_hero_quick_specs" USING btree ("_order");
  CREATE INDEX "products_blocks_pdp_hero_quick_specs_parent_id_idx" ON "products_blocks_pdp_hero_quick_specs" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_pdp_hero_ctas_order_idx" ON "products_blocks_pdp_hero_ctas" USING btree ("_order");
  CREATE INDEX "products_blocks_pdp_hero_ctas_parent_id_idx" ON "products_blocks_pdp_hero_ctas" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_pdp_hero_ctas_link_link_page_idx" ON "products_blocks_pdp_hero_ctas" USING btree ("link_page_id");
  CREATE INDEX "products_blocks_pdp_hero_order_idx" ON "products_blocks_pdp_hero" USING btree ("_order");
  CREATE INDEX "products_blocks_pdp_hero_parent_id_idx" ON "products_blocks_pdp_hero" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_pdp_hero_path_idx" ON "products_blocks_pdp_hero" USING btree ("_path");
  CREATE INDEX "products_blocks_pdp_contamination_cards_order_idx" ON "products_blocks_pdp_contamination_cards" USING btree ("_order");
  CREATE INDEX "products_blocks_pdp_contamination_cards_parent_id_idx" ON "products_blocks_pdp_contamination_cards" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_pdp_contamination_order_idx" ON "products_blocks_pdp_contamination" USING btree ("_order");
  CREATE INDEX "products_blocks_pdp_contamination_parent_id_idx" ON "products_blocks_pdp_contamination" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_pdp_contamination_path_idx" ON "products_blocks_pdp_contamination" USING btree ("_path");
  CREATE INDEX "products_blocks_pdp_how_it_works_steps_order_idx" ON "products_blocks_pdp_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "products_blocks_pdp_how_it_works_steps_parent_id_idx" ON "products_blocks_pdp_how_it_works_steps" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_pdp_how_it_works_order_idx" ON "products_blocks_pdp_how_it_works" USING btree ("_order");
  CREATE INDEX "products_blocks_pdp_how_it_works_parent_id_idx" ON "products_blocks_pdp_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_pdp_how_it_works_path_idx" ON "products_blocks_pdp_how_it_works" USING btree ("_path");
  CREATE INDEX "products_blocks_pdp_machines_machines_order_idx" ON "products_blocks_pdp_machines_machines" USING btree ("_order");
  CREATE INDEX "products_blocks_pdp_machines_machines_parent_id_idx" ON "products_blocks_pdp_machines_machines" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_pdp_machines_machines_image_idx" ON "products_blocks_pdp_machines_machines" USING btree ("image_id");
  CREATE INDEX "products_blocks_pdp_machines_order_idx" ON "products_blocks_pdp_machines" USING btree ("_order");
  CREATE INDEX "products_blocks_pdp_machines_parent_id_idx" ON "products_blocks_pdp_machines" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_pdp_machines_path_idx" ON "products_blocks_pdp_machines" USING btree ("_path");
  CREATE INDEX "products_blocks_pdp_models_columns_order_idx" ON "products_blocks_pdp_models_columns" USING btree ("_order");
  CREATE INDEX "products_blocks_pdp_models_columns_parent_id_idx" ON "products_blocks_pdp_models_columns" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_pdp_models_models_values_order_idx" ON "products_blocks_pdp_models_models_values" USING btree ("_order");
  CREATE INDEX "products_blocks_pdp_models_models_values_parent_id_idx" ON "products_blocks_pdp_models_models_values" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_pdp_models_models_order_idx" ON "products_blocks_pdp_models_models" USING btree ("_order");
  CREATE INDEX "products_blocks_pdp_models_models_parent_id_idx" ON "products_blocks_pdp_models_models" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_pdp_models_order_idx" ON "products_blocks_pdp_models" USING btree ("_order");
  CREATE INDEX "products_blocks_pdp_models_parent_id_idx" ON "products_blocks_pdp_models" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_pdp_models_path_idx" ON "products_blocks_pdp_models" USING btree ("_path");
  CREATE INDEX "products_blocks_pdp_results_results_metrics_order_idx" ON "products_blocks_pdp_results_results_metrics" USING btree ("_order");
  CREATE INDEX "products_blocks_pdp_results_results_metrics_parent_id_idx" ON "products_blocks_pdp_results_results_metrics" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_pdp_results_results_order_idx" ON "products_blocks_pdp_results_results" USING btree ("_order");
  CREATE INDEX "products_blocks_pdp_results_results_parent_id_idx" ON "products_blocks_pdp_results_results" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_pdp_results_order_idx" ON "products_blocks_pdp_results" USING btree ("_order");
  CREATE INDEX "products_blocks_pdp_results_parent_id_idx" ON "products_blocks_pdp_results" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_pdp_results_path_idx" ON "products_blocks_pdp_results" USING btree ("_path");
  CREATE INDEX "products_blocks_pdp_related_cards_order_idx" ON "products_blocks_pdp_related_cards" USING btree ("_order");
  CREATE INDEX "products_blocks_pdp_related_cards_parent_id_idx" ON "products_blocks_pdp_related_cards" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_pdp_related_cards_image_idx" ON "products_blocks_pdp_related_cards" USING btree ("image_id");
  CREATE INDEX "products_blocks_pdp_related_order_idx" ON "products_blocks_pdp_related" USING btree ("_order");
  CREATE INDEX "products_blocks_pdp_related_parent_id_idx" ON "products_blocks_pdp_related" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_pdp_related_path_idx" ON "products_blocks_pdp_related" USING btree ("_path");
  CREATE INDEX "products_blocks_pdp_cta_ctas_order_idx" ON "products_blocks_pdp_cta_ctas" USING btree ("_order");
  CREATE INDEX "products_blocks_pdp_cta_ctas_parent_id_idx" ON "products_blocks_pdp_cta_ctas" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_pdp_cta_ctas_link_link_page_idx" ON "products_blocks_pdp_cta_ctas" USING btree ("link_page_id");
  CREATE INDEX "products_blocks_pdp_cta_trust_badges_order_idx" ON "products_blocks_pdp_cta_trust_badges" USING btree ("_order");
  CREATE INDEX "products_blocks_pdp_cta_trust_badges_parent_id_idx" ON "products_blocks_pdp_cta_trust_badges" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_pdp_cta_order_idx" ON "products_blocks_pdp_cta" USING btree ("_order");
  CREATE INDEX "products_blocks_pdp_cta_parent_id_idx" ON "products_blocks_pdp_cta" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_pdp_cta_path_idx" ON "products_blocks_pdp_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX "products_featured_image_idx" ON "products" USING btree ("featured_image_id");
  CREATE INDEX "products_template_idx" ON "products" USING btree ("template_id");
  CREATE INDEX "products_seo_seo_og_image_idx" ON "products" USING btree ("seo_og_image_id");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX "products__status_idx" ON "products" USING btree ("_status");
  CREATE INDEX "products_rels_order_idx" ON "products_rels" USING btree ("order");
  CREATE INDEX "products_rels_parent_idx" ON "products_rels" USING btree ("parent_id");
  CREATE INDEX "products_rels_path_idx" ON "products_rels" USING btree ("path");
  CREATE INDEX "products_rels_products_id_idx" ON "products_rels" USING btree ("products_id");
  CREATE INDEX "_products_v_blocks_pdp_hero_gallery_order_idx" ON "_products_v_blocks_pdp_hero_gallery" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_pdp_hero_gallery_parent_id_idx" ON "_products_v_blocks_pdp_hero_gallery" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_pdp_hero_gallery_image_idx" ON "_products_v_blocks_pdp_hero_gallery" USING btree ("image_id");
  CREATE INDEX "_products_v_blocks_pdp_hero_quick_specs_order_idx" ON "_products_v_blocks_pdp_hero_quick_specs" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_pdp_hero_quick_specs_parent_id_idx" ON "_products_v_blocks_pdp_hero_quick_specs" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_pdp_hero_ctas_order_idx" ON "_products_v_blocks_pdp_hero_ctas" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_pdp_hero_ctas_parent_id_idx" ON "_products_v_blocks_pdp_hero_ctas" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_pdp_hero_ctas_link_link_page_idx" ON "_products_v_blocks_pdp_hero_ctas" USING btree ("link_page_id");
  CREATE INDEX "_products_v_blocks_pdp_hero_order_idx" ON "_products_v_blocks_pdp_hero" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_pdp_hero_parent_id_idx" ON "_products_v_blocks_pdp_hero" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_pdp_hero_path_idx" ON "_products_v_blocks_pdp_hero" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_pdp_contamination_cards_order_idx" ON "_products_v_blocks_pdp_contamination_cards" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_pdp_contamination_cards_parent_id_idx" ON "_products_v_blocks_pdp_contamination_cards" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_pdp_contamination_order_idx" ON "_products_v_blocks_pdp_contamination" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_pdp_contamination_parent_id_idx" ON "_products_v_blocks_pdp_contamination" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_pdp_contamination_path_idx" ON "_products_v_blocks_pdp_contamination" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_pdp_how_it_works_steps_order_idx" ON "_products_v_blocks_pdp_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_pdp_how_it_works_steps_parent_id_idx" ON "_products_v_blocks_pdp_how_it_works_steps" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_pdp_how_it_works_order_idx" ON "_products_v_blocks_pdp_how_it_works" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_pdp_how_it_works_parent_id_idx" ON "_products_v_blocks_pdp_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_pdp_how_it_works_path_idx" ON "_products_v_blocks_pdp_how_it_works" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_pdp_machines_machines_order_idx" ON "_products_v_blocks_pdp_machines_machines" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_pdp_machines_machines_parent_id_idx" ON "_products_v_blocks_pdp_machines_machines" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_pdp_machines_machines_image_idx" ON "_products_v_blocks_pdp_machines_machines" USING btree ("image_id");
  CREATE INDEX "_products_v_blocks_pdp_machines_order_idx" ON "_products_v_blocks_pdp_machines" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_pdp_machines_parent_id_idx" ON "_products_v_blocks_pdp_machines" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_pdp_machines_path_idx" ON "_products_v_blocks_pdp_machines" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_pdp_models_columns_order_idx" ON "_products_v_blocks_pdp_models_columns" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_pdp_models_columns_parent_id_idx" ON "_products_v_blocks_pdp_models_columns" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_pdp_models_models_values_order_idx" ON "_products_v_blocks_pdp_models_models_values" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_pdp_models_models_values_parent_id_idx" ON "_products_v_blocks_pdp_models_models_values" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_pdp_models_models_order_idx" ON "_products_v_blocks_pdp_models_models" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_pdp_models_models_parent_id_idx" ON "_products_v_blocks_pdp_models_models" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_pdp_models_order_idx" ON "_products_v_blocks_pdp_models" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_pdp_models_parent_id_idx" ON "_products_v_blocks_pdp_models" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_pdp_models_path_idx" ON "_products_v_blocks_pdp_models" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_pdp_results_results_metrics_order_idx" ON "_products_v_blocks_pdp_results_results_metrics" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_pdp_results_results_metrics_parent_id_idx" ON "_products_v_blocks_pdp_results_results_metrics" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_pdp_results_results_order_idx" ON "_products_v_blocks_pdp_results_results" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_pdp_results_results_parent_id_idx" ON "_products_v_blocks_pdp_results_results" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_pdp_results_order_idx" ON "_products_v_blocks_pdp_results" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_pdp_results_parent_id_idx" ON "_products_v_blocks_pdp_results" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_pdp_results_path_idx" ON "_products_v_blocks_pdp_results" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_pdp_related_cards_order_idx" ON "_products_v_blocks_pdp_related_cards" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_pdp_related_cards_parent_id_idx" ON "_products_v_blocks_pdp_related_cards" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_pdp_related_cards_image_idx" ON "_products_v_blocks_pdp_related_cards" USING btree ("image_id");
  CREATE INDEX "_products_v_blocks_pdp_related_order_idx" ON "_products_v_blocks_pdp_related" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_pdp_related_parent_id_idx" ON "_products_v_blocks_pdp_related" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_pdp_related_path_idx" ON "_products_v_blocks_pdp_related" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_pdp_cta_ctas_order_idx" ON "_products_v_blocks_pdp_cta_ctas" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_pdp_cta_ctas_parent_id_idx" ON "_products_v_blocks_pdp_cta_ctas" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_pdp_cta_ctas_link_link_page_idx" ON "_products_v_blocks_pdp_cta_ctas" USING btree ("link_page_id");
  CREATE INDEX "_products_v_blocks_pdp_cta_trust_badges_order_idx" ON "_products_v_blocks_pdp_cta_trust_badges" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_pdp_cta_trust_badges_parent_id_idx" ON "_products_v_blocks_pdp_cta_trust_badges" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_pdp_cta_order_idx" ON "_products_v_blocks_pdp_cta" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_pdp_cta_parent_id_idx" ON "_products_v_blocks_pdp_cta" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_pdp_cta_path_idx" ON "_products_v_blocks_pdp_cta" USING btree ("_path");
  CREATE INDEX "_products_v_parent_idx" ON "_products_v" USING btree ("parent_id");
  CREATE INDEX "_products_v_version_version_slug_idx" ON "_products_v" USING btree ("version_slug");
  CREATE INDEX "_products_v_version_version_featured_image_idx" ON "_products_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_products_v_version_version_template_idx" ON "_products_v" USING btree ("version_template_id");
  CREATE INDEX "_products_v_version_seo_version_seo_og_image_idx" ON "_products_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_products_v_version_version_updated_at_idx" ON "_products_v" USING btree ("version_updated_at");
  CREATE INDEX "_products_v_version_version_created_at_idx" ON "_products_v" USING btree ("version_created_at");
  CREATE INDEX "_products_v_version_version__status_idx" ON "_products_v" USING btree ("version__status");
  CREATE INDEX "_products_v_created_at_idx" ON "_products_v" USING btree ("created_at");
  CREATE INDEX "_products_v_updated_at_idx" ON "_products_v" USING btree ("updated_at");
  CREATE INDEX "_products_v_latest_idx" ON "_products_v" USING btree ("latest");
  CREATE INDEX "_products_v_autosave_idx" ON "_products_v" USING btree ("autosave");
  CREATE INDEX "_products_v_rels_order_idx" ON "_products_v_rels" USING btree ("order");
  CREATE INDEX "_products_v_rels_parent_idx" ON "_products_v_rels" USING btree ("parent_id");
  CREATE INDEX "_products_v_rels_path_idx" ON "_products_v_rels" USING btree ("path");
  CREATE INDEX "_products_v_rels_products_id_idx" ON "_products_v_rels" USING btree ("products_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_product_templates_fk" FOREIGN KEY ("product_templates_id") REFERENCES "public"."product_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_product_templates_id_idx" ON "payload_locked_documents_rels" USING btree ("product_templates_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "product_templates_blocks_pdp_hero_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_templates_blocks_pdp_hero_quick_specs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_templates_blocks_pdp_hero_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_templates_blocks_pdp_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_templates_blocks_pdp_contamination_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_templates_blocks_pdp_contamination" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_templates_blocks_pdp_how_it_works_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_templates_blocks_pdp_how_it_works" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_templates_blocks_pdp_machines_machines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_templates_blocks_pdp_machines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_templates_blocks_pdp_models_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_templates_blocks_pdp_models_models_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_templates_blocks_pdp_models_models" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_templates_blocks_pdp_models" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_templates_blocks_pdp_results_results_metrics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_templates_blocks_pdp_results_results" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_templates_blocks_pdp_results" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_templates_blocks_pdp_related_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_templates_blocks_pdp_related" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_templates_blocks_pdp_cta_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_templates_blocks_pdp_cta_trust_badges" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_templates_blocks_pdp_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_templates" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_templates_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_pdp_hero_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_pdp_hero_quick_specs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_pdp_hero_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_pdp_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_pdp_contamination_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_pdp_contamination" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_pdp_how_it_works_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_pdp_how_it_works" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_pdp_machines_machines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_pdp_machines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_pdp_models_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_pdp_models_models_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_pdp_models_models" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_pdp_models" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_pdp_results_results_metrics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_pdp_results_results" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_pdp_results" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_pdp_related_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_pdp_related" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_pdp_cta_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_pdp_cta_trust_badges" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_pdp_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_pdp_hero_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_pdp_hero_quick_specs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_pdp_hero_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_pdp_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_pdp_contamination_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_pdp_contamination" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_pdp_how_it_works_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_pdp_how_it_works" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_pdp_machines_machines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_pdp_machines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_pdp_models_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_pdp_models_models_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_pdp_models_models" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_pdp_models" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_pdp_results_results_metrics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_pdp_results_results" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_pdp_results" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_pdp_related_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_pdp_related" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_pdp_cta_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_pdp_cta_trust_badges" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_pdp_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "product_templates_blocks_pdp_hero_gallery" CASCADE;
  DROP TABLE "product_templates_blocks_pdp_hero_quick_specs" CASCADE;
  DROP TABLE "product_templates_blocks_pdp_hero_ctas" CASCADE;
  DROP TABLE "product_templates_blocks_pdp_hero" CASCADE;
  DROP TABLE "product_templates_blocks_pdp_contamination_cards" CASCADE;
  DROP TABLE "product_templates_blocks_pdp_contamination" CASCADE;
  DROP TABLE "product_templates_blocks_pdp_how_it_works_steps" CASCADE;
  DROP TABLE "product_templates_blocks_pdp_how_it_works" CASCADE;
  DROP TABLE "product_templates_blocks_pdp_machines_machines" CASCADE;
  DROP TABLE "product_templates_blocks_pdp_machines" CASCADE;
  DROP TABLE "product_templates_blocks_pdp_models_columns" CASCADE;
  DROP TABLE "product_templates_blocks_pdp_models_models_values" CASCADE;
  DROP TABLE "product_templates_blocks_pdp_models_models" CASCADE;
  DROP TABLE "product_templates_blocks_pdp_models" CASCADE;
  DROP TABLE "product_templates_blocks_pdp_results_results_metrics" CASCADE;
  DROP TABLE "product_templates_blocks_pdp_results_results" CASCADE;
  DROP TABLE "product_templates_blocks_pdp_results" CASCADE;
  DROP TABLE "product_templates_blocks_pdp_related_cards" CASCADE;
  DROP TABLE "product_templates_blocks_pdp_related" CASCADE;
  DROP TABLE "product_templates_blocks_pdp_cta_ctas" CASCADE;
  DROP TABLE "product_templates_blocks_pdp_cta_trust_badges" CASCADE;
  DROP TABLE "product_templates_blocks_pdp_cta" CASCADE;
  DROP TABLE "product_templates" CASCADE;
  DROP TABLE "product_templates_rels" CASCADE;
  DROP TABLE "products_blocks_pdp_hero_gallery" CASCADE;
  DROP TABLE "products_blocks_pdp_hero_quick_specs" CASCADE;
  DROP TABLE "products_blocks_pdp_hero_ctas" CASCADE;
  DROP TABLE "products_blocks_pdp_hero" CASCADE;
  DROP TABLE "products_blocks_pdp_contamination_cards" CASCADE;
  DROP TABLE "products_blocks_pdp_contamination" CASCADE;
  DROP TABLE "products_blocks_pdp_how_it_works_steps" CASCADE;
  DROP TABLE "products_blocks_pdp_how_it_works" CASCADE;
  DROP TABLE "products_blocks_pdp_machines_machines" CASCADE;
  DROP TABLE "products_blocks_pdp_machines" CASCADE;
  DROP TABLE "products_blocks_pdp_models_columns" CASCADE;
  DROP TABLE "products_blocks_pdp_models_models_values" CASCADE;
  DROP TABLE "products_blocks_pdp_models_models" CASCADE;
  DROP TABLE "products_blocks_pdp_models" CASCADE;
  DROP TABLE "products_blocks_pdp_results_results_metrics" CASCADE;
  DROP TABLE "products_blocks_pdp_results_results" CASCADE;
  DROP TABLE "products_blocks_pdp_results" CASCADE;
  DROP TABLE "products_blocks_pdp_related_cards" CASCADE;
  DROP TABLE "products_blocks_pdp_related" CASCADE;
  DROP TABLE "products_blocks_pdp_cta_ctas" CASCADE;
  DROP TABLE "products_blocks_pdp_cta_trust_badges" CASCADE;
  DROP TABLE "products_blocks_pdp_cta" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "products_rels" CASCADE;
  DROP TABLE "_products_v_blocks_pdp_hero_gallery" CASCADE;
  DROP TABLE "_products_v_blocks_pdp_hero_quick_specs" CASCADE;
  DROP TABLE "_products_v_blocks_pdp_hero_ctas" CASCADE;
  DROP TABLE "_products_v_blocks_pdp_hero" CASCADE;
  DROP TABLE "_products_v_blocks_pdp_contamination_cards" CASCADE;
  DROP TABLE "_products_v_blocks_pdp_contamination" CASCADE;
  DROP TABLE "_products_v_blocks_pdp_how_it_works_steps" CASCADE;
  DROP TABLE "_products_v_blocks_pdp_how_it_works" CASCADE;
  DROP TABLE "_products_v_blocks_pdp_machines_machines" CASCADE;
  DROP TABLE "_products_v_blocks_pdp_machines" CASCADE;
  DROP TABLE "_products_v_blocks_pdp_models_columns" CASCADE;
  DROP TABLE "_products_v_blocks_pdp_models_models_values" CASCADE;
  DROP TABLE "_products_v_blocks_pdp_models_models" CASCADE;
  DROP TABLE "_products_v_blocks_pdp_models" CASCADE;
  DROP TABLE "_products_v_blocks_pdp_results_results_metrics" CASCADE;
  DROP TABLE "_products_v_blocks_pdp_results_results" CASCADE;
  DROP TABLE "_products_v_blocks_pdp_results" CASCADE;
  DROP TABLE "_products_v_blocks_pdp_related_cards" CASCADE;
  DROP TABLE "_products_v_blocks_pdp_related" CASCADE;
  DROP TABLE "_products_v_blocks_pdp_cta_ctas" CASCADE;
  DROP TABLE "_products_v_blocks_pdp_cta_trust_badges" CASCADE;
  DROP TABLE "_products_v_blocks_pdp_cta" CASCADE;
  DROP TABLE "_products_v" CASCADE;
  DROP TABLE "_products_v_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_product_templates_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_products_fk";
  
  DROP INDEX "payload_locked_documents_rels_product_templates_id_idx";
  DROP INDEX "payload_locked_documents_rels_products_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "product_templates_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "products_id";
  DROP TYPE "public"."enum_product_templates_blocks_pdp_hero_ctas_link_type";
  DROP TYPE "public"."enum_product_templates_blocks_pdp_hero_ctas_link_appearance";
  DROP TYPE "public"."enum_product_templates_blocks_pdp_cta_ctas_link_type";
  DROP TYPE "public"."enum_product_templates_blocks_pdp_cta_ctas_link_appearance";
  DROP TYPE "public"."enum_products_blocks_pdp_hero_ctas_link_type";
  DROP TYPE "public"."enum_products_blocks_pdp_hero_ctas_link_appearance";
  DROP TYPE "public"."enum_products_blocks_pdp_hero_data_source";
  DROP TYPE "public"."enum_products_blocks_pdp_contamination_data_source";
  DROP TYPE "public"."enum_products_blocks_pdp_how_it_works_data_source";
  DROP TYPE "public"."enum_products_blocks_pdp_machines_data_source";
  DROP TYPE "public"."enum_products_blocks_pdp_models_data_source";
  DROP TYPE "public"."enum_products_blocks_pdp_results_data_source";
  DROP TYPE "public"."enum_products_blocks_pdp_related_data_source";
  DROP TYPE "public"."enum_products_blocks_pdp_cta_ctas_link_type";
  DROP TYPE "public"."enum_products_blocks_pdp_cta_ctas_link_appearance";
  DROP TYPE "public"."enum_products_blocks_pdp_cta_data_source";
  DROP TYPE "public"."enum_products_status";
  DROP TYPE "public"."enum__products_v_blocks_pdp_hero_ctas_link_type";
  DROP TYPE "public"."enum__products_v_blocks_pdp_hero_ctas_link_appearance";
  DROP TYPE "public"."enum__products_v_blocks_pdp_hero_data_source";
  DROP TYPE "public"."enum__products_v_blocks_pdp_contamination_data_source";
  DROP TYPE "public"."enum__products_v_blocks_pdp_how_it_works_data_source";
  DROP TYPE "public"."enum__products_v_blocks_pdp_machines_data_source";
  DROP TYPE "public"."enum__products_v_blocks_pdp_models_data_source";
  DROP TYPE "public"."enum__products_v_blocks_pdp_results_data_source";
  DROP TYPE "public"."enum__products_v_blocks_pdp_related_data_source";
  DROP TYPE "public"."enum__products_v_blocks_pdp_cta_ctas_link_type";
  DROP TYPE "public"."enum__products_v_blocks_pdp_cta_ctas_link_appearance";
  DROP TYPE "public"."enum__products_v_blocks_pdp_cta_data_source";
  DROP TYPE "public"."enum__products_v_version_status";`);
}
