import { db } from '$lib/db/drizzle';
import { isPast } from 'date-fns';
import { eq } from 'drizzle-orm';
import { products } from '$lib/db/schemas';
import { nanoid } from 'nanoid';
import { type ProductInsert } from '$lib/db/schemas/products';


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

export const deleteProduct = async (productId: string) => {
	const deletedProduct = await db.delete(products).where(eq(products.id, productId));
	return deletedProduct;
};

export const updateProduct = async (productId: string, product: ProductInsert) => {
	if (!product) {
		return null
	}

	const updatedProduct = await db.update(products).set({
		name: product.name,
		expiresAt: product.expiresAt,
		quantity: product.quantity,
		fridgeId: product.fridgeId,
	})
	.where(eq(products.id, productId))
	.returning();

	return updatedProduct;
};

export const createProduct = async (fridgeId: string, product: ProductInsert) => {

	if (!product) {
		return null
	}

	const new_Product = await db.insert(products).values({
		id: product.id ?? nanoid(),
        name: product.name,
		expiresAt: product.expiresAt,
		quantity: product.quantity,
        fridgeId: fridgeId,
    });

	return new_Product;
};