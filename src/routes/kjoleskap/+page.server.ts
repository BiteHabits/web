import { db } from '$lib/db/drizzle';
import type { PageServerLoad } from './$types';
import { fridges } from '$lib/db/schemas/fridges';
import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const userId = locals.auth?.user.id;
	if (!userId) {
		throw redirect(308, '/');
	}

	const val = await db.select().from(fridges).where(eq(fridges.userId, userId));

	return {
		fridges: val
	};
};
