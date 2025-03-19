import { db } from '$lib/db/drizzle';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { products } from '$lib/db/schemas';

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

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		const user = locals.auth?.user;
		if (!user) {
			return {
				success: false,
				error: 'You must be logged in to add a product.'
			};
		}

		const formData = await request.formData();
		const name = formData.get('name') as string | null;
		const expiryDate = formData.get('expiry_date') as string | null;
		const quantity = formData.get('quantity') as string | null;

		if (!name || !expiryDate || !quantity) {
			return {
				success: false,
				error: 'Invalid input'
			};
		}

		const quantityNumber = parseInt(quantity, 10);
		if (isNaN(quantityNumber)) {
			return {
				success: false,
				error: 'Quantity must be a number'
			};
		}

		await db.insert(products).values({
			name,
			expiresAt: expiryDate,
			quantity: quantityNumber,
			fridgeId: params.id
		});

		return {
			success: true
		};
	}
};
