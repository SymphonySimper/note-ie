<script lang="ts">
	import { isLoggedIn } from '$stores/auth';
	import CardList from './CardList.svelte';
	import AddNote from './AddNote.svelte';
</script>

{#if $isLoggedIn}
	<div class="container">
		<AddNote />
		<CardList />
	</div>
{/if}

<style>
	.container {
		padding-top: 2rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
</style>
