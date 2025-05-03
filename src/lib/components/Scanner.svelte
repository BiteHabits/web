<script lang="ts">
	import { onMount } from 'svelte';
	import { BrowserMultiFormatReader } from '@zxing/browser';

	type Props = {
		onCodeScanned?: (code: string) => void;
	};

	let { onCodeScanned }: Props = $props();

	let previewRef = $state<HTMLVideoElement | null>(null);
	let lastCode = $state<string | null>(null);

	function handleResult(text: string) {
		if (text !== lastCode) {
			lastCode = text;
			onCodeScanned?.(text);
		}
	}

	onMount(async () => {
		const codeReader = new BrowserMultiFormatReader();

		try {
			const videoInputDevices = await BrowserMultiFormatReader.listVideoInputDevices();
			if (videoInputDevices.length === 0) {
				console.error('No video input devices found');
				return;
			}

			const deviceId = videoInputDevices[0].deviceId;
			console.log(`Starting scan on device ${deviceId}`);

			if (!previewRef) {
				console.error('Preview element is not available');
				return;
			}

			codeReader.decodeFromVideoDevice(deviceId, previewRef, (result) => {
				if (result) {
					handleResult(result.getText());
				}
			});
		} catch (err) {
			console.error('Error initializing camera:', err);
		}
	});
</script>

<div class="scanner">
	<!-- add muted, autoplay, playsinline so the feed shows up automatically -->
	<!-- svelte-ignore a11y_media_has_caption -->
	<video bind:this={previewRef} autoplay muted playsinline class="scanner__video"></video>
</div>

{#if lastCode}
	<div class="text-center">
		<p>Scanned code: {lastCode}</p>
	</div>
{/if}

<style>
	.scanner {
		position: relative;
		max-width: 640px;
		margin: 0 auto;
	}
	.scanner__video {
		width: 100%;
		height: auto;
		display: block;
	}
</style>
