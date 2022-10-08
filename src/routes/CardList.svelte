<script lang="ts">
	import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
	import { onDestroy } from 'svelte';

	import type { NoteWithId, Note } from '$lib/types';
	import { db } from '$lib/firebase';
	import { user } from '$stores/auth';
	import { notes } from '$stores/notes';
	import Card from './Card.svelte';

	const q = query(collection(db, 'users', $user.uid, 'notes'), orderBy('time'));
	export const unsub = onSnapshot(q, (querySnapshot) => {
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
			<div>
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
