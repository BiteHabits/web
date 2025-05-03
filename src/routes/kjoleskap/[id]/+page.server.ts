import { db } from '$lib/db/drizzle';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { error, fail } from '@sveltejs/kit';
import { products } from '$lib/db/schemas';
import { fridgeUsers } from '$lib/db/schemas';

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
	addProduct: async ({ request, locals, params }) => {
		const user = locals.auth?.user;
		if (!user) {
			return {
				success: false,
				error: 'You must be logged in to add a product.'
			};
		}

		const formData = await request.formData();
		const name = formData.get('name') as string | null;
		const expiryDateString = formData.get('expiry_date') as string | null;
		const expiryDate = expiryDateString ? new Date(expiryDateString) : null;
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
			expiryDate: expiryDate,
			quantity: quantityNumber,
			fridgeId: params.id
		});

		return {
			success: true
		};
	},
	shareFridge: async ({ request, locals, params }) => {
		const userId = locals.auth?.user.id;
		if (!userId) {
			return fail(401, {
				success: false,
				error: 'You must be logged in to share a fridge'
			});
		}

		const formData = await request.formData();
		const fridgeId = params.id;
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
