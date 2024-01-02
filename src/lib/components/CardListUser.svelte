<script lang="ts">
	import { goto } from '$app/navigation';
	import { Table, tableMapperValues } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';

	export var data: string[];

	const table: TableSource = {
		// A list of heading labels.
		head: ['ID', 'Ref', 'Color'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(data, ['id', 'author_name', 'color']),
		meta: tableMapperValues(data, ['id'])
	};

	function gotoCard(meta: { detail: Array<string | number> }): void {
		const { detail } = meta;
		goto('/cards/' + detail[0]);
	}
</script>

<Table source={table} interactive={true} on:selected={gotoCard} />
