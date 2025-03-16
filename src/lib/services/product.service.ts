import { db } from '$lib/db/drizzle';
import { isPast } from 'date-fns';
import { eq } from 'drizzle-orm';

export const getProducts = async (productId: string) => {
	const product = await db.query.product.findFirst({
		where: (row, { eq }) => eq(row.id, productId)
	});

	if (!product) {
		return null;
	}

	if (product.expiresAt && isPast(product.expiresAt)) {
		await db.delete(product).where(eq(product.id, product.id));
		return null;
	}

	if (product.quantity <= 0) {
		return null;
	}

	return product;
};
