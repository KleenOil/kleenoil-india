import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "case_studies" ADD COLUMN IF NOT EXISTS "pdf_id" integer;

    DO $$ BEGIN
      ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_pdf_id_media_id_fk"
        FOREIGN KEY ("pdf_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE INDEX IF NOT EXISTS "case_studies_pdf_idx" ON "case_studies" USING btree ("pdf_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "case_studies" DROP CONSTRAINT IF EXISTS "case_studies_pdf_id_media_id_fk";
    DROP INDEX IF EXISTS "case_studies_pdf_idx";
    ALTER TABLE "case_studies" DROP COLUMN IF EXISTS "pdf_id";
  `);
}
