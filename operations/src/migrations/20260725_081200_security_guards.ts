import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE OR REPLACE FUNCTION "public"."prevent_last_active_super_admin"()
    RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
      IF (TG_OP = 'DELETE' AND OLD."role" = 'super_admin' AND OLD."status" = 'active')
        OR (TG_OP = 'UPDATE' AND OLD."role" = 'super_admin' AND OLD."status" = 'active'
          AND (NEW."role" <> 'super_admin' OR NEW."status" <> 'active')) THEN
        PERFORM pg_advisory_xact_lock(41041);
        IF (SELECT count(*) FROM "users" WHERE "role" = 'super_admin' AND "status" = 'active') <= 1 THEN
          RAISE EXCEPTION 'cannot remove or disable the last active super_admin';
        END IF;
      END IF;
      IF TG_OP = 'DELETE' THEN RETURN OLD; END IF;
      RETURN NEW;
    END;
    $$;

    CREATE TRIGGER "users_prevent_last_active_super_admin"
    BEFORE UPDATE OR DELETE ON "users"
    FOR EACH ROW EXECUTE FUNCTION "public"."prevent_last_active_super_admin"();
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TRIGGER IF EXISTS "users_prevent_last_active_super_admin" ON "users";
    DROP FUNCTION IF EXISTS "public"."prevent_last_active_super_admin"();
  `)
}
