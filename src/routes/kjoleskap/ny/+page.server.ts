import { db } from '$lib/db/drizzle';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { fridges, fridgeUsers } from '$lib/db/schemas';
import { nanoid } from 'nanoid';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const userId = locals.auth?.user.id;
		if (!userId) {
			return fail(401, {
				success: false,
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
			const fridgeId = nanoid();

			await db.insert(fridges).values({
				id: fridgeId,
				name,
				userId
			});

			await db.insert(fridgeUsers).values({
				fridge_id: fridgeId,
				user_id: userId
			});
		} catch {
			return fail(500, {
				error: 'Kunne ikkje opprette kjøleskap'
			});
		}

		throw redirect(303, '/kjoleskap');
	}
};
