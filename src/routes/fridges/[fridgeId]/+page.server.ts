import { db } from '$lib/db/drizzle';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const fridgeId = params.fridgeId;

	const products = await db.query.products.findMany({
		where: (fields) => eq(fields.fridgeId, fridgeId)
	});

	console.log('Fetched products:', products); // log the fetched products

	return {
		fridgeId,
		products
	};
};
