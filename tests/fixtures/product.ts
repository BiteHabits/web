import { db } from '$lib/db/drizzle';
import { products } from '$lib/db/schemas';
import type { ProductInsert } from '$lib/db/schemas/products';
import { nanoid } from 'nanoid';

export const givenProduct = async (fridgeId?: string, product?: Partial<ProductInsert>) => {
	const productInsert = {
		id: product?.id ?? nanoid(),
		name: product?.name ?? 'Test Product',
		expiresAt: product?.expiresAt ?? Date.now(),
		quantity: product?.quantity ?? 1,
		fridgeId: fridgeId ?? 'Test-id'
	};

	await db.insert(products).values(productInsert);

	return productInsert;
};
