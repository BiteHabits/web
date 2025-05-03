import { db } from '$lib/db/drizzle';
import { apiProducts, type ApiProductInsert } from '$lib/db/schemas';

export const create = async (product: ApiProductInsert) => {
	await db.insert(apiProducts).values(product);
};

export const findByEan = async (ean: string) => {
	return await db.query.apiProducts.findFirst({
		where: (row, { eq }) => eq(row.ean, ean)
	});
};
