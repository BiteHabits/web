<script lang="ts">
    export let showModal: () => void;
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="relative bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <button
            class="absolute top-3 right-4 text-gray-600 hover:text-black text-xl"
            on:click={showModal}
        >
            &times;
        </button>
        
        <slot />
    </div>
</div>
