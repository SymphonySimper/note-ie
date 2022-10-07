<script lang="ts">
	import type { Note } from '$lib/types';
	import { afterUpdate } from 'svelte';

	export let note: Note;
	export let onClose: () => void;
	export let onSubmit: () => void;
	export let primaryButtonTitle: string = 'Add';

	let lineCount: number;
	let rows: number;
	const setCount = () => {
		lineCount = note.note.split('\n').length;
		if (lineCount > 20) {
			rows = 20;
		} else if (lineCount > 5) {
			rows = lineCount;
		} else {
			rows = 5;
		}
	};
	afterUpdate(setCount);
</script>

<div>
	<div class="add-note">
		<form on:submit|preventDefault={onSubmit} class="form">
			<input
				class="input"
				type="text"
				bind:value={note.title}
				placeholder="Add a title"
				autofocus
			/>
			<textarea
				class="input"
				type="text"
				bind:value={note.note}
				placeholder="Add a note"
				{rows}
				wrap="hard"
			/>
			<div class="buttons">
				<button type="reset" on:click={onClose} class="close-btn"> Close </button>
				<button type="submit" disabled={note.note.length == 0 ? true : false}>
					{primaryButtonTitle}
				</button>
			</div>
		</form>
	</div>
</div>

<style>
	.add-note {
		display: flex;
		gap: 1rem;
		justify-content: center;
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		background-color: #111;
		border-radius: 0.5rem;
		border: 1px solid #222;
		padding: 1rem;
	}

	.buttons {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;

		/* required by svelte-modals to enable on:click */
		pointer-events: auto;
	}

	.close-btn {
		background-color: #111;
		border: 2px solid #222;
	}

	button:disabled {
		background-color: #111;
		color: #222;
	}

	.input {
		background-color: #222;
		border: none;
		width: 50vw;
		border-radius: 0.5rem;
		color: white;
		padding: 1rem;
		border: 2px solid #222;
		font-family: sans-serif;
		font-size: 1rem;

		/* required by svelte-modals to enable on:click */
		pointer-events: auto;
	}

	.input:focus {
		border: 2px solid #333;
		outline: none;
		background-color: #111;
	}

	textarea {
		resize: none;
	}
</style>
