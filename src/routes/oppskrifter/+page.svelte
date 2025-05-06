<script>
	import slugify from '$lib/utils/slugify';
	import { recipes } from '$lib/constants';
	import { getUser } from '$lib/context/user-context';

	let user = getUser();
</script>

<svelte:head>
	<title>Oppskrifter</title>
</svelte:head>

<main class="flex flex-col items-center gap-4">
	<ul class="flex flex-col items-center gap-2">
		{#each recipes as recipe (recipe.id)}
			{@const hasAllergies =
				Array.isArray($user?.allergies) &&
				Array.isArray(recipe.allergies) &&
				recipe.allergies.some((allergy) => $user.allergies?.includes(allergy))}

			{#if !hasAllergies}
				<li class="w-64 rounded-lg border-2 border-gray-700 p-3 text-center hover:bg-green-200">
					<a href="/oppskrifter/{slugify(recipe.name)}">{recipe.name}</a>
				</li>
			{/if}
		{/each}
	</ul>
</main>
