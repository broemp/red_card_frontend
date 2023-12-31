<script lang="ts">
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

	const date = new Date(data.created_at.Time.replace(' ', 'T')).toLocaleDateString();
	const time = new Date(data.created_at.Time.replace(' ', 'T')).toLocaleTimeString();
</script>

<div class="p-2">
	<div class="card p-4 {bgColor()}">
		<div class="grid-cols-1 h-full justify-center items-center">
			<h1 class="text-xl">User: {data.accused_username}</h1>
			<p class="text-md py-2">{data.accused_first_name.String} {data.accused_last_name.String}</p>
			<p class="text-md py-2">
				Reported by {data.author_first_name.String}
				{data.author_first_name.String}
				{#if data.event.Valid}
					<p class="">Event: {data.event}</p>
				{/if}
			</p>
			<p class="text-md">{date} at {time}</p>
		</div>
	</div>
</div>
