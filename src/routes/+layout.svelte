<script lang="ts">
	import { Toast } from '@skeletonlabs/skeleton';
	import Navigation from '$lib/components/Navigation.svelte';
	import '../app.postcss';
	import { user, jwt } from '$lib/store';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import {
		popup,
		storePopup,
		AppShell,
		AppBar,
		Avatar,
		Drawer,
		getDrawerStore,
		initializeStores
	} from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	initializeStores();

	const drawerStore = getDrawerStore();

	function drawerOpen(): void {
		drawerStore.open();
	}

	var initials = $user?.name?.charAt(0)!;

	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick',
		placement: 'top'
	};
</script>

<Drawer>
	<Navigation />
</Drawer>

<AppShell slotSidebarLeft="w-0 md:w-52 bg-surface-500/10">
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<button class="md:hidden btn btn-sm mr-4" on:click={drawerOpen}>
					<span>
						<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
							<rect width="100" height="20" />
							<rect y="30" width="100" height="20" />
							<rect y="60" width="100" height="20" />
						</svg>
					</span>
				</button>
				<a href="/">
					<strong class="text-xl uppercase"><span class="text-red-500">Red</span>Card</strong>
				</a>
			</svelte:fragment>
			<div class="max-md:hidden">
				<Navigation vertical="true" />
			</div>

			<svelte:fragment slot="trail">
				{#if $jwt === null}
					<a href="/login"
						><button type="button" class="btn variant-filled-primary">Login</button></a
					>
				{:else}
					<button use:popup={popupClick}>
						<Avatar {initials} background="bg-primary-500" width="w-12" />
					</button>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
</AppShell>

<Toast />

<!-- Popup -->
<div class="card p-4 variant-filled-primary" data-popup="popupClick">
	<a href="/logout">Logout</a>
	<div class="arrow variant-filled-primary" />
</div>
