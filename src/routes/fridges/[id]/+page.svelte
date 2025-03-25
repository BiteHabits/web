<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';
	import AddProductForm from '$lib/components/AddProductForm.svelte';
	import Button from '$lib/components/Button.svelte';

	let { data } = $props();
	let { fridge, products } = $derived(data);

	let addProductVisable = $state<boolean>(false);

	function toggleAddProduct() {
		addProductVisable = !addProductVisable 
	}
</script>
<div class="flex justify-between items-center p-4">
	<h1 class="text-3xl">Products in {fridge.name}</h1>
	<Button text={addProductVisable ? 'Hide' : 'Legg til vare'} onClick={toggleAddProduct} />
</div>

{#if addProductVisable}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
		<div class="relative bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
			<button
				class="absolute top-3 right-4 text-gray-600 hover:text-black text-xl"
				onclick={toggleAddProduct}
			>
				&times;
			</button>

			<AddProductForm fridgeId={fridge.id} onSuccess={toggleAddProduct}/>
		</div>
	</div>
{/if}


<div class="grid grid-cols-3 gap-4 p-4">
	{#each products as product}
		<ProductCard {product} />
	{/each}

</div>
