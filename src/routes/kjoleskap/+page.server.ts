import { db } from '$lib/db/drizzle';
import type { PageServerLoad } from './$types';
import { fail, type Actions } from '@sveltejs/kit';
import { fridges, fridgeUsers } from '$lib/db/schemas';
import { eq, and, ne } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const userId = locals.auth?.user.id;
	if (!userId) {
		throw redirect(308, '/');
	}

	const ownedFridges = await db.select().from(fridges).where(eq(fridges.userId, userId));

	const sharedFridges = await db
		.select()
		.from(fridges)
		.innerJoin(fridgeUsers, eq(fridges.id, fridgeUsers.fridge_id))
		.where(and(eq(fridgeUsers.user_id, userId), ne(fridges.userId, userId)));

	const allFridges = [...ownedFridges, ...sharedFridges.map((item) => item.fridge)];

	return {
		fridges: allFridges
	};
};

export const actions: Actions = {
	shareFridge: async ({ request, locals }) => {
		const userId = locals.auth?.user.id;
		if (!userId) {
			return fail(401, {
				success: false,
				error: 'You must be logged in to share a fridge'
			});
		}

		const formData = await request.formData();
		const fridgeId = formData.get('fridge_id') as string;
		const email = formData.get('email') as string;

		if (!fridgeId || !email) {
			return fail(400, {
				success: false,
				error: 'Fridge ID and email are required'
			});
		}

		const targetUser = await db.query.users.findFirst({
			where: (fields) => eq(fields.email, email)
		});

		if (!targetUser) {
			return fail(404, {
				success: false,
				error: 'No user found with that email'
			});
		}

		await db.insert(fridgeUsers).values({
			fridge_id: fridgeId,
			user_id: targetUser.id
		});

		return {
			success: true,
			message: `Fridge shared successfully with ${email}`
		};
	}
};
