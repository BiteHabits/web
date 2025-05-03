<script lang="ts">
	import ProductRow from '$lib/components/ProductRow.svelte';
	import AddProductForm from '$lib/components/AddProductForm.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import ShareFridgeForm from '$lib/components/ShareFridgeForm.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { Share, Plus } from '@lucide/svelte';

	let { data } = $props();
	let { fridge, products } = $derived(data);

	let addProductVisable = $state(false);

	function toggleAddProduct() {
		addProductVisable = !addProductVisable;
	}

	let activeSharingFridgeId = $state<string | null>(null);

	function toggleShareForm(fridgeId: string) {
		activeSharingFridgeId = activeSharingFridgeId === fridgeId ? null : fridgeId;
	}
</script>

<svelte:head>
	<title>{fridge.name} - Kjøleskap</title>
</svelte:head>

<div class="mx-auto flex max-w-2xl flex-col px-4">
	<div class="mb-8 flex items-center justify-between">
		<h1 class="text-4xl font-light">{fridge.name}</h1>

		<div class="flex items-center gap-4">
			<Button class="size-10" onclick={() => toggleShareForm(fridge.id)}
				><Share class="size-4" /></Button
			>
			<Button class="size-10" onclick={toggleAddProduct}><Plus class="size-4" /></Button>
		</div>
	</div>

	{#if addProductVisable}
		<Modal showModal={() => toggleAddProduct()}>
			<AddProductForm />
		</Modal>
	{/if}

	{#if activeSharingFridgeId === fridge.id}
		<Modal showModal={() => toggleShareForm(fridge.id)}>
			<ShareFridgeForm />
		</Modal>
	{/if}

	{#if products === undefined || products.length === 0}
		<p class="flex h-full w-full justify-center p-4">
			Du har ingen produkter i dette kjøleskapet ennå. Legg til ditt første!
		</p>
	{/if}

	<div class="flex flex-col">
		{#each products as product (product.id)}
			<ProductRow {product} />
		{/each}
	</div>
</div>
