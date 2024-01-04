<script lang="ts">
	import { jwt, user } from '$lib/store';
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	export let vertical = 'false';
	$: vertical_class = vertical == 'true' ? 'flex flex-wrap items-center justify-center' : '';
	$: horizontal_class = vertical == 'false' ? 'p-4' : 'px-4';

	const drawerStore = getDrawerStore();
	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<nav class="list-nav {horizontal_class}">
	<ul class={vertical_class}>
		<li><a href="/" on:click={drawerClose}>Home</a></li>
		<li><a href="/report" on:click={drawerClose}>Report</a></li>
		<li><a href="/events" on:click={drawerClose}>Event</a></li>
		{#if $jwt && $user}
			<li><a href="/users/{$user.id}" on:click={drawerClose}>Me</a></li>
		{/if}
	</ul>
</nav>
