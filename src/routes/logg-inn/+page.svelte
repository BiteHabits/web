<script>
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
</script>

<div class="mx-auto max-w-md">
	<h1 class="mb-8 text-4xl font-light">Logg inn</h1>

	<form class="mx-auto flex flex-col gap-4" method="post" use:enhance>
		<label class="flex flex-col">
			<span class="mb-1 ml-2 font-medium">E-post</span>
			<Input name="email" placeholder="kari.nordmann@norge.no" />
		</label>

		<label class="flex flex-col">
			<span class="mb-1 ml-2 font-medium">Passord</span>
			<Input type="password" name="password" placeholder="Ditt passord" />
		</label>

		<Button>Logg inn</Button>

		<p class="text-center text-sm text-gray-500">
			Hvis du ikke har en konto, kan du
			<a class="text-blue-600 hover:underline" href="/registrer-deg">registrere deg her</a>.
		</p>
	</form>
</div>
