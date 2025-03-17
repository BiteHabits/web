import { afterAll, beforeEach, afterEach, vi } from 'vitest';
import { db } from './src/lib/db/drizzle';
import { applyMigrations } from './src/lib/db/migrate';
import { reset } from 'drizzle-seed';

vi.mock('./src/lib/db/drizzle', async () => {
	const { createClient } = await import('@libsql/client');
	const { drizzle } = await import('drizzle-orm/libsql');
	const schema = await import('./src/lib/db/schemas');
    console.log("Loaded schema: ", schema)

	const client = createClient({ url: ':memory:' });
	const db = drizzle(client, { schema, casing: 'snake_case' });

	return {
		client,
		db
	};
});

beforeEach(async () => {
	await applyMigrations();
});

afterEach(async () => {
	const schema = await import('./src/lib/db/schemas');

	// @ts-expect-error Bla
	await reset(db, schema);
});

afterAll(() => {
	db.$client.close();
});
