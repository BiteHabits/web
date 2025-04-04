import { describe, expect, it } from 'vitest';
import { givenProduct } from './fixtures/product';
import { givenFridge } from './fixtures/fridge';
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
		const user = await givenUser({ id: 'user-1' });
		const fridge = await givenFridge(user, { id: 'Fridge-1', name: 'TestFridge' });

		await givenProduct(fridge.id, { id: 'Product-1', name: 'TestProduct' });

		const product = await getProductById('Product-1');

		expect(product).not.toBe(null);
		expect(product?.id).toBe('Product-1');
		expect(product?.name).toBe('TestProduct');
		expect(product?.fridgeId).toBe(fridge.id);
	});

	it('should return a product from a fridge', async () => {
		const user = await givenUser({ id: 'user-1' });
		const fridge = await givenFridge(user, { id: 'Fridge-1', name: 'TestFridge' });

		await givenProduct(fridge.id, { id: 'Product-1', name: 'TestProduct' });

		const product = await getProductsFromFridge(fridge.id);

		expect(product).not.toBe(null);
		expect(product[0].id).toBe('Product-1');
		expect(product[0].name).toBe('TestProduct');
		expect(product[0].fridgeId).toBe(fridge.id);
	});

	it('should create a product', async () => {
		const user = await givenUser({ id: 'user-1' });
		const fridge = await givenFridge(user, { id: 'Fridge-1', name: 'TestFridge' });

		const createdProduct = await createProduct(fridge.id, {
			id: 'Product-1',
			name: 'TestProduct',
			expiryDate: new Date(),
			quantity: 1,
			fridgeId: fridge.id
		});

		expect(createdProduct).not.toBeNull();
		expect(createdProduct?.quantity).toBe(1);
		expect(createdProduct?.name).toBe('TestProduct');

		const foundProduct = await getProductById(createdProduct?.id ?? 'Feil');

		expect(foundProduct).not.toBeNull();
		expect(foundProduct?.name).toBe('TestProduct');
		expect(foundProduct?.fridgeId).toBe(fridge.id);
	});

	it('should update the name of the product', async () => {
		const user = await givenUser({ id: 'user-1' });
		const fridge = await givenFridge(user, { id: 'Fridge-1', name: 'TestFridge' });

		await givenProduct(fridge.id, { id: 'Product-1', name: 'TestProduct' });

		const updatedProduct = await updateProduct('Product-1', {
			name: 'new-name',
			expiryDate: new Date(Date.now()),
			quantity: 1,
			fridgeId: fridge.id
		});

		expect(updatedProduct).not.toBeNull();

		const foundProduct = await getProductById('Product-1');

		expect(foundProduct).not.toBeNull();
		expect(foundProduct?.name).toBe('new-name');
		expect(foundProduct?.fridgeId).toBe(fridge.id);
	});

	it('should delete a product', async () => {
		const user = await givenUser({ id: 'user-1' });
		const fridge = await givenFridge(user, { id: 'Fridge-1', name: 'TestFridge' });

		const product = await givenProduct(fridge.id, { id: 'Product-1', name: 'TestProduct' });

		const deletedProduct = await deleteProduct(product.id);

		expect(deletedProduct).not.toBeNull();

		const foundProduct = await getProductById(product.id);
		expect(foundProduct).toBeNull();
	});
});
