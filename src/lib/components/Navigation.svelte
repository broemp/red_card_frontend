<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();
	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4">
	<ul>
		<li><a href="/report" on:click={drawerClose}>Report</a></li>
		<li><a href="/cards" on:click={drawerClose}>Cards</a></li>
		<li><a href="/users" on:click={drawerClose}>users</a></li>
	</ul>
</nav>
