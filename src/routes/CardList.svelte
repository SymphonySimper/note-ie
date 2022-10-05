<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import { notes } from '../stores/notes';
	import Card from './Card.svelte';
	import { collection, query, where, getDocs } from 'firebase/firestore';
	import type { Note } from '$lib/types';
	import { db } from '$lib/firebase';

	import { isLoggedIn, user } from '../stores/auth';

	const getDocu = async () => {
		if ($isLoggedIn) {
			$notes = [];
			let q = query(collection(db, 'notes'), where('uid', '==', $user.uid));
			let noteSnap = await getDocs(q);
			noteSnap.forEach((doc) => {
				let note: Note = {
					title: doc.data().title,
					note: doc.data().note,
					uid: doc.data().uid
				};

				$notes = [note, ...$notes];
			});
		}
	};

	$: $isLoggedIn && getDocu();
</script>

<div>
	{#if $notes.length != 0}
		{#each $notes as note, id (id)}
			<div transition:fade={{ duration: 400 }} animate:flip={{ duration: 400 }}>
				<Card title={note.title} note={note.note} />
			</div>
		{/each}
	{/if}
</div>

<style>
	div {
		gap: 1rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		/* display: grid; */
		/* grid-template-columns: repeat(4, 1fr); */
	}
</style>
