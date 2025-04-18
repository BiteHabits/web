import { expect } from '@playwright/test';
import { test } from '../utils/test';
import { givenUser } from '../fixtures/users';
import { givenSession } from '../fixtures/sessions';
import { setSessionCookie } from '../utils/set-session';

test('user can register an account', async ({ page }) => {
	await page.goto('/registrer');

	await page.fill('input[name="email"]', 'hello@world.com');
	await page.fill('input[name="name"]', 'Hello World');
	await page.fill('input[name="password"]', 'password');
	await page.fill('input[name="repeatPassword"]', 'password');

	await page.getByRole('button', { name: 'Registrer' }).click();

	const header = page.locator('header');

	await expect(header).toContainText('Logg ut');
});

test("fridge is available in the user's header", async ({ page }) => {
	const user = await givenUser();
	const session = await givenSession({ userId: user.id });

	await setSessionCookie(page, session);

	await page.goto('/');

	const header = page.locator('header');

	await expect(header).toContainText('Kjøleskap');
});
