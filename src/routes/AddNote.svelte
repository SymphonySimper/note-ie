<script lang="ts">
	import { addDoc, collection } from 'firebase/firestore';
	import { db } from '../lib/firebase';
	import { user, isLoggedIn } from '../stores/auth';
	import { notes } from '../stores/notes';
	import type { Note } from '$lib/types';
	import InputFields from './InputFields.svelte';

	let note: Note = {
		title: '',
		note: '',
		uid: ''
	};

	let expand = false;

	const onClose = () => {
		expand = !expand;
		note = {
			title: '',
			note: '',
			uid: $user.uid
		};
	};

	const onSumbit = async () => {
		if ($isLoggedIn == true) {
			note = {
				title: note.title,
				note: note.note,
				uid: $user.uid
			};

			$notes = [note, ...$notes];
			await addDoc(collection(db, 'notes'), note);
			note = {
				title: '',
				note: '',
				uid: $user.uid
			};
			expand = !expand;
		}
	};
</script>

<div>
	<div class="add-note">
		{#if !expand}
			<div on:click={() => (expand = true)} class="fake-input">Add a note</div>
		{:else}
			<InputFields {onSumbit} {onClose} {note} />
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
</style>
