<script lang="ts">
	import { jwt, user } from '$lib/store';
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();
	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4">
	<ul>
		<li><a href="/" on:click={drawerClose}>Home</a></li>
		<li><a href="/report" on:click={drawerClose}>Report</a></li>
		{#if $jwt && $user}
			<li><a href="/users/{$user.id}" on:click={drawerClose}>Me</a></li>
		{/if}
	</ul>
</nav>
