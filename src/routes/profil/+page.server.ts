import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/db/drizzle';
import { users } from '$lib/db/schemas';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.auth) {
		redirect(302, '/logg-inn');
	}
};

export const actions: Actions = {
	updateProfile: async ({ request, locals }) => {
		const user = locals.auth?.user;

		if (!user) {
			return fail(401, {
				success: false,
				message: 'Du er ikke logget inn.'
			});
		}

		const formData = await request.formData();
		const name = formData.get('name')?.toString();
		const email = formData.get('email')?.toString();
		const allergies = formData.getAll('allergies');

		if (!name || !email) {
			return fail(400, {
				success: false,
				message: 'Alle brukere må ha navn og e-post.'
			});
		}

		const a = allergies.map((a) => {
			return a.toString();
		});

		await db
			.update(users)
			.set({
				email,
				name,
				allergies: a
			})
			.where(eq(users.id, user.id));

		return {
			success: true
		};
	}
};
