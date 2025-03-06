<script lang="ts">
	import Logo from '$lib/assets/bite-habits-logo-trans.png';
	import { getUser } from '$lib/context/user-context';

	let user = getUser();

	$inspect($user);
</script>

<header class="flex items-center justify-between p-4">
	<div>
		<img src={Logo} class="h-8 w-8" alt="BiteHabits logo" />
	</div>

	<menu class="flex items-center gap-4">
		<li>
			<a class="text-gray-700 hover:text-gray-900" href="/">Hjem</a>
		</li>

		{#if !!$user}
			<li>
				<a class="text-gray-700 hover:text-gray-900" href="/kjoleskap">Kjøleskap</a>
			</li>

			<li>
				<button class="text-gray-700 hover:text-gray-900">Logg ut</button>
			</li>
		{/if}

		{#if !$user}
			<li>
				<a class="text-gray-700 hover:text-gray-900" href="/logg-inn">Logg inn</a>
			</li>
			<li>
				<a class="text-gray-700 hover:text-gray-900" href="/registrer">Registrer</a>
			</li>
		{/if}
	</menu>
</header>
