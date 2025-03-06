<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let fridge_id: string;
	let products: Array<{
		product_id: string;
		name: string;
		expiry_date: string;
		quantity: number;
		fridge_id: string;
	}> = [];

	$: {
		const { data } = $page;
		fridge_id = data.fridge_id;
		products = data.products;
	}

	onMount(() => {
		console.log('Received fridge_id:', fridge_id);
		console.log('Received products:', products);
	});
</script>

<h1>Products in Fridge {fridge_id}</h1>

<ul>
	{#each products as product}
		<li>
			<strong>{product.name}</strong> - {product.quantity} units, expires on {product.expiry_date}
		</li>
	{/each}
</ul>
