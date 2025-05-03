import { expect } from '@playwright/test';
import { test } from '../utils/test';
import { givenUser } from '../fixtures/users';
import { givenSession } from '../fixtures/sessions';
import { setSessionCookie } from '../utils/set-session';

test('user can create fridge', async ({ page }) => {
	const user = await givenUser();
	const session = await givenSession({ userId: user.id });

	await setSessionCookie(page, session);

	await page.goto('/');

	const header = page.locator('header');
	await expect(header).toContainText('Kjøleskap');
	await header.getByRole('link', { name: 'Kjøleskap' }).click();

	await page.waitForURL('/kjoleskap');

	await expect(page.locator('p')).toContainText('Du har ingen kjøleskap ennå.');

	await page.locator('a', { hasText: 'Opprett nytt kjøleskap' }).click();

	await page.locator("input[name='name']").fill('Foobar');
	await page.locator('button', { hasText: 'Opprett kjøleskap' }).click();

	await page.waitForURL('/kjoleskap');

	await expect(page.locator('ul').locator('li').first()).toContainText('Foobar');
});
