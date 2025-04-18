<script lang="ts">
	import {
		Refrigerator,
		ListCheck,
		Heart,
		Carrot,
		Apple,
		Milk,
		Cpu,
		MemoryStick,
		Microchip
	} from '@lucide/svelte';
</script>

<div class="mx-auto mt-4 grid max-w-3xl grid-cols-2 gap-4 px-6">
	<div
		class="relative col-span-2 flex h-52 overflow-hidden rounded-xl border-2 border-gray-300 bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-4 transition-all hover:scale-x-[1.01] hover:scale-y-[1.01] hover:shadow-lg"
	>
		<div class="absolute right-0 z-10 flex rotate-12 flex-col gap-4 opacity-45">
			{#each { length: 5 }}
				<div class="flex items-center gap-4">
					<Refrigerator class="size-8 text-indigo-500" />
					<Refrigerator class="size-8 text-indigo-500" />
					<Refrigerator class="size-8 text-indigo-500" />
					<Refrigerator class="size-8 text-indigo-500" />
					<Refrigerator class="size-8 text-indigo-500" />
					<Refrigerator class="size-8 text-indigo-500" />
				</div>
			{/each}
		</div>

		<div class="mt-auto -space-y-1">
			<p class="mb-2 text-xl font-medium">Utviklet for ditt kjøleskap</p>
			<p class="text-sm text-gray-700">Hold oversikt over hva du har i kjøleskapet</p>
		</div>
	</div>
	<div
		class="relative flex h-52 overflow-hidden rounded-xl border-2 border-gray-300 bg-gradient-to-br from-green-100 via-white to-lime-100 p-4 transition-all hover:scale-x-[1.01] hover:scale-y-[1.01] hover:shadow-lg"
	>
		<div class="absolute right-0 z-10 flex -rotate-12 flex-col gap-4 opacity-45">
			{#each { length: 5 }}
				<div class="flex items-center gap-4">
					<ListCheck class="size-8 text-green-500" />
					<Heart class="size-8 text-green-500" />
					<ListCheck class="size-8 text-green-500" />
					<Heart class="size-8 text-green-500" />
				</div>
			{/each}
		</div>

		<div class="mt-auto -space-y-1">
			<p class="mb-2 text-xl font-medium">Oppskrifter</p>
			<p class="text-sm text-gray-700">Finn oppskrifter basert på hva du har tilgjengelig</p>
		</div>
	</div>
	<div
		class="relative flex h-52 overflow-hidden rounded-xl border-2 border-gray-300 bg-gradient-to-br from-orange-100 via-white to-yellow-100 p-4 transition-all hover:scale-x-[1.01] hover:scale-y-[1.01] hover:shadow-lg"
	>
		<div class="absolute right-0 z-10 flex rotate-12 flex-col gap-4 opacity-45">
			{#each { length: 5 }}
				<div class="flex items-center gap-4">
					<Carrot class="size-8 text-orange-500" />
					<Apple class="size-8 text-orange-500" />
					<Milk class="size-8 text-orange-500" />
				</div>
			{/each}
		</div>

		<div class="mt-auto -space-y-1">
			<p class="mb-2 text-xl font-medium">Måltider</p>
			<p class="text-sm text-gray-700">
				Planlegg måltidene dine og få forslag til sunne alternativer
			</p>
		</div>
	</div>
	<div
		class="relative col-span-2 flex h-52 overflow-hidden rounded-xl border-2 border-gray-300 bg-gradient-to-br from-blue-100 via-white to-cyan-100 p-4 transition-all hover:scale-x-[1.01] hover:scale-y-[1.01] hover:shadow-lg"
	>
		<div class="absolute right-0 z-10 flex rotate-12 flex-col gap-4 opacity-45">
			{#each { length: 5 }}
				<div class="flex items-center gap-4">
					<Cpu class="size-8 text-blue-500" />
					<MemoryStick class="size-8 text-blue-500" />
					<Microchip class="size-8 text-blue-500" />
					<Cpu class="size-8 text-blue-500" />
					<MemoryStick class="size-8 text-blue-500" />
					<Microchip class="size-8 text-blue-500" />
				</div>
			{/each}
		</div>

		<div class="mt-auto -space-y-1">
			<p class="mb-2 text-xl font-medium">Laget for fremtiden</p>
			<p class="text-sm text-gray-700">
				Utviklet med moderne teknologi og designprinsipper, for en bedre brukeropplevelse
			</p>
		</div>
	</div>
</div>
