// +page.server.ts
import type { PageServerLoad } from './$types';

const recipes = [
	{
		name: 'spagetti',
		image:
			'https://images.unsplash.com/photo-1673973444022-3d10d9d78cd0?q=80&w=3115&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		ingredients: [{ name: 'pasta' }, { name: 'tomatsaus' }, { name: 'kjøttdeig' }],
		steps: ['kok pasta', 'stek kjøttdeig', 'bland alt sammen']
	},
	{
		name: 'pannekaker',
		image:
			'https://images.unsplash.com/photo-1612182062633-9ff3b3598e96?q=80&w=3119&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		ingredients: [{ name: 'mel' }, { name: 'egg' }, { name: 'melk' }],
		steps: ['bland alt sammen', 'stek pannekaker']
	},
	{
		name: 'grønnsakssuppe',
		image:
			'https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		ingredients: [{ name: 'vann' }, { name: 'grønnsaker' }, { name: 'buljong' }],
		steps: ['kok grønnsaker', 'tilsett buljong', 'server']
	}
];

export const load: PageServerLoad = async ({ params }) => {
	const recipe = recipes.find((r) => r.name.toLowerCase() === params.id.toLowerCase());

	if (!recipe) {
		throw new Error('Recipe not found');
	}

	return {
		recipe
	};
};
