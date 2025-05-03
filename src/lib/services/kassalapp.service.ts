import { env } from '$env/dynamic/private';

export const getProductByEan = async (ean: string) => {
	return fetch(`https://kassal.app/api/v1/products/ean/${ean}`, {
		headers: {
			Authorization: `Bearer ${env.KASSALAPP_API_KEY}`
		}
	})
		.then((response) => {
			return response.json() as Promise<
				| {
						data: {
							ean: string;
							products: Array<{
								id: string;
								name: string | null;
								vendor: string | null;
								brand: string | null;
							}>;
						};
				  }
				| {
						message: string;
				  }
			>;
		})
		.then((json) => {
			if ('message' in json) {
				return null;
			}

			return json;
		});
};
