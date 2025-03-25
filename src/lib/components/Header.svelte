<script lang="ts">
	import Logo from '$lib/assets/bite-habits-logo-trans.png';
	import UserIcon from '$lib/assets/user-icon.svg';
	import { getUser } from '$lib/context/user-context';

	let user = getUser();
</script>

<header class="flex items-end justify-between h-32 p-4 bg-green-300 mb-10">
	<div class="flex items-center gap-1 flex-col">
		<a href="/"><img src={Logo} class="h-16 w-16" alt="BiteHabits logo" /></a>
		<h1 class="font-bold">BiteHabits</h1>
	</div>

	<menu class="flex items-center gap-12 flex-row">
		{#if $user}
			<li class="p-4 border-2 border-gray-700 rounded-lg hover:bg-green-500">
				<a class="p-4 text-gray-700 hover:text-gray-900" href="/recipes">Oppskrifter</a>
			</li>

			<li class="p-4 border-2 border-gray-700 rounded-lg hover:bg-green-500">
				<a class="p-4 text-gray-700 hover:text-gray-900" href="/add-product">Legg til varer</a>
			</li>

			<li class="p-4 border-2 border-gray-700 rounded-lg hover:bg-green-500">
				<a class="p-4 text-gray-700 hover:text-gray-900" href="/fridges">Kjøleskap</a>
			</li>
		{/if}
	</menu>
	{#if $user}
		<menu class="flex items-center flex-col">
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
