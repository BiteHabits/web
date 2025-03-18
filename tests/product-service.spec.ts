import { describe, expect, it } from 'vitest';
import { givenProduct } from './fixtures/product';
import { givenUser } from './fixtures/users';
import {
	createProduct,
	deleteProduct,
	getProductById,
	getProductsFromFridge,
	updateProduct
} from '$lib/services/product.service';

describe('ProductService', () => {
	it('should return a product', async () => {
		const fridgeId = '0';
		await givenProduct(fridgeId, { id: 'Product-1', name: 'TestProduct' });

		const product = await getProductById('Product-1');

		expect(product).not.toBe(null);
		expect(product?.id).toBe('Product-1');
		expect(product?.name).toBe('TestProduct');
		expect(product?.fridgeId).toBe(fridgeId);
	});

	it('should return a product from a fridge', async () => {
		const fridgeId = '0';
		await givenProduct(fridgeId, { id: 'Product-1', name: 'TestProduct' });

		const product = await getProductsFromFridge(fridgeId);

		expect(product).not.toBe(null);
		expect(product[0].product.id).toBe('Product-1');
		expect(product[0].product.name).toBe('TestProduct');
		expect(product[0].fridgeId).toBe(fridgeId);
	});

	it('should create a product', async () => {
		const createdProduct = await createProduct('Fridge-1', {
			name: 'TestProduct',
			id: '0',
			expiresAt: Date.now(),
			quantity: 1,
			fridgeId: '0'
		});

		expect(createdProduct).not.toBeNull();
		expect(createdProduct?.quantity).toBe(1);
		expect(createdProduct?.name).toBe('TestProduct');

		const foundProduct = await getProductById(createdProduct?.id ?? 'Feil');

		expect(foundProduct).not.toBeNull();
		expect(foundProduct?.name).toBe('Product-1');
		expect(foundProduct?.fridgeId).toBe('Fridge-1');
	});

	it('should update the name of the product', async () => {
		const fridgeId = '0';
		await givenProduct(fridgeId, { id: 'Product-1', name: 'TestProduct' });

		const updatedProduct = await updateProduct('Product-1', {
			name: 'new-name',
			id: '0',
			expiresAt: Date.now(),
			quantity: 1,
			fridgeId: '0'
		});

		expect(updatedProduct).not.toBeNull();

		const foundProduct = await getProductById('Product-1');

		expect(foundProduct).not.toBeNull();
		expect(foundProduct?.name).toBe('new-name');
		expect(foundProduct?.fridgeId).toBe(fridgeId);
	});

	it('should delete a product', async () => {
		const fridgeId = '0';
		const product = await givenProduct(fridgeId, { id: 'Product-1', name: 'TestProduct' });

		const deletedProduct = await deleteProduct(product.id);

		expect(deletedProduct).not.toBeNull();

		await expect(getProductById('Product-1')).rejects.toThrow();
	});
});
