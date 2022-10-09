<script lang="ts">
	import { addDoc, collection } from 'firebase/firestore';

	import { user, isLoggedIn } from '$stores/auth';
	import { db } from '$lib/firebase';
	import type { Note } from '$lib/types';
	import getTime from '$lib/time';
	import InputFields from './InputFields.svelte';

	let note: Note = { note: '', isPinned: false } as Note;
	let expand = true;

	const resetNote = () => {
		note = { note: '', isPinned: false } as Note;
	};

	const onClose = () => {
		expand = !expand;
		resetNote();
		console.log('here: ' + expand);
	};

	const onSubmit = async () => {
		if ($isLoggedIn == true) {
			let time: number = getTime();
			note = {
				...note,
				time
			};

			expand = !expand;
			await addDoc(collection(db, 'users', $user.uid, 'notes'), note);
			resetNote();
		}
	};

	const onPin = (e: CustomEvent) => {
		note = { ...note, isPinned: e.detail.isPinned } as Note;
	};

	const onDelete = () => {
		console.log('bruv');
	};

	const onExpand = (e: CustomEvent) => {
		expand = e.detail;
	};
</script>

<div class="add-note">
	<!-- <div class="add-note"> -->
	<!-- 	{#if !expand} -->
	<!-- 	 <div on:click={() => (expand = true)} class="fake-input">Add a note</div> -->
	<!-- 		<input on:click={() => (expand = true)} class="input">Add a note</input>  -->
	<!-- 	{:else} -->
	<!-- 	{/if} -->
	<!-- </div> -->
	<InputFields
		{onSubmit}
		{onClose}
		{note}
		on:pin={onPin}
		{onDelete}
		showFakeInput={expand}
		on:expand={onExpand}
	/>
</div>

<style>
	.add-note {
		display: flex;
		gap: 1rem;
		justify-content: center;
	}

	/* .fake-input { */
	/* 	background-color: #222; */
	/* 	width: 50vw; */
	/* 	padding: 1rem; */
	/* 	border-radius: 0.5rem; */
	/* 	color: #888; */
	/* } */
	/**/
	/* @media screen and (max-width: 810px) { */
	/* 	.fake-input { */
	/* 		width: 80vw; */
	/* 	} */
	/* } */
</style>
