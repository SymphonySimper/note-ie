<script lang="ts">
	import './styles.css';
	import { onAuthStateChanged } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { Modals, closeModal } from 'svelte-modals';
	import { browser } from '$app/environment';

	import { auth } from '$lib/firebase';
	import type { User } from '$lib/types';
	import { isLoggedIn, user } from '$stores/auth';
	import isLoading from '$stores/loading';
	import Profile from './Profile.svelte';
	import LoadingScreen from './LoadingScreen.svelte';

	isLoading.display();
	onAuthStateChanged(auth, (authUser) => {
		if (!!authUser) {
			user.set({ ...authUser } as User);
			browser && goto('/');
		} else {
			browser && goto('/signin');
		}
		isLoggedIn.set(!!authUser);
	});
</script>

{#if $isLoading}
	<LoadingScreen />
{:else}
	{#if $isLoggedIn}
		<nav>
			<a href="/"> Note-ie </a>
			<Profile />
		</nav>
	{/if}
	<slot />
{/if}

<Modals>
	<div class="backdrop" slot="backdrop" on:click={closeModal} />
</Modals>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: var(--color-on-bg);
		padding: 0 var(--padding);
		border-radius: var(--border-radius);
		position: sticky;
		top: 1rem;
		margin: var(--padding);
		height: 4rem;
	}

	a {
		text-decoration: none;
		color: var(--color-fg);
	}

	.backdrop {
		position: fixed;
		top: 0;
		left: 0;
		background-color: var(--color-shadow);
		width: 100vw;
		height: 100vh;
		z-index: 10;
	}
</style>
