import { db } from '$lib/db/drizzle';
import { eq } from 'drizzle-orm';
import { fail, type Actions } from '@sveltejs/kit';
import { fridges } from '$lib/db/schemas';
import { AUTH_COOKIE_NAME } from '$lib/constants';

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

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const userId = await getUserFromCookies(cookies);
		if (!userId) {
			return fail(401, {
				succses: false,
				error: 'You must be logged in to create a fridge.'
			});
		}

		const formData = await request.formData();
		const name = formData.get('name') as string;

		if (!name) {
			return fail(400, {
				success: false,
				error: 'Name is required'
			});
		}

		try {
			await db.insert(fridges).values({
				name: name,
				userId: userId
			});
		} catch (error) {
			console.error('Fridge creation error:', error);
			return fail(500, {
				error: 'Kunne ikkje opprette kjoleskap'
			});
		}
	}
};
