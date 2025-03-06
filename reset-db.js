import { db } from "$lib/db/drizzle";

async function resetDatabase() {
  // Drop all tables in the correct order to avoid foreign key constraints
  await db.transaction(async (tx) => {
    // Option 1: If using PostgreSQL
    await tx.execute(`
      DO $$ 
      DECLARE
        r RECORD;
      BEGIN
        FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
          EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
        END LOOP;
      END $$;
    `)

    // Option 2: If using SQLite
    await tx.execute('PRAGMA foreign_keys = OFF')
    const tables = await tx.all('SELECT name FROM sqlite_master WHERE type="table"')
    for (const table of tables) {
        await tx.execute(`DROP TABLE IF EXISTS ${table.name}`)
    }
    await tx.execute('PRAGMA foreign_keys = ON')

    // Usage
})
}

resetDatabase()
