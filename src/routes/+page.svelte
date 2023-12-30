<script lang="ts">
	import CardList from '$lib/components/CardList.svelte';
	import { callAPI } from '$lib/scripts/api';
	import { ConicGradient } from '@skeletonlabs/skeleton';
	import type { ConicStop } from '@skeletonlabs/skeleton';

	const conicStops: ConicStop[] = [
		{ color: 'transparent', start: 0, end: 25 },
		{ color: 'rgb(var(--color-primary-500))', start: 75, end: 100 }
	];

	async function getRecentCards() {
		const res = await callAPI('/cards/?page_id=1&page_size=10', 'GET', null);
		if (res.ok) {
			let body = res.json();
			return await body;
		}
	}
</script>

<div class="container h-full mx-auto grid-cols-1 grid- justify-center items-center px-4">
	<div class="space-y-5 py-4">
		{#await getRecentCards()}
			<ConicGradient stops={conicStops} spin>Loading</ConicGradient>
		{:then data}
			<CardList {data} />
		{:catch error}
			<p>{error.message}</p>
		{/await}
	</div>
	<div class="self-end w-full">
		<a href="/report">
			<button type="button" class="btn variant-filled-error w-full">Report</button>
		</a>
	</div>
</div>
