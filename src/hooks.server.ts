import { AUTH_COOKIE_NAME } from '$lib/constants';
import { db } from '$lib/db/drizzle';
import type { Handle } from '@sveltejs/kit';
import { isPast } from 'date-fns';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(AUTH_COOKIE_NAME);

	if (sessionId) {
		const session = await db.query.sessions.findFirst({
			where: (row, { eq }) => eq(row.id, sessionId)
		});

		if (!session || isPast(session.expiresAt)) {
			event.locals.auth = null;
		} else {
			const user = await db.query.users.findFirst({
				where: (row, { eq }) => eq(row.id, session.userId)
			});

			if (user) {
				event.locals.auth = {
					user,
					session
				};
			} else {
				event.locals.auth = null;
			}
		}
	} else {
		event.locals.auth = null;
	}

	return await resolve(event);
};
