<script lang="ts">
	let { data } = $props();
	let fridges = $derived(data.fridges);
</script>

<div class="mx-auto max-w-xl p-5">
	<a
		href="/fridges/new"
		class="mb-5 inline-block rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
	>
		Opprett nytt kjøleskap
	</a>

	<div>
		{#if fridges === undefined || fridges.length === 0}
			<p>Du har ingen kjøleskap ennå. Opprett ditt første!</p>
		{:else}
			<h2 class="mb-3 text-lg font-semibold">Dine kjøleskap:</h2>
			<ul class="space-y-3">
				{#each fridges as fridge}
					<li class="rounded bg-gray-100">
						<a
							class="block h-full w-full rounded p-4 hover:bg-slate-50"
							href="/fridges/{fridge.id}"
						>
							{fridge.name}
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
