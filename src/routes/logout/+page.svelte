<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { deleteAuthCookie, getAuthCookie } from '$lib/scripts/api';
	import { user } from '$lib/store';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();

	if (getAuthCookie() == '') {
		const t: ToastSettings = {
			message: 'You are not Logged in!'
		};
		toastStore.trigger(t);
	}

	deleteAuthCookie();
	$user = null;
	$: if (browser) {
		goto('/');
	}
</script>

Logging Out
