<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from './ui/Button.svelte';
	import Scanner from './Scanner.svelte';
	import Input from './ui/Input.svelte';

	let name = $state<string | null>(null);
	let expiryDate = $state<string | null>(null);
	let quantity = $state(1);

	const fetchProduct = async (code: string) => {
		const resp = await fetch(`/api/product/ean/${code}`);
		if (resp.status !== 200) {
			return;
		}

		const data = await resp.json();
		name = data.name;
	};

	const handleCode = (code: string) => {
		void fetchProduct(code);
	};
</script>

<h1 class="mb-4 text-2xl">Registrer produkt</h1>

<form
	class="flex max-h-screen w-full flex-col gap-4 overflow-x-auto"
	method="post"
	action="?/addProduct"
	use:enhance
>
	<Scanner onCodeScanned={handleCode} />

	<div class="flex items-center gap-4">
		<div class="h-0.5 w-full bg-gray-300"></div>
		<span>eller</span>
		<div class="h-0.5 w-full bg-gray-300"></div>
	</div>

	<label class="flex flex-col">
		Name
		<Input bind:value={name} name="name" required />
	</label>

	<label class="flex flex-col">
		Expiry Date
		<Input bind:value={expiryDate} type="date" name="expiry_date" required />
	</label>

	<label class="flex flex-col">
		Quantity
		<Input bind:value={quantity} type="number" name="quantity" required />
	</label>

	<Button>Legg til vare</Button>
</form>
