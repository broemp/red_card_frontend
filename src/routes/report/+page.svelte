<script lang="ts">
	import { Autocomplete, popup } from '@skeletonlabs/skeleton';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';
	import { jwt } from '$lib/store';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();

	function triggerToast(message: string) {
		const t: ToastSettings = {
			message: message
		};
		toastStore.trigger(t);
	}

	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};

	let accused_filter = '';
	let accused_id: Number | undefined = undefined;
	let description = '';
	var userOptions: AutocompleteOption<string>[] = [];

	function onUserSelection(event: CustomEvent<AutocompleteOption<string>>): void {
		accused_id = +event.detail.value;
	}
	getFilteredUsers();
	async function getFilteredUsers() {
		const res = await fetch(
			PUBLIC_BACKEND_URL + '/users/?filter=' + accused_filter + '&page_id=1&page_size=5',
			{
				method: 'GET',

				headers: {
					Authorization: 'Bearer ' + $jwt
				}
			}
		);
		if (res.ok) {
			var users = await res.json();
			userOptions = [];
			users.forEach((element: { username: string; id: string }) => {
				userOptions.push({
					label: element.username,
					value: element.id
				});
			});
		}
	}

	async function submit(color: string) {
		console.log(accused_id);
		if (accused_id == undefined) {
			triggerToast('Please select someone first!');
			return;
		}
		const accused = accused_id;
		const body = JSON.stringify({ accused, color, description });
		console.log(body);
		const res = await fetch(PUBLIC_BACKEND_URL + '/cards/', {
			body,
			method: 'POST',

			headers: {
				Authorization: 'Bearer ' + $jwt,
				'Content-Type': 'application/json'
			}
		});
		if (res.ok) {
			triggerToast('Success!');
			accused_id = undefined;
		}
	}
</script>

<div class="justify-center m-2 space-y-2">
	<h1 class="text-xl flex justify-center">Who did it?</h1>
	<input
		class="input"
		type="search"
		name="accused"
		bind:value={accused_filter}
		on:input={getFilteredUsers}
		use:popup={popupSettings}
		placeholder="Search..."
	/>
	<div class="flex justify-center my-2 w-full">
		<div
			class="popupAutocomplete variant-filled-primary card p-4 w-72 shadow-xl flex justify-center"
		>
			<Autocomplete
				bind:input={accused_filter}
				options={userOptions}
				on:selection={onUserSelection}
				placeholder="Search..."
			/>
		</div>
	</div>

	<h1 class="text-xl flex justify-center">Description</h1>
	<div class="justify-center mx-2 space-y-2">
		<input
			class="input"
			type="text"
			name="description"
			bind:value={description}
			placeholder="Optional Description..."
		/>
	</div>

	<div class="flex flex-row space-x-2">
		<button class="btn variant-filled-error w-1/3" on:click={() => submit('red')}>Red</button>
		<button class="btn variant-filled-warning w-1/3" on:click={() => submit('yellow')}
			>Yellow</button
		>
		<button class="btn variant-filled-secondary w-1/3" on:click={() => submit('blue')}>Blue</button>
	</div>
</div>
