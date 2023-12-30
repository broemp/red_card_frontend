<script lang="ts">
	import { goto } from '$app/navigation';
	import { user } from '$lib/store';
	import { callAPI, getAuthCookie } from '$lib/scripts/api';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();

	if (getAuthCookie() && $user !== null) {
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

	async function login() {
		if (username == '') {
			triggerToast('Please Enter a Username!');
			return;
		}
		if (password == '') {
			triggerToast('Please Enter a Password!');
			return;
		}

		const body = JSON.stringify({ username, password });
		const res = await callAPI('/users/login', 'POST', body);

		if (res.ok) {
			const session = await res.json();
			document.cookie = 'Authorization=Bearer ' + session.access_token + ";path='/';samesite=none;";
			$user = {
				id: session.user.id,
				username: session.user.username,
				firstname: session.user.first_name.String,
				lastname: session.user.last_name.String
			};
			goto('/');
		} else {
			triggerToast('Wrong Password!');
			return;
		}
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<form>
			<label class="label">
				<span>Username</span>
				<input
					class="input variant-form-material"
					type="text"
					name="username"
					placeholder="Your Username"
					bind:value={username}
				/>
			</label>
			<label class="label">
				<span>Password</span>
				<input
					class="input variant-form-material"
					type="password"
					name="password"
					placeholder="Your Password"
					bind:value={password}
				/>
			</label>
			<div class="flex space-x-4 w-full justify-center items-center pt-4">
				<button type="submit" class="btn variant-filled-primary w-full" on:click={() => login()}
					>Log In</button
				>
				<a href="/signup"
					><button type="button" class="btn variant-filled-secondary w-full">Sign Up</button></a
				>
			</div>
		</form>
	</div>
</div>
