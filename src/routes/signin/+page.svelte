<script lang="ts">
	import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';

	import { auth } from '$lib/firebase';
	import type { User } from '$lib/types';
	import { isLoggedIn, user } from '$stores/auth';
	import isLoading from '$stores/loading';

	const loginWithGoogle = async () => {
		const provider = new GoogleAuthProvider();
		try {
			const res = await signInWithPopup(auth, provider);
			user.set({ ...res.user } as User);
			isLoggedIn.set(true);
			isLoading.display();
			goto('/');
		} catch (err) {
			console.log(err);
		}
	};
</script>

<div class="container-center" in:fade>
	<h1>Sign in to use Note-ie</h1>
	<button on:click={loginWithGoogle}> Continue with Google </button>
</div>

<style>
	.container-center {
		margin: 0;
		padding: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}
</style>
