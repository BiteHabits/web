<script>
	import slugify from '$lib/utils/slugify';

	let recipes = [
		{
			id: 1,
			name: 'Spaghetti',
			ingredients: [{ name: 'pasta' }, { name: 'tomatsaus' }, { name: 'kjøttdeig' }],
			steps: ['kok pasta', 'stek kjøttdeig', 'bland alt sammen']
		},
		{
			id: 2,
			name: 'Pannekaker',
			ingredients: [{ name: 'mel' }, { name: 'egg' }, { name: 'melk' }],
			steps: ['bland alt sammen', 'stek pannekaker']
		},
		{
			id: 3,
			name: 'Grønnsakssuppe',
			ingredients: [{ name: 'vann' }, { name: 'grønnsaker' }, { name: 'buljong' }],
			steps: ['kok grønnsaker', 'tilsett buljong', 'server']
		}
	];
</script>

{#if recipes}
	<main class="flex flex-col items-center gap-4">
		<ul class="flex flex-col items-center gap-2">
			{#each recipes as recipe (recipe.id)}
				<li class="w-64 rounded-lg border-2 border-gray-700 p-3 text-center hover:bg-green-200">
					<a href="/oppskrifter/{slugify(recipe.name)}">{recipe.name}</a>
				</li>
			{/each}
		</ul>
	</main>
{:else}
	<p class="text-center">Ingen oppskrifter tilgjengelig.</p>
{/if}
