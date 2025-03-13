import { expect } from '@playwright/test';
import { test } from '../utils/test';

test('home page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('h1')).toBeVisible();
});
