import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "jobs" ADD COLUMN IF NOT EXISTS "details" jsonb;
    ALTER TABLE "jobs" DROP COLUMN IF EXISTS "about_the_role";
    ALTER TABLE "jobs" DROP COLUMN IF EXISTS "what_you_will_do";
    ALTER TABLE "jobs" DROP COLUMN IF EXISTS "what_you_bring";
    ALTER TABLE "jobs" DROP COLUMN IF EXISTS "what_we_offer";
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "jobs" ADD COLUMN IF NOT EXISTS "about_the_role" varchar;
    ALTER TABLE "jobs" ADD COLUMN IF NOT EXISTS "what_you_will_do" varchar;
    ALTER TABLE "jobs" ADD COLUMN IF NOT EXISTS "what_you_bring" varchar;
    ALTER TABLE "jobs" ADD COLUMN IF NOT EXISTS "what_we_offer" varchar;
    ALTER TABLE "jobs" DROP COLUMN IF EXISTS "details";
  `);
}
