<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { PageData, ActionData } from './$types';

	const toastStore = getToastStore();

	function triggerToast() {
		const t: ToastSettings = {
			message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...'
		};
		toastStore.trigger(t);
	}

	export let formData: PageData;
	export let form: ActionData;

	if (form?.success) {
		triggerToast();
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<form method="post" use:enhance action="?/login">
			<label class="label">
				<span>Username</span>
				<input
					class="input variant-form-material"
					type="text"
					name="username"
					placeholder="Your Username"
				/>
			</label>
			<label class="label">
				<span>Password</span>
				<input
					class="input variant-form-material"
					type="password"
					name="password"
					placeholder="Your Password"
				/>
			</label>

			<button type="submit" class="btn variant-filled">Log In</button>
		</form>
	</div>
</div>
