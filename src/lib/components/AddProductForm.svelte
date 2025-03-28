<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from './Button.svelte';

	let { fridgeId }: { fridgeId: string } = $props();
</script>

<h1 class="font-bold">Register Product</h1>

<form class="flex w-full flex-col gap-4" method="post" action="?/addProduct" use:enhance>
	<label class="flex flex-col">
		Name
		<input name="name" class="rounded border p-1" required />
	</label>

	<label class="flex flex-col">
		Expiry Date
		<input type="date" name="expiry_date" class="rounded border p-1" required />
	</label>

	<label class="flex flex-col">
		Quantity
		<input type="number" name="quantity" class="rounded border p-1" required />
	</label>

	<Button text="Legg til vare" onClick={null} />
</form>
