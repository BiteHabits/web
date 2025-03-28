<script lang="ts">
	import Logo from '$lib/assets/bite-habits-logo-trans.png';
	import UserIcon from '$lib/assets/user-icon.svg';
	import { getUser } from '$lib/context/user-context';

	let user = getUser();
</script>

<header class="mb-10 flex h-32 items-end justify-between bg-green-300 p-4">
	<div class="flex flex-col items-center gap-1">
		<a href="/"><img src={Logo} class="h-16 w-16" alt="BiteHabits logo" /></a>
		<h1 class="font-bold">BiteHabits</h1>
	</div>

	<menu class="flex flex-row items-center gap-12">
		{#if $user}
			<li class="rounded-lg border-2 border-gray-700 p-4 hover:bg-green-500">
				<a class="p-4 text-gray-700 hover:text-gray-900" href="/recipes">Oppskrifter</a>
			</li>
			<li class="rounded-lg border-2 border-gray-700 p-4 hover:bg-green-500">
				<a class="p-4 text-gray-700 hover:text-gray-900" href="/fridges">Kjøleskap</a>
			</li>
		{/if}
	</menu>
	{#if $user}
		<menu class="flex flex-col items-center">
			<li>
				<img src={UserIcon} alt="user icon" />
			</li>
			<li>
				<button class="text-gray-700 hover:text-gray-900">Logg ut</button>
			</li>
		</menu>
	{/if}
	{#if !$user}
		<menu>
			<li>
				<a class="text-gray-700 hover:text-gray-900" href="/logg-inn">Logg inn</a>
			</li>
			<li>
				<a class="text-gray-700 hover:text-gray-900" href="/registrer">Registrer</a>
			</li>
		</menu>
	{/if}
</header>
