import { AUTH_COOKIE_NAME } from '$lib/constants';
import type { Handle } from '@sveltejs/kit';
import { SessionService } from '$lib/services';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(AUTH_COOKIE_NAME);

	if (sessionId) {
		const authSession = await SessionService.getValidSessionAndUser(sessionId);

		if (authSession) {
			event.locals.auth = authSession;
		} else {
			event.locals.auth = null;
		}
	} else {
		event.locals.auth = null;
	}

	return await resolve(event);
};
