<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	function bgColor() {
		switch (data.card.color) {
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

	const date = new Date(data.card.created_at.replace(' ', 'T')).toLocaleDateString();
	const time = new Date(data.card.created_at.replace(' ', 'T')).toLocaleTimeString();
</script>

<div class="p-2">
	<div class="card p-4 {bgColor()}">
		<div class="grid-cols-1 h-full justify-center items-center">
			<a href="/users/{data.card.accused_id}">
				<div class="card">
					<h1 class="flex text-xl p-2 justify-between">
						<p>User:</p>
						<p>
							{data.card.accused_name}
						</p>
					</h1>
				</div>
			</a>
			<div class="space-y-2">
				<p class="text-l font-bold">Name:</p>
				<p>{data.card.accused_name}</p>
				<a href="/users/{data.card.accused_id}">
					<p class="text-l font-bold">Reported by:</p>
					<p>{data.card.author_name}</p>
				</a>
				{#if data.card.description.Valid}
					<p class="text-l font-bold">Description:</p>
					<p>{data.card.description.String}</p>
				{/if}
				{#if data.card.event.Valid}
					<p class="py-2">Event: {data.card.event}</p>
				{/if}
				<hr class="!border-t-2" />
				<p class="text-md">{date} at {time}</p>
			</div>
		</div>
	</div>
</div>
