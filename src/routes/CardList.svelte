<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import { notes } from '../stores/notes';
	import Card from './Card.svelte';
	import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
	import type { NoteWithId, Note } from '$lib/types';
	import { db } from '$lib/firebase';

	import { user } from '../stores/auth';
	import { onDestroy } from 'svelte';

	const q = query(collection(db, 'users', $user.uid, 'notes'), orderBy('time'));
	const unsub = onSnapshot(q, (querySnapshot) => {
		notes.reset();
		querySnapshot.forEach((doc) => {
			let note: NoteWithId = {
				...(doc.data() as Note),
				id: doc.id
			};
			notes.add(note);
		});
	});

	onDestroy(unsub);
</script>

<div>
	{#if $notes.length != 0}
		{#each $notes as note, id (id)}
			<div transition:fade={{ duration: 400 }} animate:flip={{ duration: 400 }}>
				<Card {note} />
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
	}
</style>
