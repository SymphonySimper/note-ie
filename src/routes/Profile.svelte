<script lang="ts">
	import { isLoggedIn, user } from '../stores/auth';
	import { auth } from '../lib/firebase';
	import { signOut } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	let expand = false;

	const logout = async () => {
		try {
			await signOut(auth);
			$isLoggedIn = false;
			$user = {
				uid: '',
				displayName: '',
				photo: '',
				email: ''
			};
			browser && goto('/signin');
		} catch (err) {
			console.error(err);
		}
		expand = !expand;
	};
</script>

<div class="pp">
	<img src={$user.photo} alt={$user.displayName} on:click={() => (expand = !expand)} />
</div>
{#if expand}
	<div class="profile">
		<div class="details">
			<span>{$user.displayName}</span><br />
			<span class="email">({$user.email})</span>
		</div>
		<hr />
		<button on:click={logout}> Sign out </button>
	</div>
{/if}

<style>
	.pp {
		height: 4rem;
		width: 4rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.email {
		color: #aaa;
		font-size: 0.8rem
	}

	img {
		aspect-ratio: 1;
		height: 3rem;
		border-radius: 100%;
		overflow: clip;
		transition: height 400ms ease;
	}

	img:hover {
		height: 3.5rem;
		transition: height 400ms ease;
	}

	.profile {
		position: absolute;
		top: 4.5rem;
		right: 0;
		display: flex;
		flex-direction: column;
		border: 1px solid #222222;
		border-radius: 0.5rem;
		padding: 1rem;
		background-color: #111;
	}

	hr {
		width: 100%;
		color: #222;
	}
</style>
