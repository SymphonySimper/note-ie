<script lang="ts">
	export let note: string;
</script>

<div>
	<p>Title</p>
	<hr />
	<p>{note}</p>
</div>

<style>
	div {
		aspect-ratio: 1/1;
		height: 16rem;
		width: 16rem;
		background-color: #111;
		border: 1px solid #222;
		border-radius: 0.5rem;
		overflow: hidden;
		padding: 1rem;
	}

	hr {
		color: #222;
	}

	p {
		display: -webkit-box;
		line-height: 1.5rem;
		-webkit-line-clamp: 7;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
