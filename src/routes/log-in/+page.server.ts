import { verify } from '$lib/auth/hash.js';
import { AUTH_COOKIE_NAME } from '$lib/constants.js';
import { db } from '$lib/db/drizzle.js';
import { sessions } from '$lib/db/schemas/sessions.js';
import { nanoid } from 'nanoid';
import { addDays } from 'date-fns';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const user = await db.query.users.findFirst({
			where: (row, { eq }) => eq(row.email, email),
			with: {
				password: true
			}
		});

		if (!user || !user.password || !verify(password, user.password.hash)) {
			return fail(400, {
				success: false,
				message: 'E-post eller passord er feil'
			});
		}

		const sessionId = nanoid();
		const expiresAt = addDays(new Date(), 14);

		await db.insert(sessions).values({
			id: sessionId,
			userId: user.id,
			expiresAt
		});

		cookies.set(AUTH_COOKIE_NAME, sessionId, {
			path: '/',
			expires: expiresAt
		});

		redirect(302, "/fridges")
	}
};
