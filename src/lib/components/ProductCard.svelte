<script lang="ts">
	import translateDate from '$lib/utils/translateDate';
	type Props = {
		product: {
			fridgeId: string;
			id: string;
			name: string;
			expiresAt: string;
			quantity: number;
		};
	};

	let { product }: Props = $props();

	let expired = $derived.by(() => {
		const diffInMs = new Date(product.expiresAt).getTime() - new Date().getTime();
		const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

		if (diffInDays <= 1) {
			return 'text-red-500';
		} else if (diffInDays <= 3) {
			return 'text-yellow-500';
		}

		return '';
	});
</script>

<div class="rounded-lg border-2 border-gray-200 p-4">
	<div class="flex flex-col gap-2">
		<h3 class="text-lg font-bold">{product.name}</h3>
		<p>{product.quantity} stykk</p>
		{#if expired !== ''}
			<p class={expired}>Best før: {translateDate(product.expiresAt)}</p>
		{:else}
			<p class="text-red-500">Utløpt</p>
		{/if}
	</div>
</div>
