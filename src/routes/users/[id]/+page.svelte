<script lang="ts">
	import CardListUser from '$lib/components/CardListUser.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	function bgColor(color: string) {
		switch (color) {
			case 'red': {
				return 'variant-filled-error';
			}
			case 'yellow': {
				return 'variant-filled-warning';
			}
			case 'blue': {
				return 'variant-filled-secondary';
			}
		}
	}
</script>

<div class="mx-2 mt-2 space-y-2">
	<div class="card p-4">
		<h1 class="text-xl">{data.user.name}</h1>
		<p class="text-l">{data.user.username}</p>
		{#if data.cards.count}
			<div class="flex flex-row w-full justify-evenly">
				{#each data.cards.count as c}
					<div class="flex card items-center {bgColor(c.color)}">
						<p class="flex text-xl mx-2 my-1">
							{c.color.charAt(0).toUpperCase() + c.color.slice(1)}: {c.count}
						</p>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	{#if data.cards}
		<CardListUser data={data.cards.cards}></CardListUser>
	{/if}
</div>
