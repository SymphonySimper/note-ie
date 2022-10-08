<script lang="ts">
	import { addDoc, collection } from 'firebase/firestore';
	import { db } from '../lib/firebase';
	import { user, isLoggedIn } from '../stores/auth';
	import { notes } from '../stores/notes';
	import type { Note } from '$lib/types';
	import InputFields from './InputFields.svelte';
	import getTime from '$lib/time';

	let note: Note = {
		title: '',
		note: '',
		time: 0
	};

	let expand = false;

	const onClose = () => {
		expand = !expand;
		note = {
			title: '',
			note: '',
			time: 0
		};
	};

	const onSubmit = async () => {
		if ($isLoggedIn == true) {
			let time: number = getTime();
			note = {
				title: note.title,
				note: note.note,
				time
			};

			$notes = [note, ...$notes];
			await addDoc(collection(db, 'users', $user.uid, 'notes'), note);
			note = {
				title: '',
				note: '',
				time: 0
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
			<InputFields {onSubmit} {onClose} {note} />
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

	@media screen and (max-width: 810px) {
		.fake-input {
			width: 80vw;
		}
	}
</style>
