<script lang="ts">
	let { data } = $props();
	let fridges = $derived(data.fridges);
</script>

<div class="max-w-xl mx-auto p-5">
	<a
		href="/fridges/new"
		class="inline-block mb-5 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
	>
		Opprett nytt kjøleskap
	</a>

	<div>
		{#if fridges === undefined || fridges.length === 0}
			<p>Du har ingen kjøleskap ennå. Opprett ditt første!</p>
		{:else}
			<h2 class="text-lg font-semibold mb-3">Dine kjøleskap:</h2>
			<ul class="space-y-3">
				{#each fridges as fridge}
					<li class="bg-gray-100 rounded">
						<a class="w-full h-full hover:bg-slate-50 p-4 block rounded" href="/fridges/{fridge.id}">
							{fridge.name}
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
