import { db } from '$lib/db/drizzle';
import { fail, type Actions } from '@sveltejs/kit';
import { fridges } from '$lib/db/schemas';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const userId = locals.auth?.user.id;
		if (userId === undefined || userId === null) {
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
