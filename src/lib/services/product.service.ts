import { db } from '$lib/db/drizzle';
import { eq } from 'drizzle-orm';
import { products } from '$lib/db/schemas';
import { nanoid } from 'nanoid';
import { type ProductInsert } from '$lib/db/schemas/products';

export const getProductById = async (productId: string) => {
	const product = await db.query.products.findFirst({
		where: (row, { eq }) => eq(row.id, productId),
		with: {
			fridge: true
		}
	});

	if (!product) {
		return null;
	}

	return product;
};

export const getProductsFromFridge = async (fridgeId: string) => {
	const productsFromFridge = await db.query.products.findMany({
		where: (row, { eq }) => eq(row.fridgeId, fridgeId),
		with: {
			fridge: true
		}
	});

	return productsFromFridge;
};

export const deleteProduct = async (productId: string) => {
	const deletedProduct = await db.delete(products).where(eq(products.id, productId));
	return deletedProduct;
};

export const updateProduct = async (productId: string, product: ProductInsert) => {
	if (!product) {
		return null;
	}

	const updatedProduct = await db
		.update(products)
		.set({
			name: product.name,
			expiryDate: product.expiryDate,
			quantity: product.quantity,
			fridgeId: product.fridgeId
		})
		.where(eq(products.id, productId))
		.returning();

	return updatedProduct;
};

export const createProduct = async (fridgeId: string, product: ProductInsert) => {
	const [newProduct] = await db
		.insert(products)
		.values({
			id: product.id ?? nanoid(),
			name: product.name,
			expiryDate: product.expiryDate,
			quantity: product.quantity,
			fridgeId
		})
		.returning();

	return newProduct;
};
