<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let { data } = $props();
	let { fridge_id, products } = $derived(data);
</script>

<h1>Products in Fridge {fridge_id}</h1>

<ul>
	{#each products as product}
		<li>
			<strong>{product.name}</strong> - {product.quantity} units, expires on {product.expiresAt}
		</li>
	{/each}
</ul>
