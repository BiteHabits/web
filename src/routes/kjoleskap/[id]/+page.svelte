<script lang="ts">
	let { data } = $props();
	let { fridge, products } = $derived(data);
</script>

<h1>Products in {fridge.name}</h1>

<ul>
	{#each products as product}
		<li>
			<strong>{product.name}</strong> - {product.quantity} units, expires on {product.expiresAt}
		</li>
	{/each}
</ul>
