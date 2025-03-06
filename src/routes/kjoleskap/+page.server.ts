import { db } from '$lib/db/drizzle';
import { AUTH_COOKIE_NAME } from '$lib/constants';
import type { PageServerLoad } from './$types';
import { fridges } from '$lib/db/schemas/fridges';
import { eq } from 'drizzle-orm';

interface Cookies {
	get(name: string): string | undefined;
}

async function getUserFromCookies(cookies: Cookies): Promise<string | null> {
	const sessionId = cookies.get(AUTH_COOKIE_NAME);
	if (!sessionId) return null;

	const session = await db.query.sessions.findFirst({
		where: (fields) => eq(fields.id, sessionId)
	});

	if (!session || session.expiresAt < new Date()) return null;

	return session.userId;
}

export const load: PageServerLoad = async ({ cookies }) => {
	const userId = await getUserFromCookies(cookies);
	if (userId === null) {
		return {
			fridges: []
		};
	}

	const val = await db.select().from(fridges).where(eq(fridges.userId, userId));

	return {
		fridges: val
	};
};
