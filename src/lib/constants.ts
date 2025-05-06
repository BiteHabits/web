export const AUTH_COOKIE_NAME = '__auth';

export const allergies = [
	{ id: 'gluten', name: 'Gluten' },
	{ id: 'eggs', name: 'Egg' },
	{ id: 'seafood', name: 'Sjømat' },
	{ id: 'scallops', name: 'Skalldyr' },
	{ id: 'milk', name: 'Melk' },
	{ id: 'nuts', name: 'Nøtter' },
	{ id: 'soy', name: 'Soy' }
];

export const recipes = [
	{
		id: 1,
		name: 'Spaghetti',
		ingredients: [{ name: 'pasta' }, { name: 'tomatsaus' }, { name: 'kjøttdeig' }],
		image:
			'https://images.unsplash.com/photo-1673973444022-3d10d9d78cd0?q=80&w=3115&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		steps: ['kok pasta', 'stek kjøttdeig', 'bland alt sammen'],
		allergies: ['gluten', 'milk']
	},
	{
		id: 2,
		name: 'Pannekaker',
		ingredients: [{ name: 'mel' }, { name: 'egg' }, { name: 'melk' }],
		image:
			'https://images.unsplash.com/photo-1612182062633-9ff3b3598e96?q=80&w=3119&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		steps: ['bland alt sammen', 'stek pannekaker'],
		allergies: ['gluten', 'eggs']
	},
	{
		id: 3,
		name: 'Grønnsakssuppe',
		ingredients: [{ name: 'vann' }, { name: 'grønnsaker' }, { name: 'buljong' }],
		image:
			'https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		steps: ['kok grønnsaker', 'tilsett buljong', 'server']
	},
	{
		id: 4,
		name: 'Kyllingwok',
		ingredients: [{ name: 'kylling' }, { name: 'grønnsaker' }, { name: 'soyasaus' }],
		image:
			'https://images.unsplash.com/photo-1612182062633-9ff3b3598e96?q=80&w=3119&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		steps: ['stek kylling', 'tilsett grønnsaker', 'hell over soyasaus'],
		allergies: ['gluten', 'eggs']
	}
];
