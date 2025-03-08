import { db } from '$lib/db/drizzle';
import type { PageServerLoad } from './$types';
import { fridges } from '$lib/db/schemas/fridges';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	const userId = locals.auth?.user.id;
	if (userId === undefined || userId === null) {
		return {
			fridges: []
		};
	}

	const val = await db.select().from(fridges).where(eq(fridges.userId, userId));

	return {
		fridges: val
	};
};
