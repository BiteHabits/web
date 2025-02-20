import { expect, test } from '@playwright/test';

test('user can register an account', async ({ page }) => {
	await page.goto('/registrer');

	await page.fill('input[name="email"]', 'hello@world.com');
	await page.fill('input[name="name"]', 'Hello World');
	await page.fill('input[name="password"]', 'password');

	await page.getByRole('button', { name: 'Registrer deg' }).click();

	const header = page.locator('header');

	await expect(header).toContainText('Logg ut');
});
