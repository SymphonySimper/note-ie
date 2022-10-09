<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	onMount(() => {
		let paths = document.querySelectorAll<SVGPathElement>('#logo path');
		paths.forEach((path, id) => {
			let strokeLength = path.getTotalLength();
			let order = id + 1;
			path.setAttribute(
				'style',
				`opacity: 1;--order: ${order}; stroke-dasharray: ${strokeLength}; stroke-dashoffset: ${strokeLength}`
			);
		});
	});
</script>

<div out:fade>
	<div class="svg">
		<svg
			width="477"
			height="92"
			viewBox="0 0 477 92"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g id="logo">
				<path
					id="n"
					d="M71 91H59.352L12.504 19.96V91H0.856018V1.65601H12.504L59.352 72.568V1.65601H71V91Z"
				/>
				<path
					id="o"
					d="M131.304 91.896C123.027 91.896 115.475 89.976 108.648 86.136C101.821 82.2107 96.4027 76.792 92.392 69.88C88.4667 62.8827 86.504 55.032 86.504 46.328C86.504 37.624 88.4667 29.816 92.392 22.904C96.4027 15.9067 101.821 10.488 108.648 6.64801C115.475 2.72268 123.027 0.76001 131.304 0.76001C139.667 0.76001 147.261 2.72268 154.088 6.64801C160.915 10.488 166.291 15.864 170.216 22.776C174.141 29.688 176.104 37.5387 176.104 46.328C176.104 55.1174 174.141 62.968 170.216 69.88C166.291 76.792 160.915 82.2107 154.088 86.136C147.261 89.976 139.667 91.896 131.304 91.896ZM131.304 81.784C137.533 81.784 143.123 80.3333 148.072 77.432C153.107 74.5307 157.032 70.392 159.848 65.016C162.749 59.64 164.2 53.4107 164.2 46.328C164.2 39.16 162.749 32.9307 159.848 27.64C157.032 22.264 153.149 18.1253 148.2 15.224C143.251 12.3227 137.619 10.872 131.304 10.872C124.989 10.872 119.357 12.3227 114.408 15.224C109.459 18.1253 105.533 22.264 102.632 27.64C99.816 32.9307 98.408 39.16 98.408 46.328C98.408 53.4107 99.816 59.64 102.632 65.016C105.533 70.392 109.459 74.5307 114.408 77.432C119.443 80.3333 125.075 81.784 131.304 81.784Z"
				/>
				<path
					id="t"
					d="M246.393 1.78401V11.256H222.073V91H210.425V11.256H185.977V1.78401H246.393Z"
				/>
				<path
					id="e"
					d="M272.379 11.256V41.08H304.891V50.68H272.379V81.4H308.731V91H260.731V1.65601H308.731V11.256H272.379Z"
				/>
				<path id="hyphen" d="M374.996 39.16V49.016H323.924V39.16H374.996Z" />
				<path id="i" d="M408.504 1.78401V91H396.856V1.78401H408.504Z" />
				<path
					id="sec-e"
					d="M440.004 11.256V41.08H472.516V50.68H440.004V81.4H476.356V91H428.356V1.65601H476.356V11.256H440.004Z"
				/>
			</g>
		</svg>
	</div>
</div>

<style>
	div {
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-shrink: 1;
	}

	.svg {
		width: 80%;
	}

	#logo {
		stroke: var(--color-fg);
		animation: fade 1s ease forwards 3.5s;
	}

	#logo path {
		opacity: 0;
		animation: draw 2s ease forwards;
		animation-delay: calc(var(--order) * 200ms);
	}

	@keyframes fade {
		from {
			fill: transparent;
		}

		to {
			fill: var(--color-fg);
		}
	}

	@keyframes draw {
		to {
			stroke-dashoffset: 0;
		}
	}
</style>
