import { db } from '$lib/db/drizzle';
import type { Actions } from '@sveltejs/kit';
import { products } from '$lib/db/schemas';

export const actions: Actions = {
	default: async ({ request, locals }) => {
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
		const fridgeId = formData.get('fridge_id') as string | null;

		if (!name || !expiryDate || !quantity || !fridgeId) {
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
			fridgeId: fridgeId
		});

		return {
			success: true
		};
	}
};
