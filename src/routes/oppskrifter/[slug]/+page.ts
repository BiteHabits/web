import { recipes } from '$lib/constants';
import slugify from '$lib/utils/slugify';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const recipe = recipes.find((r) => slugify(r.name) === params.slug);

	if (!recipe) {
		throw new Error('Recipe not found');
	}

	return {
		recipe
	};
};
