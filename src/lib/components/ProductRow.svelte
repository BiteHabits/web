<script lang="ts">
	import { enhance } from '$app/forms';
	import translateDate from '$lib/utils/translateDate';
	import { Pencil, Save, X } from '@lucide/svelte';

	type Props = {
		product: {
			id: string;
			name: string;
			expiryDate: Date;
			quantity: number;
		};
	};

	let { product }: Props = $props();

	let isEditing = $state(false);

	let expired = $derived.by(() => {
		const diffInMs = product.expiryDate.getTime() - new Date().getTime();
		const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
		if (diffInDays < 0) {
			return '';
		} else if (diffInDays <= 1) {
			return 'text-red-500';
		} else if (diffInDays <= 3) {
			return 'text-yellow-500';
		}

		return 'text-black';
	});
</script>

<div class="divide-x-1 flex items-center border-b border-gray-200 py-2">
	<div class="flex-1">
		<p class="font-semibold {expired}">
			{product.name}

			{#if product.quantity > 1}
				<span class="text-xs text-gray-500">({product.quantity})</span>
			{/if}
		</p>
		<p class="text-xs text-gray-500">
			{translateDate(product.expiryDate)}
		</p>
	</div>

	<div class="flex items-center gap-2">
		<button onclick={() => (isEditing = !isEditing)} class="text-gray-500 hover:text-gray-700">
			{#if isEditing}
				<Save class="size-4" />
			{:else}
				<Pencil class="size-4" />
			{/if}
		</button>
		<form class="contents" action="?/removeProduct" method="post" use:enhance>
			<input type="hidden" name="product_id" value={product.id} />
			<button type="submit" class="text-gray-500 hover:text-red-500">
				<X class="size-4" />
			</button>
		</form>
	</div>
</div>
