<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { user, jwt } from '$lib/store';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();

	if ($jwt === null) {
		const t: ToastSettings = {
			message: 'You are not Logged in!'
		};
		toastStore.trigger(t);
	}

	$user = null;
	$jwt = null;
	$: if (browser) {
		goto('/');
	}
</script>

Logging Out
