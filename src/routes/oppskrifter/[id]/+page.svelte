<script lang="ts">
	type Props = {
		data: {
			recipe: {
				id: number;
				name: string;
				image: string;
				ingredients: { name: string }[];
				steps: string[];
			};
		};
	};

	let { data }: Props = $props();
	const recipe = $derived(data.recipe);
</script>

<svelte:head>
	<title>{recipe.name} - Oppskrift</title>
</svelte:head>

<main class="relative flex justify-center">
	<section
		class="absolute left-6 top-6 flex w-72 flex-col overflow-hidden rounded-xl bg-yellow-100 shadow-md"
	>
		<h2 class="border-b-4 border-yellow-200 px-4 py-3 text-lg font-semibold">Ingredienser</h2>
		<ul class="divide-y divide-gray-300">
			{#each recipe.ingredients as ingredient, i (i)}
				<li class="flex items-center gap-2 px-4 py-2">
					<input type="checkbox" id="ingredient-{i}" class="form-checkbox accent-green-500" />
					<label for="ingredient-{i}" class="cursor-pointer">{ingredient.name}</label>
				</li>
			{/each}
		</ul>
	</section>

	<section class="flex max-w-2xl flex-col items-center gap-6 py-8 text-center">
		<img src={recipe.image} alt="recipe" class="h-96 w-96 rounded-lg border object-cover" />

		<h1 class="text-2xl font-bold">{recipe.name}</h1>

		<section class="flex flex-col items-center gap-4">
			<h2 class="text-lg font-semibold">Slik gjør du det:</h2>
			<ol class="list-inside list-decimal space-y-2 px-4 text-left">
				{#each recipe.steps as step (step)}
					<li>{step}</li>
				{/each}
			</ol>
		</section>
	</section>
</main>
