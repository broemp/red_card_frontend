<script lang="ts">
	import CardList from '$lib/components/CardList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container h-full mx-auto grid-cols-1 grid- justify-center items-center px-4">
	<div class="space-y-5 py-4">
		<CardList data={data.cards} />
	</div>
	<div class="self-end w-full">
		<a href="/report">
			<button type="button" class="btn variant-filled-error w-full">Report</button>
		</a>
	</div>
</div>
