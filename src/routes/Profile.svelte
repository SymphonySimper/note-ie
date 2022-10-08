<script lang="ts">
	import { signOut } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	import { auth } from '$lib/firebase';
	import { isLoggedIn, user } from '$stores/auth';
	import { notes } from '$stores/notes';

	let expand = false;

	const logout = async () => {
		await signOut(auth)
			.then(() => {
				isLoggedIn.set(false);
				user.reset();
				notes.reset();
				browser && goto('/signin');
			})
			.catch((err) => console.error(err));
		expand = !expand;
	};
</script>

<div class="pp">
	<img src={$user.photoURL} alt={$user.displayName} on:click={() => (expand = !expand)} />
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
		color: var(--color-sec-txt);
		font-size: 0.8rem;
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
		border: var(--border);
		border-radius: var(--border-radius);
		padding: var(--padding);
		background-color: var(--color-bg);
	}
</style>
