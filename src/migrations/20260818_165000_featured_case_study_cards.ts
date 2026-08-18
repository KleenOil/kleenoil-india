import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_featured_case_studies_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	CONSTRAINT "pages_blocks_featured_case_studies_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_featured_case_studies"("id") ON DELETE cascade ON UPDATE no action
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_featured_case_studies_cards_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	CONSTRAINT "pages_blocks_fcs_cards_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_featured_case_studies_cards"("id") ON DELETE cascade ON UPDATE no action
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_featured_case_studies_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"_uuid" varchar,
  	CONSTRAINT "_pages_v_blocks_featured_case_studies_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_featured_case_studies"("id") ON DELETE cascade ON UPDATE no action
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_featured_case_studies_cards_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar,
  	CONSTRAINT "_pages_v_blocks_fcs_cards_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_featured_case_studies_cards"("id") ON DELETE cascade ON UPDATE no action
  );

  CREATE INDEX IF NOT EXISTS "pages_blocks_featured_case_studies_cards_order_idx" ON "pages_blocks_featured_case_studies_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_featured_case_studies_cards_parent_id_idx" ON "pages_blocks_featured_case_studies_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_fcs_cards_metrics_order_idx" ON "pages_blocks_featured_case_studies_cards_metrics" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_fcs_cards_metrics_parent_id_idx" ON "pages_blocks_featured_case_studies_cards_metrics" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_featured_case_studies_cards_order_idx" ON "_pages_v_blocks_featured_case_studies_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_featured_case_studies_cards_parent_id_idx" ON "_pages_v_blocks_featured_case_studies_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_fcs_cards_metrics_order_idx" ON "_pages_v_blocks_featured_case_studies_cards_metrics" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_fcs_cards_metrics_parent_id_idx" ON "_pages_v_blocks_featured_case_studies_cards_metrics" USING btree ("_parent_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "pages_blocks_featured_case_studies_cards_metrics" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_featured_case_studies_cards_metrics" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_featured_case_studies_cards" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_featured_case_studies_cards" CASCADE;
  `);
}
