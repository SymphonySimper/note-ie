<script lang="ts">
	import './styles.css';
	import { isLoggedIn, user } from '../stores/auth';
	import { auth } from '../lib/firebase';
	import { signOut, onAuthStateChanged } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { Modals, closeModal } from 'svelte-modals';
	import { browser } from '$app/environment';

	const logout = async () => {
		try {
			await signOut(auth);
			$isLoggedIn = false;
			$user = {
				uid: '',
				displayName: ''
			};
		} catch (err) {
			console.error(err);
		}
	};

	onAuthStateChanged(auth, (authUser) => {
		if (!!authUser) {
			$user = {
				uid: authUser.uid,
				displayName: authUser.displayName ?? ''
			};

			browser && goto('/');
		} else {
			browser && goto('/signin');
		}
		$isLoggedIn = !!authUser;
	});
</script>

{#if $isLoggedIn}
	<nav>
		<a href="/"> Note-ie </a>
		<a on:click={logout} href="/signin">SignOut </a>
	</nav>
{/if}
<slot />

<Modals>
	<div class="backdrop" slot="backdrop" on:click={closeModal} />
</Modals>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		background-color: #222;
		padding: 1rem;
		border-radius: 0.5rem;
		position: sticky;
		margin: 1rem;
	}

	a {
		text-decoration: none;
		color: white;
	}

	.backdrop {
		position: fixed;
		top: 0;
		left: 0;
		background-color: #11111180;
		width: 100vw;
		height: 100vh;
	}
</style>
