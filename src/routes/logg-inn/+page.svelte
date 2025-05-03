<script>
	import { enhance } from '$app/forms';
</script>

<div class="mx-auto max-w-md">
	<h1 class="mb-8 text-4xl font-light">Logg inn</h1>

	<form class="mx-auto flex flex-col gap-4" method="post" use:enhance>
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
				class="h-10 rounded-xl border-2 px-2 py-1"
				placeholder="Ditt passord"
			/>
		</label>

		<button
			class="h-10 rounded-xl border-2 border-blue-800 bg-blue-600 p-1 font-medium text-white transition-colors hover:bg-blue-700"
			>Logg inn</button
		>

		<p class="text-center text-sm text-gray-500">
			Hvis du ikke har en konto, kan du
			<a class="text-blue-600 hover:underline" href="/registrer-deg">registrere deg her</a>.
		</p>
	</form>
</div>
