<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';
	import AddProductForm from '$lib/components/AddProductForm.svelte';
	import Button from '$lib/components/Button.svelte';
	import ShareFridgeForm from '$lib/components/ShareFridgeForm.svelte';
	import Modal from '$lib/components/Modal.svelte';

	let { data } = $props();
	let { fridge, products } = $derived(data);

	let addProductVisable = $state<boolean>(false);

	function toggleAddProduct() {
		addProductVisable = !addProductVisable;
	}

	let activeSharingFridgeId = $state<string | null>(null);

	function toggleShareForm(fridgeId: string) {
		activeSharingFridgeId = activeSharingFridgeId === fridgeId ? null : fridgeId;
	}
</script>

<div class="flex items-center justify-between p-4">
	<h1 class="text-3xl">Kjøleskap {fridge.name}</h1>
	<div class="flex flex-col gap-4">
		<Button text="Del" onClick={() => toggleShareForm(fridge.id)} />
		<Button text="Legg til vare" onClick={toggleAddProduct} />
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

<div class="grid grid-cols-3 gap-4 p-4">
	{#each products as product (product.id)}
		<ProductCard {product} />
	{/each}
</div>
