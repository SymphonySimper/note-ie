<script lang="ts">
	import { addDoc, collection } from 'firebase/firestore';
	import { db } from '../lib/firebase';
	import { user, isLoggedIn } from '../stores/auth';
	import { notes } from '../stores/notes';
	import type { Note } from '$lib/types';
	import { afterUpdate } from 'svelte';

	let note: Note = {
		title: '',
		note: '',
		uid: ''
	};

	let lineCount: number;
	let rows: number;
	afterUpdate(() => {
		lineCount = note.note.split('\n').length;
		if (lineCount > 20) {
			rows = 20;
		} else if (lineCount > 5) {
			rows = lineCount;
		} else {
			rows = 5;
		}
	});

	const addNote = async () => {
		if ($isLoggedIn == true) {
			$notes = [note, ...$notes];
			await addDoc(collection(db, 'notes'), note);
			note = {
				title: 'Title',
				note: '',
				uid: $user.uid
			};
		}
	};

	const onSumbit = () => {
		console.log('Hello');
	};

	let expand = false;
	$: expand && console.log(!expand, expand);
</script>

<div>
	<div class="add-note">
		{#if !expand}
			<div on:click={() => (expand = true)} class="fake-input">Add a note</div>
		{:else}
			<form on:submit|preventDefault={onSumbit} class="form">
				<input class="input" type="text" bind:value={note.title} placeholder="Add a title" />
				<textarea
					class="input"
					type="text"
					bind:value={note.note}
					placeholder="Add a note"
					{rows}
				/>
				<div class="buttons">
					<button
						type=""
						on:click={() => {
							expand = !expand;
						}}
					>
						Close
					</button>
					<button type="submit"> Add </button>
				</div>
			</form>
		{/if}
	</div>
</div>

<style>
	.add-note {
		display: flex;
		gap: 1rem;
		justify-content: center;
	}

	.fake-input {
		background-color: #222;
		width: 50vw;
		padding: 1rem;
		border-radius: 0.5rem;
		color: #888;
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
