import { ApiProductsService, KassalappService } from '$lib/services';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, params }) => {
	if (!locals.auth) {
		return new Response('Unauthorized', { status: 401 });
	}

	const dbProduct = await ApiProductsService.findByEan(params.ean);
	if (dbProduct) {
		return new Response(JSON.stringify(dbProduct), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	const products = await KassalappService.getProductByEan(params.ean);

	if (!products) {
		return new Response('Not Found', { status: 404 });
	}

	const product = products.data.products[0];

	if (!product) {
		return new Response('Not Found', { status: 404 });
	}

	const productToInsert = {
		ean: params.ean,
		name: product.name ?? 'Ukjent produkt',
		brand: product.brand
	};

	await ApiProductsService.create(productToInsert);

	return new Response(JSON.stringify(productToInsert), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
