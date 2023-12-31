<script lang="ts">
	import { goto } from '$app/navigation';
	import { user, jwt } from '$lib/store';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();

	if ($jwt !== null) {
		triggerToast('Already logged in!');
		goto('/');
	}

	function triggerToast(message: string) {
		const t: ToastSettings = {
			message: message
		};
		toastStore.trigger(t);
	}

	let username: string = '';
	let password: string = '';
	let password_confirm: string = '';
	let first_name: string = '';
	let last_name: string = '';

	async function register() {
		if (username == '') {
			triggerToast('Please Enter a Username!');
			return;
		}
		if (password == '') {
			triggerToast('Please Enter a Password!');
			return;
		}
		if (password !== password_confirm) {
			triggerToast("Passwords don't match");
			return;
		}

		const body = JSON.stringify({ username, password, first_name, last_name });
		const res = await fetch(PUBLIC_BACKEND_URL + '/users/register', {
			body,
			method: 'POST',

			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (res.ok) {
			const session = await res.json();
			$jwt = session.access_token;
			$user = {
				id: session.user.id,
				username: session.user.username,
				firstname: session.user.first_name.String,
				lastname: session.user.last_name.String
			};
			goto('/');
		} else {
			triggerToast('Username already taken!');
		}
	}
</script>

<label class="label">
	<span>Username *</span>
	<input
		class="input variant-form-material"
		name="username"
		type="text"
		placeholder="username"
		bind:value={username}
	/>
</label>
<label class="label">
	<span>First Name</span>
	<input
		class="input variant-form-material"
		name="first_name"
		type="text"
		placeholder="Your First Name"
		bind:value={first_name}
	/>
</label>
<label class="label">
	<span>Last Name</span>
	<input
		class="input variant-form-material"
		name="last_name"
		type="text"
		placeholder="Your Last Name"
		bind:value={last_name}
	/>
</label>
<label class="label">
	<span>Password</span>
	<input
		class="input variant-form-material"
		name="password"
		type="password"
		placeholder="Your Password"
		bind:value={password}
	/>
</label>
<label class="label">
	<span>Confirm Password</span>
	<input
		class="input variant-form-material"
		name="password_confirm"
		type="password"
		placeholder="Your Password Again"
		bind:value={password_confirm}
	/>
</label>
<button type="submit" class="btn variant-filled" on:click={() => register()}>Sign Up</button>
