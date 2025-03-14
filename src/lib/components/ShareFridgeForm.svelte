<script lang="ts">
	import { enhance } from '$app/forms';
	export let fridge_id: string;
</script>

<div class="share-fridge-form">
	<form method="POST" action="?/shareFridge" use:enhance>
		<input type="hidden" name="fridge_id" value={fridge_id} />
		<div>
			<label for="email">User Email</label>
			<input type="email" id="email" name="email" placeholder="Enter email address" required />
		</div>
		<button class="share-button" type="submit">Share Fridge</button>
	</form>
</div>

<style>
	.share-button {
		background-color: #4caf50;
		color: white;
		padding: 5px 10px;
		border-radius: 4px;
		font-size: 0.9em;
		border: none;
		cursor: pointer;
	}

	.share-button:hover {
		background-color: #45a049;
	}
</style>
