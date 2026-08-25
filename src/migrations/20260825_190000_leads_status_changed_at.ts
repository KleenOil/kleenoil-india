import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "leads"
      ADD COLUMN IF NOT EXISTS "status_changed_at" timestamp(3) with time zone;

    UPDATE "leads"
      SET "status_changed_at" = "created_at"
      WHERE "status_changed_at" IS NULL;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "leads" DROP COLUMN IF EXISTS "status_changed_at";
  `);
}
