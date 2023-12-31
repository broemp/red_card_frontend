<script lang="ts">
	import CardListUser from '$lib/components/CardListUser.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	function bgColor() {
		switch (data.color) {
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
		<h1 class="text-xl">{data.user.username}</h1>
		<p class="text-l">{data.user.first_name.String} {data.user.last_name.String}</p>
	</div>

	<CardListUser data={data.cards}></CardListUser>
</div>
