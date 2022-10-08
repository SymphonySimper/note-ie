<script lang="ts">
	export let note: Note;

	import type { Note } from '$lib/types';
	import { openModal } from 'svelte-modals';
	import InputFieldsModal from './InputFieldsModal.svelte';

	const onSubmit = () => {
		console.log('Close');
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
