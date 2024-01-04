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

<div class="p-2 space-y-2">
	<a href="/users/{data.card.accused_id}">
		<div class="card p-4 {bgColor()}">
			<div class="grid-cols-1 h-full">
				<h1 class="flex text-xl p-2 justify-center">
					{data.card.accused_name}
				</h1>
				<div class="space-y-2">
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
					<p class="text-md">{date} at {time}</p>
					<hr class="!border-t-2" />
				</div>
			</div>
			<div class="flex justify-center pt-2">
				<svg
					class="w-4 h-4 ms-2 rtl:rotate-180"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 14 10"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M1 5h12m0 0L9 1m4 4L9 9"
					/>
				</svg>
			</div>
		</div>
	</a>

	<div>
		<a href="/users/{data.card.author_id}">
			<button class="btn w-full bg-primary-500 text-l font-bold">Visit Ref</button>
		</a>
	</div>

	<h2 class="text-2xl flex justify-center">Vote on the Card</h2>
	<div class="flex place-content-around space-x-2">
		<button class="btn w-1/2 bg-blue-500">👍</button>
		<button class="btn w-1/2 bg-red-500">👎</button>
	</div>
</div>
