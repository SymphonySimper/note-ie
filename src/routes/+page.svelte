<script lang="ts">
	import { isLoggedIn } from '../stores/auth';
	import CardList from './CardList.svelte';

	let notes: string[] = [];
	/* let note = { title: '', body: '' }; */
	let note = '';

	const addNote = () => {
		/* note = { title: '', body: '' }; */
		notes = [note, ...notes];
		note = '';
		console.log(notes);
	};
</script>

{#if $isLoggedIn}
	<div class="container">
		<div class="add-note">
			<input type="text" bind:value={note} />
			<button on:click={addNote}> Add Note </button>
		</div>
		<div>
			<CardList {notes} />
		</div>
	</div>
{:else}
	<h1>Login to use the web app</h1>
{/if}

<style>
	.container {
		padding-top: 2rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.add-note {
		display: flex;
		gap: 1rem;
		justify-content: center;
	}

	input {
		background-color: #222;
		border: none;
		width: 50%;
		border-radius: 0.5rem;
		color: white;
		padding: 0.5rem;
	}
	input:focus {
		border: 2px solid #333;
		outline: none;
		background-color: #111;
	}
</style>
