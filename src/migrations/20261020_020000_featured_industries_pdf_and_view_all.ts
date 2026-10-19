import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_featured_industries_cards" ADD COLUMN IF NOT EXISTS "pdf_id" integer;
    ALTER TABLE "_pages_v_blocks_featured_industries_cards" ADD COLUMN IF NOT EXISTS "pdf_id" integer;

    ALTER TABLE "pages_blocks_featured_industries" ADD COLUMN IF NOT EXISTS "view_all_tag" varchar;
    ALTER TABLE "pages_blocks_featured_industries" ADD COLUMN IF NOT EXISTS "view_all_title" varchar;
    ALTER TABLE "pages_blocks_featured_industries" ADD COLUMN IF NOT EXISTS "view_all_description" varchar;
    ALTER TABLE "pages_blocks_featured_industries" ADD COLUMN IF NOT EXISTS "view_all_cta_label" varchar;
    ALTER TABLE "pages_blocks_featured_industries" ADD COLUMN IF NOT EXISTS "view_all_href" varchar;
    ALTER TABLE "_pages_v_blocks_featured_industries" ADD COLUMN IF NOT EXISTS "view_all_tag" varchar;
    ALTER TABLE "_pages_v_blocks_featured_industries" ADD COLUMN IF NOT EXISTS "view_all_title" varchar;
    ALTER TABLE "_pages_v_blocks_featured_industries" ADD COLUMN IF NOT EXISTS "view_all_description" varchar;
    ALTER TABLE "_pages_v_blocks_featured_industries" ADD COLUMN IF NOT EXISTS "view_all_cta_label" varchar;
    ALTER TABLE "_pages_v_blocks_featured_industries" ADD COLUMN IF NOT EXISTS "view_all_href" varchar;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_featured_industries_cards" ADD CONSTRAINT "pages_blocks_featured_industries_cards_pdf_id_media_id_fk"
        FOREIGN KEY ("pdf_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_featured_industries_cards" ADD CONSTRAINT "_pages_v_blocks_featured_industries_cards_pdf_id_media_id_fk"
        FOREIGN KEY ("pdf_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE INDEX IF NOT EXISTS "pages_blocks_featured_industries_cards_pdf_idx"
      ON "pages_blocks_featured_industries_cards" USING btree ("pdf_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_featured_industries_cards_pdf_idx"
      ON "_pages_v_blocks_featured_industries_cards" USING btree ("pdf_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_featured_industries_cards" DROP CONSTRAINT IF EXISTS "pages_blocks_featured_industries_cards_pdf_id_media_id_fk";
    ALTER TABLE "_pages_v_blocks_featured_industries_cards" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_featured_industries_cards_pdf_id_media_id_fk";
    DROP INDEX IF EXISTS "pages_blocks_featured_industries_cards_pdf_idx";
    DROP INDEX IF EXISTS "_pages_v_blocks_featured_industries_cards_pdf_idx";
    ALTER TABLE "pages_blocks_featured_industries_cards" DROP COLUMN IF EXISTS "pdf_id";
    ALTER TABLE "_pages_v_blocks_featured_industries_cards" DROP COLUMN IF EXISTS "pdf_id";
    ALTER TABLE "pages_blocks_featured_industries" DROP COLUMN IF EXISTS "view_all_tag";
    ALTER TABLE "pages_blocks_featured_industries" DROP COLUMN IF EXISTS "view_all_title";
    ALTER TABLE "pages_blocks_featured_industries" DROP COLUMN IF EXISTS "view_all_description";
    ALTER TABLE "pages_blocks_featured_industries" DROP COLUMN IF EXISTS "view_all_cta_label";
    ALTER TABLE "pages_blocks_featured_industries" DROP COLUMN IF EXISTS "view_all_href";
    ALTER TABLE "_pages_v_blocks_featured_industries" DROP COLUMN IF EXISTS "view_all_tag";
    ALTER TABLE "_pages_v_blocks_featured_industries" DROP COLUMN IF EXISTS "view_all_title";
    ALTER TABLE "_pages_v_blocks_featured_industries" DROP COLUMN IF EXISTS "view_all_description";
    ALTER TABLE "_pages_v_blocks_featured_industries" DROP COLUMN IF EXISTS "view_all_cta_label";
    ALTER TABLE "_pages_v_blocks_featured_industries" DROP COLUMN IF EXISTS "view_all_href";
  `);
}
