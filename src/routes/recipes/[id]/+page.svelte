<script lang="ts">
	export let data;
	const recipe = data.recipe;
</script>

<main class="relative flex justify-center">
	<section class="absolute left-6 top-6 flex flex-col bg-yellow-100 rounded-xl shadow-md w-72 overflow-hidden">
		<h2 class="font-semibold text-lg px-4 py-3 border-b-4 border-yellow-200">Ingredienser</h2>
		<ul class="divide-y divide-gray-300">
			{#each recipe.ingredients as ingredient}
				<li class="px-4 py-2">{ingredient.name}</li>
			{/each}
		</ul>
	</section>

	<section class="flex flex-col items-center gap-6 max-w-2xl text-center py-8">
		<img src={recipe.image} alt="recipe" class="w-96 h-96 object-cover rounded-lg border" />
		
		<h1 class="text-2xl font-bold">{recipe.name}</h1>

		<section class="flex flex-col gap-4 items-center">
			<h2 class="font-semibold text-lg">Slik gjør du det:</h2>
			<ol class="list-decimal text-left list-inside space-y-2 px-4">
				{#each recipe.steps as step}
					<li>{step}</li>
				{/each}
			</ol>
		</section>
	</section>
</main>

