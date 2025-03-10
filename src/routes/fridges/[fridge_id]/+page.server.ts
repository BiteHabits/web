import { db } from '$lib/db/drizzle';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const fridgeId = params.fridge_id;

	const products = await db.query.products.findMany({
		where: (fields) => eq(fields.fridgeId, fridgeId)
	});


	return {
		fridgeId,
		products
	};
};
