<script lang="ts">
	import { closeModal } from 'svelte-modals';
	import InputFields from './InputFields.svelte';
	import type { Note } from '$lib/types';

	export let isOpen: boolean;
	/* export let onClose: () => void; */
	export let onSubmit: () => void;
	export let note: Note;
	export let primaryButtonTitle: string = "Update";

	const onModalClose = () => {
		/* onClose(); */
		closeModal();
	};
</script>

{#if isOpen}
	<div class="modal">
		<InputFields onClose={onModalClose} {onSubmit} {note} {primaryButtonTitle} />
	</div>
{/if}

<style>
	.modal {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;

		/* allow click-through to backdrop */
		pointer-events: none;
	}
</style>
