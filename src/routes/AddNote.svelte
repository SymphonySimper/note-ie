<script lang="ts">
	import { addDoc, collection } from 'firebase/firestore';
	import { db } from '../lib/firebase';
	import { user, isLoggedIn } from '../stores/auth';
	import type { Note } from '$lib/types';
	import InputFields from './InputFields.svelte';
	import getTime from '$lib/time';

	let note: Note = { note: '' } as Note;

	let expand = false;

	const onClose = () => {
		expand = !expand;
		note = {} as Note;
	};

	const onSubmit = async () => {
		if ($isLoggedIn == true) {
			let time: number = getTime();
			note = {
				...note,
				time
			};

			await addDoc(collection(db, 'users', $user.uid, 'notes'), note);
			note = {} as Note;
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
