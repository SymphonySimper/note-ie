<script lang="ts">
	import { closeAllModals, createModalEventDispatcher } from 'svelte-modals';

	import InputFields from './InputFields.svelte';
	import type { Note } from '$lib/types';

	export let isOpen: boolean;
	export let onSubmit: () => void;
	export let onDelete: () => void;
	export let note: Note;
	export let primaryButtonTitle: string = 'Update';

	const dispatch = createModalEventDispatcher();

	const onModalClose = () => {
		/* closeModal(); */
		closeAllModals();
	};

	const onPin = (e: CustomEvent) => {
		dispatch('pin', { isPinned: e.detail.isPinned });
	};
</script>

{#if isOpen}
	<div class="modal">
		<InputFields
			onClose={onModalClose}
			{onSubmit}
			{note}
			{primaryButtonTitle}
			{onDelete}
			on:pin={onPin}
		/>
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
		z-index: 11;
	}
</style>
