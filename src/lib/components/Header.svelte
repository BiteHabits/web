<script lang="ts">
	import Logo from '$lib/assets/bite-habits-logo-trans.png';
	import UserIcon from '$lib/assets/user-icon.svg';
	import { getUser } from '$lib/context/user-context';
	import { page } from '$app/state';

	let pathname = $derived(page.url.pathname);

	const middleRoutes = [
		{
			label: 'Oppskrifter',
			href: '/recipes'
		},
		{
			label: 'Kjøleskap',
			href: '/fridges'
		}
	];

	let user = getUser();
</script>

<header class="relative mx-auto mb-10 flex w-full max-w-4xl items-center justify-between p-6">
	<div>
		<a href="/"><img src={Logo} class="size-14" alt="BiteHabits logo" /></a>
	</div>

	{#if $user}
		<menu class="absolute left-1/2 flex -translate-x-1/2 flex-row items-center gap-5">
			{#each middleRoutes as route}
				{@const isActive = pathname === route.href}
				<li>
					<a
						class={`${isActive ? 'text-gray-900 underline' : 'text-gray-600'} transition-colors hover:text-gray-900`}
						href={route.href}>{route.label}</a
					>
				</li>
			{/each}
		</menu>
	{/if}

	<menu class="flex items-center gap-4 text-lg font-medium">
		{#if $user}
			<li>
				<img src={UserIcon} alt="user icon" />
			</li>
			<li>
				<button class="text-gray-600 transition-colors hover:text-gray-900">Logg ut</button>
			</li>
		{/if}
		{#if !$user}
			<li>
				<a class="text-gray-600 transition-colors hover:text-gray-900" href="/logg-inn">Logg inn</a>
			</li>
			<li>
				<a class="text-gray-600 transition-colors hover:text-gray-900" href="/registrer"
					>Registrer</a
				>
			</li>
		{/if}
	</menu>
</header>
