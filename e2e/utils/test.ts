import { test as base } from '@playwright/test';

export const test = base.extend({
	page: async ({ page }, use) => {
		await fetch('http://localhost:5173/__admin/test/migrate-db', { method: 'POST' });

		await use(page);

		await fetch('http://localhost:5173/__admin/test/reset-db', { method: 'POST' });
	}
});
