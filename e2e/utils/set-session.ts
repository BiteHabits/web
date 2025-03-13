import { Page } from '@playwright/test';
import { Session } from '../../src/lib/db/schemas';

export const setSessionCookie = async (page: Page, session: Session) => {
	await page.context().addCookies([
		{
			name: '__auth',
			value: session.id,
			expires: session.expiresAt.getTime() / 1000,
			secure: false,
			httpOnly: true,
			domain: 'localhost',
			path: '/'
		}
	]);
};
