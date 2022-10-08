<script lang="ts">
	import { db } from '$lib/firebase';
	import { doc, getDoc, updateDoc } from 'firebase/firestore';
	import { openModal, closeModal } from 'svelte-modals';

	import type { Note, NoteWithId } from '$lib/types';
	import InputFieldsModal from './InputFieldsModal.svelte';
	import { user } from '$stores/auth';

	export let note: NoteWithId;

	let fbNote: Partial<Note>;
	const onSubmit = async () => {
		const docRef = doc(db, 'users', $user.uid, 'notes', note.id);
		await getDoc(docRef).then((res) => {
			fbNote = {
				title: res.data()?.title,
				note: res.data()?.note
			};
		});

		if (fbNote.title != note.title || fbNote.note != note.note) {
			await updateDoc(docRef, {
				title: note.title,
				note: note.note
			});
		}

		closeModal();
	};

	const handleClick = () => {
		openModal(InputFieldsModal, { onSubmit, note });
	};
</script>

<div class="card" on:click={handleClick}>
	<h4>{note.title}</h4>
	<hr />
	<p>{note.note}</p>
</div>

<style>
	.card {
		aspect-ratio: 1;
		height: 16rem;
		width: 16rem;
		background-color: var(--color-bg);
		border: var(--border);
		border-radius: var(--border-radius);
		/* overflow: hidden; */
		padding: var(--padding);
	}

	p {
		display: -webkit-box;
		line-height: 1.5rem;
		-webkit-line-clamp: 7;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	h4 {
		max-width: 14rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
