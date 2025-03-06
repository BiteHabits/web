import { db } from '$lib/db/drizzle';
import { eq } from 'drizzle-orm';
import type { Actions } from '@sveltejs/kit';
import { fridges } from '$lib/db/schemas';
import { AUTH_COOKIE_NAME } from '$lib/constants';

export async function getUserFromCookies(cookies: Record<string, any>) {
	const sessionId = cookies.get(AUTH_COOKIE_NAME);
	if (!sessionId) return null;

	const session = await db.query.sessions.findFirst({
		where: (fields) => eq(fields.id, sessionId)
	});

	if (!session || session.expiresAt < new Date()) return null;

	return session.userId;
}

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const userId = await getUserFromCookies(cookies);
		if (!userId) {
			return {
				succses: false,
				error: 'You must be logged in to craete a fridge.'
			};
		}

		const formData = await request.formData();
		const name = formData.get('name') as string;

		if (!name) {
			return {
				success: false,
				error: 'Name is required'
			};
		}

		await db.insert(fridges).values({
			name: name
		});

		return {
			success: true
		};
	}
};
