<script lang="ts">
	import { Plus } from '@lucide/svelte';

	let { data } = $props();

	let fridges = $derived(data.fridges);
</script>

<svelte:head>
	<title>Kjøleskap</title>
</svelte:head>

<div class="mx-auto max-w-xl p-5">
	{#if fridges.length === 0}
		<p class="mb-8 text-center text-xl font-medium">
			Du har ingen kjøpeskap ennå. Opprett ditt første!
		</p>

		<a
			href="/kjoleskap/ny"
			class="flex h-14 items-center justify-center gap-2 rounded border-2 border-gray-500 bg-gray-100 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-200"
		>
			<Plus />
			Opprett nytt kjøleskap
		</a>
	{:else}
		<h1 class="mb-8 text-4xl font-light">Dine kjøleskap</h1>

		<a
			href="/kjoleskap/ny"
			class="flex h-14 items-center justify-center gap-2 rounded border-2 border-gray-500 bg-gray-100 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-200"
		>
			<Plus />
			Opprett nytt kjøleskap
		</a>

		<div>
			{#if fridges === undefined || fridges.length === 0}
				<p>Du har ingen kjøleskap ennå. Opprett ditt første!</p>
			{:else}
				<h2 class="mb-3 text-lg font-semibold">Dine kjøleskap:</h2>
				<ul class="space-y-3">
					{#each fridges as fridge (fridge.id)}
						<li class="rounded bg-gray-100">
							<a
								class="block h-full w-full rounded p-4 hover:bg-slate-50"
								href="/kjoleskap/{fridge.id}"
							>
								{fridge.name}
							</a>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/if}
</div>
