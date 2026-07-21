import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('super-admin', 'editor');
  CREATE TYPE "public"."enum_pages_blocks_hero_ctas_link_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_hero_ctas_link_appearance" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_featured_products_cta_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_featured_products_cta_appearance" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_featured_services_cta_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_featured_services_cta_appearance" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_featured_case_studies_cta_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_featured_case_studies_cta_appearance" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_cta_ctas_link_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_ctas_link_appearance" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_ctas_link_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_ctas_link_appearance" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__pages_v_blocks_featured_products_cta_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_featured_products_cta_appearance" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__pages_v_blocks_featured_services_cta_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_featured_services_cta_appearance" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__pages_v_blocks_featured_case_studies_cta_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_featured_case_studies_cta_appearance" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_ctas_link_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_ctas_link_appearance" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_site_settings_social_links_platform" AS ENUM('linkedin', 'twitter', 'facebook', 'instagram', 'youtube', 'other');
  CREATE TYPE "public"."enum_site_settings_default_cta_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum_site_settings_default_cta_appearance" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_navigation_main_menu_children_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum_navigation_main_menu_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum_navigation_utility_menu_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum_navigation_mobile_menu_children_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum_navigation_mobile_menu_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum_footer_columns_links_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum_footer_bottom_bar_legal_links_type" AS ENUM('page', 'custom');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "pages_blocks_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_hero_ctas_link_type" DEFAULT 'custom',
  	"link_label" varchar,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_open_in_new_tab" boolean DEFAULT false,
  	"link_appearance" "enum_pages_blocks_hero_ctas_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_hero_meta_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subheadline" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_trust_indicators_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"alt" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_trust_indicators" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_statistics_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_statistics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_featured_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"cta_type" "enum_pages_blocks_featured_products_cta_type" DEFAULT 'custom',
  	"cta_label" varchar,
  	"cta_page_id" integer,
  	"cta_url" varchar,
  	"cta_open_in_new_tab" boolean DEFAULT false,
  	"cta_appearance" "enum_pages_blocks_featured_products_cta_appearance" DEFAULT 'primary',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_featured_industries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_featured_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"cta_type" "enum_pages_blocks_featured_services_cta_type" DEFAULT 'custom',
  	"cta_label" varchar,
  	"cta_page_id" integer,
  	"cta_url" varchar,
  	"cta_open_in_new_tab" boolean DEFAULT false,
  	"cta_appearance" "enum_pages_blocks_featured_services_cta_appearance" DEFAULT 'primary',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_process_story_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_process_story" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_featured_case_studies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"cta_type" "enum_pages_blocks_featured_case_studies_cta_type" DEFAULT 'custom',
  	"cta_label" varchar,
  	"cta_page_id" integer,
  	"cta_url" varchar,
  	"cta_open_in_new_tab" boolean DEFAULT false,
  	"cta_appearance" "enum_pages_blocks_featured_case_studies_cta_appearance" DEFAULT 'primary',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_story_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" varchar,
  	"label" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_about_story" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"quote" varchar,
  	"quote_author" varchar,
  	"quote_role" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"client_name" varchar,
  	"company" varchar,
  	"position" varchar,
  	"photo_id" integer
  );
  
  CREATE TABLE "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"photo_id" integer
  );
  
  CREATE TABLE "pages_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_cta_ctas_link_type" DEFAULT 'custom',
  	"link_label" varchar,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_open_in_new_tab" boolean DEFAULT false,
  	"link_appearance" "enum_pages_blocks_cta_ctas_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_cta_trust_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"subtext" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_preview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"show_contact_info" boolean DEFAULT true,
  	"show_form" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical_url" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_pages_v_blocks_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_hero_ctas_link_type" DEFAULT 'custom',
  	"link_label" varchar,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_open_in_new_tab" boolean DEFAULT false,
  	"link_appearance" "enum__pages_v_blocks_hero_ctas_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_meta_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subheadline" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_trust_indicators_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"alt" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_trust_indicators" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_statistics_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_statistics" (
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
  
  CREATE TABLE "_pages_v_blocks_featured_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"cta_type" "enum__pages_v_blocks_featured_products_cta_type" DEFAULT 'custom',
  	"cta_label" varchar,
  	"cta_page_id" integer,
  	"cta_url" varchar,
  	"cta_open_in_new_tab" boolean DEFAULT false,
  	"cta_appearance" "enum__pages_v_blocks_featured_products_cta_appearance" DEFAULT 'primary',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_featured_industries" (
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
  
  CREATE TABLE "_pages_v_blocks_featured_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"cta_type" "enum__pages_v_blocks_featured_services_cta_type" DEFAULT 'custom',
  	"cta_label" varchar,
  	"cta_page_id" integer,
  	"cta_url" varchar,
  	"cta_open_in_new_tab" boolean DEFAULT false,
  	"cta_appearance" "enum__pages_v_blocks_featured_services_cta_appearance" DEFAULT 'primary',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_story_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"year" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_story" (
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
  
  CREATE TABLE "_pages_v_blocks_featured_case_studies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"cta_type" "enum__pages_v_blocks_featured_case_studies_cta_type" DEFAULT 'custom',
  	"cta_label" varchar,
  	"cta_page_id" integer,
  	"cta_url" varchar,
  	"cta_open_in_new_tab" boolean DEFAULT false,
  	"cta_appearance" "enum__pages_v_blocks_featured_case_studies_cta_appearance" DEFAULT 'primary',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_story_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"year" varchar,
  	"label" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_story" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"quote" varchar,
  	"quote_author" varchar,
  	"quote_role" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"client_name" varchar,
  	"company" varchar,
  	"position" varchar,
  	"photo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials" (
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
  
  CREATE TABLE "_pages_v_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"photo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team" (
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
  
  CREATE TABLE "_pages_v_blocks_cta_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_cta_ctas_link_type" DEFAULT 'custom',
  	"link_label" varchar,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_open_in_new_tab" boolean DEFAULT false,
  	"link_appearance" "enum__pages_v_blocks_cta_ctas_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_trust_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"subtext" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_preview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"show_contact_info" boolean DEFAULT true,
  	"show_form" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_canonical_url" varchar,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_seo_no_follow" boolean DEFAULT false,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"company_name" varchar DEFAULT 'Company Name' NOT NULL,
  	"company_tagline" varchar,
  	"logo_id" integer,
  	"logo_mark_id" integer,
  	"favicon_id" integer,
  	"default_cta_type" "enum_site_settings_default_cta_type" DEFAULT 'custom' NOT NULL,
  	"default_cta_label" varchar,
  	"default_cta_page_id" integer,
  	"default_cta_url" varchar,
  	"default_cta_open_in_new_tab" boolean DEFAULT false,
  	"default_cta_appearance" "enum_site_settings_default_cta_appearance" DEFAULT 'primary',
  	"fonts_heading_font" varchar DEFAULT 'Poppins',
  	"fonts_body_font" varchar DEFAULT 'Arimo',
  	"theme_brand_primary" varchar DEFAULT '#006633',
  	"theme_brand_deep" varchar DEFAULT '#004422',
  	"theme_brand_bright" varchar DEFAULT '#008844',
  	"theme_background" varchar DEFAULT '#EBF2EE',
  	"theme_surface" varchar DEFAULT '#DCE8E1',
  	"features_enable_search" boolean DEFAULT true,
  	"features_enable_blog" boolean DEFAULT true,
  	"features_enable_newsletter" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "navigation_main_menu_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "enum_navigation_main_menu_children_type" DEFAULT 'custom' NOT NULL,
  	"page_id" integer,
  	"url" varchar,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "navigation_main_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "enum_navigation_main_menu_type" DEFAULT 'custom' NOT NULL,
  	"page_id" integer,
  	"url" varchar,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "navigation_utility_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "enum_navigation_utility_menu_type" DEFAULT 'custom' NOT NULL,
  	"page_id" integer,
  	"url" varchar,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "navigation_mobile_menu_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "enum_navigation_mobile_menu_children_type" DEFAULT 'custom' NOT NULL,
  	"page_id" integer,
  	"url" varchar,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "navigation_mobile_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "enum_navigation_mobile_menu_type" DEFAULT 'custom' NOT NULL,
  	"page_id" integer,
  	"url" varchar,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "enum_footer_columns_links_type" DEFAULT 'custom' NOT NULL,
  	"page_id" integer,
  	"url" varchar,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "footer_bottom_bar_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "enum_footer_bottom_bar_legal_links_type" DEFAULT 'custom' NOT NULL,
  	"page_id" integer,
  	"url" varchar,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "footer_certifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"image_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"newsletter_heading" varchar,
  	"newsletter_description" varchar,
  	"newsletter_placeholder" varchar DEFAULT 'Enter your email',
  	"newsletter_enabled" boolean DEFAULT false,
  	"bottom_bar_copyright_text" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_info_addresses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"street" varchar,
  	"city" varchar,
  	"state" varchar,
  	"country" varchar DEFAULT 'India',
  	"pin" varchar,
  	"map_link" varchar
  );
  
  CREATE TABLE "contact_info_phones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"number" varchar NOT NULL
  );
  
  CREATE TABLE "contact_info_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "contact_info" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"business_hours" jsonb,
  	"map_embed" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "seo_defaults" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_title" varchar DEFAULT '%s | Company',
  	"site_description" varchar,
  	"og_image_id" integer,
  	"twitter_handle" varchar,
  	"google_site_verification" varchar,
  	"structured_data_organization_name" varchar,
  	"structured_data_legal_name" varchar,
  	"structured_data_founding_date" varchar,
  	"structured_data_url" varchar,
  	"structured_data_logo_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_ctas" ADD CONSTRAINT "pages_blocks_hero_ctas_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_ctas" ADD CONSTRAINT "pages_blocks_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_meta_stats" ADD CONSTRAINT "pages_blocks_hero_meta_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_indicators_logos" ADD CONSTRAINT "pages_blocks_trust_indicators_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_indicators_logos" ADD CONSTRAINT "pages_blocks_trust_indicators_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_trust_indicators"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_indicators" ADD CONSTRAINT "pages_blocks_trust_indicators_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_statistics_stats" ADD CONSTRAINT "pages_blocks_statistics_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_statistics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_statistics" ADD CONSTRAINT "pages_blocks_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_products" ADD CONSTRAINT "pages_blocks_featured_products_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_products" ADD CONSTRAINT "pages_blocks_featured_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_industries" ADD CONSTRAINT "pages_blocks_featured_industries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_services" ADD CONSTRAINT "pages_blocks_featured_services_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_services" ADD CONSTRAINT "pages_blocks_featured_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_story_steps" ADD CONSTRAINT "pages_blocks_process_story_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_story"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_story" ADD CONSTRAINT "pages_blocks_process_story_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_case_studies" ADD CONSTRAINT "pages_blocks_featured_case_studies_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_case_studies" ADD CONSTRAINT "pages_blocks_featured_case_studies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_story_timeline" ADD CONSTRAINT "pages_blocks_about_story_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_story"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_story" ADD CONSTRAINT "pages_blocks_about_story_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_story" ADD CONSTRAINT "pages_blocks_about_story_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_items" ADD CONSTRAINT "pages_blocks_testimonials_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_items" ADD CONSTRAINT "pages_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_members" ADD CONSTRAINT "pages_blocks_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_members" ADD CONSTRAINT "pages_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team" ADD CONSTRAINT "pages_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_ctas" ADD CONSTRAINT "pages_blocks_cta_ctas_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_ctas" ADD CONSTRAINT "pages_blocks_cta_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_trust_badges" ADD CONSTRAINT "pages_blocks_cta_trust_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_preview" ADD CONSTRAINT "pages_blocks_contact_preview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_content" ADD CONSTRAINT "pages_blocks_rich_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_ctas" ADD CONSTRAINT "_pages_v_blocks_hero_ctas_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_ctas" ADD CONSTRAINT "_pages_v_blocks_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_meta_stats" ADD CONSTRAINT "_pages_v_blocks_hero_meta_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trust_indicators_logos" ADD CONSTRAINT "_pages_v_blocks_trust_indicators_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trust_indicators_logos" ADD CONSTRAINT "_pages_v_blocks_trust_indicators_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_trust_indicators"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trust_indicators" ADD CONSTRAINT "_pages_v_blocks_trust_indicators_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_statistics_stats" ADD CONSTRAINT "_pages_v_blocks_statistics_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_statistics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_statistics" ADD CONSTRAINT "_pages_v_blocks_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_products" ADD CONSTRAINT "_pages_v_blocks_featured_products_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_products" ADD CONSTRAINT "_pages_v_blocks_featured_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_industries" ADD CONSTRAINT "_pages_v_blocks_featured_industries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_services" ADD CONSTRAINT "_pages_v_blocks_featured_services_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_services" ADD CONSTRAINT "_pages_v_blocks_featured_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_story_steps" ADD CONSTRAINT "_pages_v_blocks_process_story_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_story"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_story" ADD CONSTRAINT "_pages_v_blocks_process_story_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_case_studies" ADD CONSTRAINT "_pages_v_blocks_featured_case_studies_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_case_studies" ADD CONSTRAINT "_pages_v_blocks_featured_case_studies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_story_timeline" ADD CONSTRAINT "_pages_v_blocks_about_story_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about_story"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_story" ADD CONSTRAINT "_pages_v_blocks_about_story_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_story" ADD CONSTRAINT "_pages_v_blocks_about_story_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_items" ADD CONSTRAINT "_pages_v_blocks_testimonials_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_items" ADD CONSTRAINT "_pages_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_members" ADD CONSTRAINT "_pages_v_blocks_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_members" ADD CONSTRAINT "_pages_v_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team" ADD CONSTRAINT "_pages_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_ctas" ADD CONSTRAINT "_pages_v_blocks_cta_ctas_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_ctas" ADD CONSTRAINT "_pages_v_blocks_cta_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_trust_badges" ADD CONSTRAINT "_pages_v_blocks_cta_trust_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_preview" ADD CONSTRAINT "_pages_v_blocks_contact_preview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_content" ADD CONSTRAINT "_pages_v_blocks_rich_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_mark_id_media_id_fk" FOREIGN KEY ("logo_mark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_cta_page_id_pages_id_fk" FOREIGN KEY ("default_cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_main_menu_children" ADD CONSTRAINT "navigation_main_menu_children_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_main_menu_children" ADD CONSTRAINT "navigation_main_menu_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_main_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_main_menu" ADD CONSTRAINT "navigation_main_menu_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_main_menu" ADD CONSTRAINT "navigation_main_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_utility_menu" ADD CONSTRAINT "navigation_utility_menu_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_utility_menu" ADD CONSTRAINT "navigation_utility_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_mobile_menu_children" ADD CONSTRAINT "navigation_mobile_menu_children_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_mobile_menu_children" ADD CONSTRAINT "navigation_mobile_menu_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_mobile_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_mobile_menu" ADD CONSTRAINT "navigation_mobile_menu_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_mobile_menu" ADD CONSTRAINT "navigation_mobile_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_bottom_bar_legal_links" ADD CONSTRAINT "footer_bottom_bar_legal_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_bottom_bar_legal_links" ADD CONSTRAINT "footer_bottom_bar_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_certifications" ADD CONSTRAINT "footer_certifications_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_certifications" ADD CONSTRAINT "footer_certifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_info_addresses" ADD CONSTRAINT "contact_info_addresses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_info_phones" ADD CONSTRAINT "contact_info_phones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_info_emails" ADD CONSTRAINT "contact_info_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo_defaults" ADD CONSTRAINT "seo_defaults_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seo_defaults" ADD CONSTRAINT "seo_defaults_structured_data_logo_id_media_id_fk" FOREIGN KEY ("structured_data_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "pages_blocks_hero_ctas_order_idx" ON "pages_blocks_hero_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_ctas_parent_id_idx" ON "pages_blocks_hero_ctas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_ctas_link_link_page_idx" ON "pages_blocks_hero_ctas" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_hero_meta_stats_order_idx" ON "pages_blocks_hero_meta_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_meta_stats_parent_id_idx" ON "pages_blocks_hero_meta_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_image_idx" ON "pages_blocks_hero" USING btree ("image_id");
  CREATE INDEX "pages_blocks_trust_indicators_logos_order_idx" ON "pages_blocks_trust_indicators_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_trust_indicators_logos_parent_id_idx" ON "pages_blocks_trust_indicators_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_trust_indicators_logos_logo_idx" ON "pages_blocks_trust_indicators_logos" USING btree ("logo_id");
  CREATE INDEX "pages_blocks_trust_indicators_order_idx" ON "pages_blocks_trust_indicators" USING btree ("_order");
  CREATE INDEX "pages_blocks_trust_indicators_parent_id_idx" ON "pages_blocks_trust_indicators" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_trust_indicators_path_idx" ON "pages_blocks_trust_indicators" USING btree ("_path");
  CREATE INDEX "pages_blocks_statistics_stats_order_idx" ON "pages_blocks_statistics_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_statistics_stats_parent_id_idx" ON "pages_blocks_statistics_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_statistics_order_idx" ON "pages_blocks_statistics" USING btree ("_order");
  CREATE INDEX "pages_blocks_statistics_parent_id_idx" ON "pages_blocks_statistics" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_statistics_path_idx" ON "pages_blocks_statistics" USING btree ("_path");
  CREATE INDEX "pages_blocks_featured_products_order_idx" ON "pages_blocks_featured_products" USING btree ("_order");
  CREATE INDEX "pages_blocks_featured_products_parent_id_idx" ON "pages_blocks_featured_products" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_featured_products_path_idx" ON "pages_blocks_featured_products" USING btree ("_path");
  CREATE INDEX "pages_blocks_featured_products_cta_cta_page_idx" ON "pages_blocks_featured_products" USING btree ("cta_page_id");
  CREATE INDEX "pages_blocks_featured_industries_order_idx" ON "pages_blocks_featured_industries" USING btree ("_order");
  CREATE INDEX "pages_blocks_featured_industries_parent_id_idx" ON "pages_blocks_featured_industries" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_featured_industries_path_idx" ON "pages_blocks_featured_industries" USING btree ("_path");
  CREATE INDEX "pages_blocks_featured_services_order_idx" ON "pages_blocks_featured_services" USING btree ("_order");
  CREATE INDEX "pages_blocks_featured_services_parent_id_idx" ON "pages_blocks_featured_services" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_featured_services_path_idx" ON "pages_blocks_featured_services" USING btree ("_path");
  CREATE INDEX "pages_blocks_featured_services_cta_cta_page_idx" ON "pages_blocks_featured_services" USING btree ("cta_page_id");
  CREATE INDEX "pages_blocks_process_story_steps_order_idx" ON "pages_blocks_process_story_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_story_steps_parent_id_idx" ON "pages_blocks_process_story_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_story_order_idx" ON "pages_blocks_process_story" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_story_parent_id_idx" ON "pages_blocks_process_story" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_story_path_idx" ON "pages_blocks_process_story" USING btree ("_path");
  CREATE INDEX "pages_blocks_featured_case_studies_order_idx" ON "pages_blocks_featured_case_studies" USING btree ("_order");
  CREATE INDEX "pages_blocks_featured_case_studies_parent_id_idx" ON "pages_blocks_featured_case_studies" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_featured_case_studies_path_idx" ON "pages_blocks_featured_case_studies" USING btree ("_path");
  CREATE INDEX "pages_blocks_featured_case_studies_cta_cta_page_idx" ON "pages_blocks_featured_case_studies" USING btree ("cta_page_id");
  CREATE INDEX "pages_blocks_about_story_timeline_order_idx" ON "pages_blocks_about_story_timeline" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_story_timeline_parent_id_idx" ON "pages_blocks_about_story_timeline" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_story_order_idx" ON "pages_blocks_about_story" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_story_parent_id_idx" ON "pages_blocks_about_story" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_story_path_idx" ON "pages_blocks_about_story" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_story_image_idx" ON "pages_blocks_about_story" USING btree ("image_id");
  CREATE INDEX "pages_blocks_testimonials_items_order_idx" ON "pages_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_items_parent_id_idx" ON "pages_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_items_photo_idx" ON "pages_blocks_testimonials_items" USING btree ("photo_id");
  CREATE INDEX "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "pages_blocks_team_members_order_idx" ON "pages_blocks_team_members" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_members_parent_id_idx" ON "pages_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_members_photo_idx" ON "pages_blocks_team_members" USING btree ("photo_id");
  CREATE INDEX "pages_blocks_team_order_idx" ON "pages_blocks_team" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_parent_id_idx" ON "pages_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_path_idx" ON "pages_blocks_team" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_ctas_order_idx" ON "pages_blocks_cta_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_ctas_parent_id_idx" ON "pages_blocks_cta_ctas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_ctas_link_link_page_idx" ON "pages_blocks_cta_ctas" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_cta_trust_badges_order_idx" ON "pages_blocks_cta_trust_badges" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_trust_badges_parent_id_idx" ON "pages_blocks_cta_trust_badges" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_preview_order_idx" ON "pages_blocks_contact_preview" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_preview_parent_id_idx" ON "pages_blocks_contact_preview" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_preview_path_idx" ON "pages_blocks_contact_preview" USING btree ("_path");
  CREATE INDEX "pages_blocks_rich_content_order_idx" ON "pages_blocks_rich_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_content_parent_id_idx" ON "pages_blocks_rich_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_content_path_idx" ON "pages_blocks_rich_content" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_seo_seo_og_image_idx" ON "pages" USING btree ("seo_og_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "_pages_v_blocks_hero_ctas_order_idx" ON "_pages_v_blocks_hero_ctas" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_ctas_parent_id_idx" ON "_pages_v_blocks_hero_ctas" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_ctas_link_link_page_idx" ON "_pages_v_blocks_hero_ctas" USING btree ("link_page_id");
  CREATE INDEX "_pages_v_blocks_hero_meta_stats_order_idx" ON "_pages_v_blocks_hero_meta_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_meta_stats_parent_id_idx" ON "_pages_v_blocks_hero_meta_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_image_idx" ON "_pages_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_trust_indicators_logos_order_idx" ON "_pages_v_blocks_trust_indicators_logos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_trust_indicators_logos_parent_id_idx" ON "_pages_v_blocks_trust_indicators_logos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_trust_indicators_logos_logo_idx" ON "_pages_v_blocks_trust_indicators_logos" USING btree ("logo_id");
  CREATE INDEX "_pages_v_blocks_trust_indicators_order_idx" ON "_pages_v_blocks_trust_indicators" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_trust_indicators_parent_id_idx" ON "_pages_v_blocks_trust_indicators" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_trust_indicators_path_idx" ON "_pages_v_blocks_trust_indicators" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_statistics_stats_order_idx" ON "_pages_v_blocks_statistics_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_statistics_stats_parent_id_idx" ON "_pages_v_blocks_statistics_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_statistics_order_idx" ON "_pages_v_blocks_statistics" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_statistics_parent_id_idx" ON "_pages_v_blocks_statistics" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_statistics_path_idx" ON "_pages_v_blocks_statistics" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_featured_products_order_idx" ON "_pages_v_blocks_featured_products" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_featured_products_parent_id_idx" ON "_pages_v_blocks_featured_products" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_featured_products_path_idx" ON "_pages_v_blocks_featured_products" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_featured_products_cta_cta_page_idx" ON "_pages_v_blocks_featured_products" USING btree ("cta_page_id");
  CREATE INDEX "_pages_v_blocks_featured_industries_order_idx" ON "_pages_v_blocks_featured_industries" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_featured_industries_parent_id_idx" ON "_pages_v_blocks_featured_industries" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_featured_industries_path_idx" ON "_pages_v_blocks_featured_industries" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_featured_services_order_idx" ON "_pages_v_blocks_featured_services" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_featured_services_parent_id_idx" ON "_pages_v_blocks_featured_services" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_featured_services_path_idx" ON "_pages_v_blocks_featured_services" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_featured_services_cta_cta_page_idx" ON "_pages_v_blocks_featured_services" USING btree ("cta_page_id");
  CREATE INDEX "_pages_v_blocks_process_story_steps_order_idx" ON "_pages_v_blocks_process_story_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_story_steps_parent_id_idx" ON "_pages_v_blocks_process_story_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_story_order_idx" ON "_pages_v_blocks_process_story" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_story_parent_id_idx" ON "_pages_v_blocks_process_story" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_story_path_idx" ON "_pages_v_blocks_process_story" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_featured_case_studies_order_idx" ON "_pages_v_blocks_featured_case_studies" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_featured_case_studies_parent_id_idx" ON "_pages_v_blocks_featured_case_studies" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_featured_case_studies_path_idx" ON "_pages_v_blocks_featured_case_studies" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_featured_case_studies_cta_cta_page_idx" ON "_pages_v_blocks_featured_case_studies" USING btree ("cta_page_id");
  CREATE INDEX "_pages_v_blocks_about_story_timeline_order_idx" ON "_pages_v_blocks_about_story_timeline" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_story_timeline_parent_id_idx" ON "_pages_v_blocks_about_story_timeline" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_story_order_idx" ON "_pages_v_blocks_about_story" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_story_parent_id_idx" ON "_pages_v_blocks_about_story" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_story_path_idx" ON "_pages_v_blocks_about_story" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_about_story_image_idx" ON "_pages_v_blocks_about_story" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_testimonials_items_order_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_items_parent_id_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_items_photo_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("photo_id");
  CREATE INDEX "_pages_v_blocks_testimonials_order_idx" ON "_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_path_idx" ON "_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_team_members_order_idx" ON "_pages_v_blocks_team_members" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_members_parent_id_idx" ON "_pages_v_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_members_photo_idx" ON "_pages_v_blocks_team_members" USING btree ("photo_id");
  CREATE INDEX "_pages_v_blocks_team_order_idx" ON "_pages_v_blocks_team" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_parent_id_idx" ON "_pages_v_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_path_idx" ON "_pages_v_blocks_team" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_ctas_order_idx" ON "_pages_v_blocks_cta_ctas" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_ctas_parent_id_idx" ON "_pages_v_blocks_cta_ctas" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_ctas_link_link_page_idx" ON "_pages_v_blocks_cta_ctas" USING btree ("link_page_id");
  CREATE INDEX "_pages_v_blocks_cta_trust_badges_order_idx" ON "_pages_v_blocks_cta_trust_badges" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_trust_badges_parent_id_idx" ON "_pages_v_blocks_cta_trust_badges" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_preview_order_idx" ON "_pages_v_blocks_contact_preview" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_preview_parent_id_idx" ON "_pages_v_blocks_contact_preview" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_preview_path_idx" ON "_pages_v_blocks_contact_preview" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_rich_content_order_idx" ON "_pages_v_blocks_rich_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_content_parent_id_idx" ON "_pages_v_blocks_rich_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_content_path_idx" ON "_pages_v_blocks_rich_content" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_seo_version_seo_og_image_idx" ON "_pages_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_social_links_order_idx" ON "site_settings_social_links" USING btree ("_order");
  CREATE INDEX "site_settings_social_links_parent_id_idx" ON "site_settings_social_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_logo_mark_idx" ON "site_settings" USING btree ("logo_mark_id");
  CREATE INDEX "site_settings_favicon_idx" ON "site_settings" USING btree ("favicon_id");
  CREATE INDEX "site_settings_default_cta_default_cta_page_idx" ON "site_settings" USING btree ("default_cta_page_id");
  CREATE INDEX "navigation_main_menu_children_order_idx" ON "navigation_main_menu_children" USING btree ("_order");
  CREATE INDEX "navigation_main_menu_children_parent_id_idx" ON "navigation_main_menu_children" USING btree ("_parent_id");
  CREATE INDEX "navigation_main_menu_children_page_idx" ON "navigation_main_menu_children" USING btree ("page_id");
  CREATE INDEX "navigation_main_menu_order_idx" ON "navigation_main_menu" USING btree ("_order");
  CREATE INDEX "navigation_main_menu_parent_id_idx" ON "navigation_main_menu" USING btree ("_parent_id");
  CREATE INDEX "navigation_main_menu_page_idx" ON "navigation_main_menu" USING btree ("page_id");
  CREATE INDEX "navigation_utility_menu_order_idx" ON "navigation_utility_menu" USING btree ("_order");
  CREATE INDEX "navigation_utility_menu_parent_id_idx" ON "navigation_utility_menu" USING btree ("_parent_id");
  CREATE INDEX "navigation_utility_menu_page_idx" ON "navigation_utility_menu" USING btree ("page_id");
  CREATE INDEX "navigation_mobile_menu_children_order_idx" ON "navigation_mobile_menu_children" USING btree ("_order");
  CREATE INDEX "navigation_mobile_menu_children_parent_id_idx" ON "navigation_mobile_menu_children" USING btree ("_parent_id");
  CREATE INDEX "navigation_mobile_menu_children_page_idx" ON "navigation_mobile_menu_children" USING btree ("page_id");
  CREATE INDEX "navigation_mobile_menu_order_idx" ON "navigation_mobile_menu" USING btree ("_order");
  CREATE INDEX "navigation_mobile_menu_parent_id_idx" ON "navigation_mobile_menu" USING btree ("_parent_id");
  CREATE INDEX "navigation_mobile_menu_page_idx" ON "navigation_mobile_menu" USING btree ("page_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_links_page_idx" ON "footer_columns_links" USING btree ("page_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE INDEX "footer_bottom_bar_legal_links_order_idx" ON "footer_bottom_bar_legal_links" USING btree ("_order");
  CREATE INDEX "footer_bottom_bar_legal_links_parent_id_idx" ON "footer_bottom_bar_legal_links" USING btree ("_parent_id");
  CREATE INDEX "footer_bottom_bar_legal_links_page_idx" ON "footer_bottom_bar_legal_links" USING btree ("page_id");
  CREATE INDEX "footer_certifications_order_idx" ON "footer_certifications" USING btree ("_order");
  CREATE INDEX "footer_certifications_parent_id_idx" ON "footer_certifications" USING btree ("_parent_id");
  CREATE INDEX "footer_certifications_image_idx" ON "footer_certifications" USING btree ("image_id");
  CREATE INDEX "contact_info_addresses_order_idx" ON "contact_info_addresses" USING btree ("_order");
  CREATE INDEX "contact_info_addresses_parent_id_idx" ON "contact_info_addresses" USING btree ("_parent_id");
  CREATE INDEX "contact_info_phones_order_idx" ON "contact_info_phones" USING btree ("_order");
  CREATE INDEX "contact_info_phones_parent_id_idx" ON "contact_info_phones" USING btree ("_parent_id");
  CREATE INDEX "contact_info_emails_order_idx" ON "contact_info_emails" USING btree ("_order");
  CREATE INDEX "contact_info_emails_parent_id_idx" ON "contact_info_emails" USING btree ("_parent_id");
  CREATE INDEX "seo_defaults_og_image_idx" ON "seo_defaults" USING btree ("og_image_id");
  CREATE INDEX "seo_defaults_structured_data_structured_data_logo_idx" ON "seo_defaults" USING btree ("structured_data_logo_id");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "pages_blocks_hero_ctas" CASCADE;
  DROP TABLE "pages_blocks_hero_meta_stats" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_trust_indicators_logos" CASCADE;
  DROP TABLE "pages_blocks_trust_indicators" CASCADE;
  DROP TABLE "pages_blocks_statistics_stats" CASCADE;
  DROP TABLE "pages_blocks_statistics" CASCADE;
  DROP TABLE "pages_blocks_featured_products" CASCADE;
  DROP TABLE "pages_blocks_featured_industries" CASCADE;
  DROP TABLE "pages_blocks_featured_services" CASCADE;
  DROP TABLE "pages_blocks_process_story_steps" CASCADE;
  DROP TABLE "pages_blocks_process_story" CASCADE;
  DROP TABLE "pages_blocks_featured_case_studies" CASCADE;
  DROP TABLE "pages_blocks_about_story_timeline" CASCADE;
  DROP TABLE "pages_blocks_about_story" CASCADE;
  DROP TABLE "pages_blocks_testimonials_items" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages_blocks_team_members" CASCADE;
  DROP TABLE "pages_blocks_team" CASCADE;
  DROP TABLE "pages_blocks_cta_ctas" CASCADE;
  DROP TABLE "pages_blocks_cta_trust_badges" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_contact_preview" CASCADE;
  DROP TABLE "pages_blocks_rich_content" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_ctas" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_meta_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_trust_indicators_logos" CASCADE;
  DROP TABLE "_pages_v_blocks_trust_indicators" CASCADE;
  DROP TABLE "_pages_v_blocks_statistics_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_statistics" CASCADE;
  DROP TABLE "_pages_v_blocks_featured_products" CASCADE;
  DROP TABLE "_pages_v_blocks_featured_industries" CASCADE;
  DROP TABLE "_pages_v_blocks_featured_services" CASCADE;
  DROP TABLE "_pages_v_blocks_process_story_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_process_story" CASCADE;
  DROP TABLE "_pages_v_blocks_featured_case_studies" CASCADE;
  DROP TABLE "_pages_v_blocks_about_story_timeline" CASCADE;
  DROP TABLE "_pages_v_blocks_about_story" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_team_members" CASCADE;
  DROP TABLE "_pages_v_blocks_team" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_ctas" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_trust_badges" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_preview" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_content" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_social_links" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "navigation_main_menu_children" CASCADE;
  DROP TABLE "navigation_main_menu" CASCADE;
  DROP TABLE "navigation_utility_menu" CASCADE;
  DROP TABLE "navigation_mobile_menu_children" CASCADE;
  DROP TABLE "navigation_mobile_menu" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer_bottom_bar_legal_links" CASCADE;
  DROP TABLE "footer_certifications" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "contact_info_addresses" CASCADE;
  DROP TABLE "contact_info_phones" CASCADE;
  DROP TABLE "contact_info_emails" CASCADE;
  DROP TABLE "contact_info" CASCADE;
  DROP TABLE "seo_defaults" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_pages_blocks_hero_ctas_link_type";
  DROP TYPE "public"."enum_pages_blocks_hero_ctas_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_featured_products_cta_type";
  DROP TYPE "public"."enum_pages_blocks_featured_products_cta_appearance";
  DROP TYPE "public"."enum_pages_blocks_featured_services_cta_type";
  DROP TYPE "public"."enum_pages_blocks_featured_services_cta_appearance";
  DROP TYPE "public"."enum_pages_blocks_featured_case_studies_cta_type";
  DROP TYPE "public"."enum_pages_blocks_featured_case_studies_cta_appearance";
  DROP TYPE "public"."enum_pages_blocks_cta_ctas_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_ctas_link_appearance";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_ctas_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_ctas_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_featured_products_cta_type";
  DROP TYPE "public"."enum__pages_v_blocks_featured_products_cta_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_featured_services_cta_type";
  DROP TYPE "public"."enum__pages_v_blocks_featured_services_cta_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_featured_case_studies_cta_type";
  DROP TYPE "public"."enum__pages_v_blocks_featured_case_studies_cta_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_cta_ctas_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_ctas_link_appearance";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_site_settings_social_links_platform";
  DROP TYPE "public"."enum_site_settings_default_cta_type";
  DROP TYPE "public"."enum_site_settings_default_cta_appearance";
  DROP TYPE "public"."enum_navigation_main_menu_children_type";
  DROP TYPE "public"."enum_navigation_main_menu_type";
  DROP TYPE "public"."enum_navigation_utility_menu_type";
  DROP TYPE "public"."enum_navigation_mobile_menu_children_type";
  DROP TYPE "public"."enum_navigation_mobile_menu_type";
  DROP TYPE "public"."enum_footer_columns_links_type";
  DROP TYPE "public"."enum_footer_bottom_bar_legal_links_type";`);
}
