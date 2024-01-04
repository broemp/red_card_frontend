<script lang="ts">
	import CardList from '$lib/components/CardList.svelte';
	import { event } from '$lib/store';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div
	class="container h-full mx-auto grid-cols-1 grid- justify-center items-center px-4 space-y-4 pt-2"
>
	<div class="space-y-5">
		<CardList data={data.cards} />
	</div>
	{#if $event != null}
		<div class="card">
			<a href="/event">
				<span class="text-4xl">EVENT PLACEHOLDER</span>
			</a>
		</div>
	{/if}
	<div class="self-end w-full">
		<a href="/report">
			<button type="button" class="btn variant-filled-error w-full">Report</button>
		</a>
	</div>
</div>
