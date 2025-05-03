import { db } from '$lib/db/drizzle';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const userId = locals.auth?.user.id;
	if (!userId) {
		throw redirect(308, '/');
	}

	const fridges = await db.query.fridges.findMany({
		where: (row, { eq }) => eq(row.userId, userId)
	});

	const sharedFridges = await db.query.fridgeUsers
		.findMany({
			where: (row, { eq }) => eq(row.user_id, userId),
			with: {
				fridge: true
			}
		})
		.then((result) => result.filter((item) => item.fridge && item.fridge.userId !== userId));

	const allFridges = [...fridges, ...sharedFridges.map((item) => item.fridge)];

	return {
		fridges: allFridges
	};
};
