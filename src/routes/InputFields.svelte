<script lang="ts">
	import { afterUpdate, createEventDispatcher } from 'svelte';

	import type { Note } from '$lib/types';
	import PinIconButton from './PinIconButton.svelte';
	import DeleteIconButton from './DeleteIconButton.svelte';

	export let note: Note;
	export let onClose: () => void;
	export let onSubmit: () => void;
	export let primaryButtonTitle: string = 'Add';
	/* export let onPin: (e: CustomEvent) => void; */
	export let onDelete: () => void;
	export let showFakeInput: boolean = false;

	let lineCount: number = 0;
	let rows: number;
	const setCount = () => {
		if (note.note != undefined) {
			lineCount = note.note.split('\n').length;
		}
		if (lineCount > 20) {
			rows = 20;
		} else if (lineCount > 5) {
			rows = lineCount;
		} else {
			rows = 5;
		}
	};
	afterUpdate(setCount);

	const dispatch = createEventDispatcher();
	const onFakeInputClick = () => {
		dispatch('expand', !showFakeInput);
	};
</script>

<div>
	<div class="add-note">
		{#if !showFakeInput}
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
					<div class="buttons">
						<PinIconButton isPinned={note.isPinned} on:pin />
						{#if primaryButtonTitle == 'Update'}
							<DeleteIconButton {onDelete} />
						{/if}
					</div>
					<div class="buttons">
						<button type="reset" on:click={onClose} class="close-btn"> Close </button>
						<button type="submit" disabled={note.note.length == 0 ? true : false}>
							{primaryButtonTitle}
						</button>
					</div>
				</div>
			</form>
		{:else}
			<input
				on:click={onFakeInputClick}
				class="input"
				id="fake-input"
				type="text"
				readonly
				placeholder="Add a title"
			/>
		{/if}
	</div>
</div>

<style>
	.add-note {
		display: flex;
		gap: 1rem;
		justify-content: center;
		width: 50vw;
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		background-color: var(--color-bg);
		border-radius: var(--border-radius);
		border: var(--border);
		padding: 1rem;
		width: calc(100% - 2rem);
	}

	.buttons {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;

		/* required by svelte-modals to enable on:click */
		pointer-events: auto;
	}

	.close-btn {
		background-color: var(--color-bg);
		border: 2px solid var(--color-on-bg);
	}

	.input {
		background-color: var(--color-on-bg);
		border: none;
		width: inherit;
		border-radius: var(--border-radius);
		color: var(--color-fg);
		padding: var(--padding);
		border: 2px solid var(--color-on-bg);
		font-family: sans-serif;
		font-size: 1rem;

		/* required by svelte-modals to enable on:click */
		pointer-events: auto;
	}

	.input:focus {
		border: 2px solid var(--color-sec);
		outline: none;
		background-color: var(--color-bg);
	}

	textarea {
		resize: none;
	}

	@media screen and (max-width: 1000px) {
		.add-note {
			width: 70vw;
		}
	}
	@media screen and (max-width: 810px) {
		.add-note {
			width: 80vw;
		}
	}
	@media screen and (max-width: 480px) {
		.add-note {
			width: calc(100vw - 2rem);
		}

		.buttons {
			gap: 0.5rem;
		}
	}
</style>
