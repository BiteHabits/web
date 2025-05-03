<script>
	import { enhance } from '$app/forms';

	let { form } = $props();

	let password = $state('');
	let repeatPassword = $state('');

	let isMatching = $derived(password === repeatPassword);
</script>

<div class="mx-auto max-w-md">
	<h1 class="mb-8 text-4xl font-light">Registrer deg</h1>

	{#if form?.success === false}
		<p class="mb-4 text-sm text-red-500">
			{form?.message || 'Noe gikk galt. Vennligst prøv igjen.'}
		</p>
	{/if}

	<form class="mx-auto flex flex-col gap-4" method="post" use:enhance>
		<label class="flex flex-col">
			<span class="mb-1 ml-2 font-medium">Navn</span>
			<input name="name" class="h-10 rounded-xl border-2 px-2 py-1" placeholder="Kari Nordmann" />
		</label>

		<label class="flex flex-col">
			<span class="mb-1 ml-2 font-medium">E-post</span>
			<input
				name="email"
				class="h-10 rounded-xl border-2 px-2 py-1"
				placeholder="kari.nordmann@norge.no"
			/>
		</label>

		<label class="flex flex-col">
			<span class="mb-1 ml-2 font-medium">Passord</span>
			<input
				type="password"
				name="password"
				bind:value={password}
				class="h-10 rounded-xl border-2 px-2 py-1"
				placeholder="Passord"
			/>
		</label>

		<label class="flex flex-col">
			<span class="mb-1 ml-2 font-medium">Gjenta passord</span>
			<input
				type="password"
				name="repeatPassword"
				bind:value={repeatPassword}
				class="h-10 rounded-xl border-2 px-2 py-1"
				placeholder="Gjenta passord"
			/>
		</label>

		{#if !isMatching}
			<p class="text-red-500">Passordene må være like</p>
		{/if}

		<button
			class="h-10 rounded-xl border-2 border-blue-800 bg-blue-600 p-1 font-medium text-white transition-colors hover:bg-blue-700"
			disabled={!isMatching || password === ''}>Registrer</button
		>

		<p class="text-center text-sm text-gray-500">
			Hvis du allerede har en konto, kan du
			<a class="text-blue-600 hover:underline" href="/logg-inn">logge inn her</a>.
		</p>
	</form>
</div>
