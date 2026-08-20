import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_team" ADD COLUMN IF NOT EXISTS "show_extra_members" boolean DEFAULT false;
    ALTER TABLE "pages_blocks_team" ADD COLUMN IF NOT EXISTS "extra_heading" varchar;
    ALTER TABLE "_pages_v_blocks_team" ADD COLUMN IF NOT EXISTS "show_extra_members" boolean DEFAULT false;
    ALTER TABLE "_pages_v_blocks_team" ADD COLUMN IF NOT EXISTS "extra_heading" varchar;

    CREATE TABLE IF NOT EXISTS "pages_blocks_team_extra_members" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar,
      "role" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_team_extra_members" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar,
      "role" varchar,
      "_uuid" varchar
    );

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_team_extra_members"
        ADD CONSTRAINT "pages_blocks_team_extra_members_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_team_extra_members"
        ADD CONSTRAINT "_pages_v_blocks_team_extra_members_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE INDEX IF NOT EXISTS "pages_blocks_team_extra_members_order_idx"
      ON "pages_blocks_team_extra_members" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_team_extra_members_parent_id_idx"
      ON "pages_blocks_team_extra_members" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_team_extra_members_order_idx"
      ON "_pages_v_blocks_team_extra_members" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_team_extra_members_parent_id_idx"
      ON "_pages_v_blocks_team_extra_members" USING btree ("_parent_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "pages_blocks_team_extra_members" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_team_extra_members" CASCADE;
    ALTER TABLE "pages_blocks_team" DROP COLUMN IF EXISTS "show_extra_members";
    ALTER TABLE "pages_blocks_team" DROP COLUMN IF EXISTS "extra_heading";
    ALTER TABLE "_pages_v_blocks_team" DROP COLUMN IF EXISTS "show_extra_members";
    ALTER TABLE "_pages_v_blocks_team" DROP COLUMN IF EXISTS "extra_heading";
  `);
}
