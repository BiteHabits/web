import { db } from '$lib/db/drizzle';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const fridgeId = params.id;

	const fridge = await db.query.fridges.findFirst({
		where: (row, { eq }) => eq(row.id, fridgeId)
	});

	if (!fridge) {
		throw error(404, 'Fant ikke kjøleskap');
	}

	const products = await db.query.products.findMany({
		where: (fields) => eq(fields.fridgeId, fridgeId)
	});

	return {
		fridge,
		products
	};
};
