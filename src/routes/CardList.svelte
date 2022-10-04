<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import Card from './Card.svelte';
	export let notes: string[];
</script>

<div>
	{#each notes as note, id (id)}
		<div transition:fade={{ duration: 400 }} animate:flip={{ duration: 400 }}>
			<Card {note} />
		</div>
	{/each}
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
