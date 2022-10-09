<script lang="ts">
	import { db } from '$lib/firebase';
	import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
	import { openModal, closeModal, closeAllModals } from 'svelte-modals';

	import type { NoteWithId } from '$lib/types';
	import InputFieldsModal from './InputFieldsModal.svelte';
	import { user } from '$stores/auth';
	import PinIconButton from './PinIconButton.svelte';

	export let note: NoteWithId;

	const getDocRef = () => {
		return doc(db, 'users', $user.uid, 'notes', note.id);
	};

	const onSubmit = async () => {
		const docRef = getDocRef();
		await updateDoc(docRef, {
			title: note.title,
			note: note.note
		});

		closeModal();
	};

	let hover = false;
	const handleMouseHover = () => (hover = !hover);

	const onPin = async (e: CustomEvent, isModal: boolean = true) => {
		const docRef = getDocRef();
		await updateDoc(docRef, { ...note, isPinned: e.detail.isPinned });
		// This workaround to refresh the modal is bit of a jank
		// It basically closes all the modals which are open and opens a new modal
		// This done to make the isPinned icon button to work
		if (isModal) {
			closeAllModals();
			handleClick();
		}
	};
	const onDelete = async () => {
		const docRef = getDocRef();
		await deleteDoc(docRef);
		closeAllModals();
	};

	const handleClick = () => {
		openModal(InputFieldsModal, { onSubmit, note, onDelete }, { on: { pin: onPin } });
	};
</script>

<div class="card-container" on:mouseenter={handleMouseHover} on:mouseleave={handleMouseHover}>
	<div class="card" on:click={handleClick}>
		<h4>{note.title}</h4>
		<hr />
		<p>{note.note}</p>
	</div>
	{#if hover || note.isPinned}
		<div class="icon">
			<PinIconButton isPinned={note.isPinned} on:pin={(e) => onPin(e, false)} />
		</div>
	{/if}
</div>

<style>
	.card-container {
		aspect-ratio: 1;
		height: 16rem;
		width: 16rem;
		background-color: var(--color-bg);
		border: var(--border);
		border-radius: var(--border-radius);
		/* overflow: hidden; */
		padding: var(--padding);
		position: relative;
		cursor: pointer;
	}

	.card {
		width: 100%;
		height: 100%;
	}
	.icon {
		position: absolute;
		top: 1rem;
		right: 1rem;
		z-index: 9;
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
