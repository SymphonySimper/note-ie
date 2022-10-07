<script lang="ts">
	import './styles.css';
	import { isLoggedIn, user } from '../stores/auth';
	import { auth } from '../lib/firebase';
	import { signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { Modals, closeModal } from 'svelte-modals';

	const loginWithGoogle = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const res = await signInWithPopup(auth, provider);
			/* $user = res.user; */
			$user = {
				uid: res.user.uid,
				displayName: res.user.displayName ?? ''
			};
			$isLoggedIn = true;
			goto('/');
		} catch (err) {
			console.error(err);
		}
	};

	const logout = async () => {
		try {
			await signOut(auth);
			$isLoggedIn = false;
			$user = {
				uid: '',
				displayName: ''
			};
			/* goto('/'); */
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
		}
		$isLoggedIn = !!authUser;
	});
</script>

<div class="container">
	<nav>
		<a href="/"> Note-ie </a>
		{#if !$isLoggedIn}
			<a href="/" on:click={loginWithGoogle}> SignIn </a>
		{:else}
			Notes by {$user.displayName}
			<a href="/" on:click={logout}> SignOut </a>
		{/if}
	</nav>
	<slot />
</div>

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
	}

	a {
		text-decoration: none;
		color: white;
	}

	.container {
		padding: 1rem;
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
