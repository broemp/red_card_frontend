<script lang="ts">
	import { goto } from '$app/navigation';
	import { jwt } from '$lib/store';
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
	let name: string = '';

	async function register() {
		if (username == '') {
			triggerToast('Please Enter a Username!');
			return;
		}
		if (password == '') {
			triggerToast('Please Enter a Password!');
			return;
		}
		if (name == '') {
			triggerToast('Please Enter a Displayname!');
			return;
		}
		if (password !== password_confirm) {
			triggerToast("Passwords don't match");
			return;
		}

		const body = JSON.stringify({ username, password, name });
		const res = await fetch(PUBLIC_BACKEND_URL + '/users/register', {
			body,
			method: 'POST',

			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (res.ok) {
			triggerToast('Welcome ' + name + '! Please log in!');
			goto('/login');
		} else {
			triggerToast('Username already taken!');
		}
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<label class="label">
			<span>Username</span>
			<input
				class="input variant-form-material"
				name="username"
				type="text"
				placeholder="username"
				bind:value={username}
			/>
		</label>
		<label class="label">
			<span>Display Name</span>
			<input
				class="input variant-form-material"
				name="name"
				type="text"
				placeholder="Eg. your First Name"
				bind:value={name}
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
	</div>
</div>
