import { hash } from '$lib/auth/hash';
import { AUTH_COOKIE_NAME } from '$lib/constants.js';
import { db } from '$lib/db/drizzle.js';
import { sessions } from '$lib/db/schemas';
import { passwords } from '$lib/db/schemas/passwords.js';
import { users } from '$lib/db/schemas/users.js';
import { nanoid } from 'nanoid';
import { addDays } from 'date-fns';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();

		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const userId = nanoid();

		await db.insert(users).values({
			id: userId,
			email: email,
			name: name
		});

		const hashedPassword = hash(password);

		await db.insert(passwords).values({
			userId: userId,
			hash: hashedPassword
		});

		const sessionId = nanoid();
		const expiresAt = addDays(new Date(), 7);

		await db.insert(sessions).values({
			id: sessionId,
			userId: userId,
			expiresAt
		});

		cookies.set(AUTH_COOKIE_NAME, sessionId, {
			path: '/',
			expires: expiresAt
		});

		redirect(302, '/fridges');
	}
};
