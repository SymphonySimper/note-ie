<script lang="ts">
	import './styles.css';
	import { isLoggedIn, user } from '../stores/auth';
	import { auth } from '../lib/firebase';
	import { signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
	import { goto } from '$app/navigation';

	const loginWithGoogle = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const res = await signInWithPopup(auth, provider);
			$user = res.user;
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
			$user = {};
			/* goto('/'); */
		} catch (err) {
			console.error(err);
		}
	};

	onAuthStateChanged(auth, (authUser) => {
		$user = authUser;
		$isLoggedIn = !!authUser;
	});
</script>

<div class="container">
	<nav>
		<a href="/"> Note </a>
		{#if !$isLoggedIn}
			<a href="/" on:click={loginWithGoogle}> SignIn </a>
		{:else}
			Notes by {$user.displayName}
			<a href="/" on:click={logout}> SignOut </a>
		{/if}
	</nav>
	<slot />
</div>

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
</style>
