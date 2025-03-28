<script lang="ts">
	export let showModal: () => void;
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
	<div class="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
		<button
			class="absolute right-4 top-3 text-xl text-gray-600 hover:text-black"
			on:click={showModal}
		>
			&times;
		</button>

		<slot />
	</div>
</div>
