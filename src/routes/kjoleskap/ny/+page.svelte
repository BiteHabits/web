<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';

	let fridgeName = $state('');
	let error = $derived(fridgeName.length < 2 ? 'Kjøleskap må være minst 2 tegn langt' : null);
</script>

<svelte:head>
	<title>Opprett nytt kjøleskap</title>
</svelte:head>

<div class="mx-auto max-w-xl">
	<h1 class="mb-8 text-4xl font-light">Nytt kjøleskap</h1>

	<form method="post" use:enhance>
		<div class="form-group">
			<span class="mb-1 ml-2 font-medium">Navn</span>
			<Input
				id="name"
				name="name"
				class="w-full"
				bind:value={fridgeName}
				required
				autocomplete="off"
				placeholder="Eks: Hjemmekjøleskap"
			/>
			<span class="ml-2 text-sm text-gray-500">
				Navnet på kjøleskapet. Dette vil bli brukt til å identifisere kjøleskapet i appen.
			</span>
		</div>

		{#if error}
			<p class="error">{error}</p>
		{/if}

		<div class="flex items-center justify-between">
			<Button variant="danger" href="/kjoleskap">Avbryt</Button>
			<Button type="submit">Opprett kjøleskap</Button>
		</div>
	</form>
</div>

<style>
	.form-group {
		margin-bottom: 20px;
	}

	.error {
		color: red;
		margin-bottom: 20px;
	}
</style>
