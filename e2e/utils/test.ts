import { test as base } from '@playwright/test';
import { reset } from 'drizzle-seed';
import * as schema from '../../src/lib/db/schemas';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { getDb } from '../utils/get-db';

export const test = base.extend({
	page: async ({ page }, use) => {
		// Apply migrations
		const db = getDb();

		await migrate(db, { migrationsFolder: './drizzle' });

		await use(page);

		// Reset database
		// @ts-expect-error Bla
		await reset(db, schema);
	}
});
