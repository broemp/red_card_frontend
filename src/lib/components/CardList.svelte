<script lang="ts">
	import { Table, tableMapperValues } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';

	export var data: string[];

	const table: TableSource = {
		// A list of heading labels.
		head: ['Accused', 'By', 'Color'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(data, ['accused_username', 'author_username', 'color'])
	};
</script>

<Table source={table} />
