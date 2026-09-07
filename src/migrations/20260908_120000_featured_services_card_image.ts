import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_featured_services_cards" ADD COLUMN IF NOT EXISTS "image_id" integer;
    ALTER TABLE "_pages_v_blocks_featured_services_cards" ADD COLUMN IF NOT EXISTS "image_id" integer;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_featured_services_cards" ADD CONSTRAINT "pages_blocks_featured_services_cards_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_featured_services_cards" ADD CONSTRAINT "_pages_v_blocks_featured_services_cards_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE INDEX IF NOT EXISTS "pages_blocks_featured_services_cards_image_idx"
      ON "pages_blocks_featured_services_cards" USING btree ("image_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_featured_services_cards_image_idx"
      ON "_pages_v_blocks_featured_services_cards" USING btree ("image_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_featured_services_cards" DROP CONSTRAINT IF EXISTS "pages_blocks_featured_services_cards_image_id_media_id_fk";
    ALTER TABLE "_pages_v_blocks_featured_services_cards" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_featured_services_cards_image_id_media_id_fk";
    DROP INDEX IF EXISTS "pages_blocks_featured_services_cards_image_idx";
    DROP INDEX IF EXISTS "_pages_v_blocks_featured_services_cards_image_idx";
    ALTER TABLE "pages_blocks_featured_services_cards" DROP COLUMN IF EXISTS "image_id";
    ALTER TABLE "_pages_v_blocks_featured_services_cards" DROP COLUMN IF EXISTS "image_id";
  `);
}
