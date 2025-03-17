import { db } from '$lib/db/drizzle';
import { isPast } from 'date-fns';
import { eq } from 'drizzle-orm';
import { products } from '$lib/db/schemas';

export const getProduct = async (productId: string) => {
	const product = await db.query.products.findFirst({
		where: (row, { eq }) => eq(row.id, productId),
		with: {
			fridgeId: true
		}
	});

	if (!product) {
		return null;
	}

	if (product.expiresAt && isPast(product.expiresAt)) {
		await db.delete(products).where(eq(products.id, productId));
		return null;
	}

	if (product.quantity <= 0) {
		return null;
	}

	const { fridgeId, ...productWithoutFridgeId } = product;

	return {
		fridgeId,
		product: productWithoutFridgeId
	};
};

export const getProductsFromFridge = async (fridgeId: string) => {
	const productsFromFridge = await db.query.products.findMany({
		where: (row, { eq }) => eq(row.fridgeId, fridgeId),
		with: {
			fridgeId: true
		}
	});

	const filteredProducts = productsFromFridge
		.filter((product) => {
			if (product.expiresAt && isPast(product.expiresAt)) {
				db.delete(products).where(eq(products.id, product.id));
				return false;
			}

			if (product.quantity <= 0) {
				return false;
			}

			return true;
		})
		.map(({ fridgeId, ...product }) => ({
			fridgeId,
			product
		}));

	return filteredProducts;
};
