<script lang="ts">
	import ShareFridgeForm from '$lib/components/ShareFridgeForm.svelte';

	let { data } = $props();
	let fridges = $derived(data.fridges);

	// Track which fridge's share form is currently visible (null means none are visible)
	let activeSharingFridgeId = $state<string | null>(null);

	// Toggle share form visibility
	function toggleShareForm(fridgeId: string) {
		activeSharingFridgeId = activeSharingFridgeId === fridgeId ? null : fridgeId;
	}
</script>

<div class="container">
	<!-- Navigation to Create Fridge -->
	<a href="/kjoleskap/ny" class="create-fridge-button"> Opprett nytt kjøleskap </a>

	<!-- Fridges List -->
	<div class="fridges-list">
		{#if fridges === undefined || fridges.length === 0}
			<p>Du har ingen kjøleskap ennå. Opprett ditt første!</p>
		{:else}
			<h2>Dine kjøleskap:</h2>
			<ul>
				{#each fridges as fridge}
					<li>
						<div class="fridge-item">
							<div class="fridge-header">
								<span class="fridge-name">{fridge.name}</span>
								<div class="fridge-actions">
									<button class="share-button" onclick={() => toggleShareForm(fridge.id)}>
										{activeSharingFridgeId === fridge.id ? 'Skjul deling' : 'Del'}
									</button>
								</div>
							</div>

							{#if activeSharingFridgeId === fridge.id}
								<div class="share-form-container">
									<ShareFridgeForm fridge_id={fridge.id} />
								</div>
							{/if}
						</div>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>

<style>
	.container {
		max-width: 600px;
		margin: 0 auto;
		padding: 20px;
	}

	.create-fridge-button {
		display: inline-block;
		padding: 10px 15px;
		background-color: #4caf50;
		color: white;
		text-decoration: none;
		border-radius: 4px;
		margin-bottom: 20px;
	}

	.create-fridge-button:hover {
		background-color: #45a049;
	}

	.fridges-list ul {
		list-style-type: none;
		padding: 0;
	}

	.fridges-list li {
		background-color: #f1f1f1;
		margin: 10px 0;
		padding: 15px;
		border-radius: 4px;
	}

	.fridge-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}

	.fridge-actions {
		display: flex;
		gap: 10px;
	}

	.share-button {
		background-color: #4caf50;
		color: white;
		padding: 5px 10px;
		border-radius: 4px;
		font-size: 0.9em;
	}

	.share-button:hover {
		background-color: #45a049;
	}
</style>
