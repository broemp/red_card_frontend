<script lang="ts">
	import { enhance } from '$app/forms';
	export let thisForm: HTMLFormElement;
</script>

<form bind:this={thisForm} use:enhance method="post" action="/signup">
	<label class="label">
		<span>Username *</span>
		<input class="input variant-form-material" name="username" type="text" placeholder="username" />
	</label>
	<label class="label">
		<span>First Name</span>
		<input
			class="input variant-form-material"
			name="first_name"
			type="text"
			placeholder="username"
		/>
	</label>
	<label class="label">
		<span>Last Name</span>
		<input
			class="input variant-form-material"
			name="last_name"
			type="text"
			placeholder="username"
		/>
	</label>
	<label class="label">
		<span>Password</span>
		<input
			class="input variant-form-material"
			name="password"
			type="password"
			placeholder="Your Password"
		/>
	</label>
	<label class="label">
		<span>Confirm Password</span>
		<input
			class="input variant-form-material"
			name="password_confirm"
			type="password"
			placeholder="Your Password Again"
		/>
	</label>
	<button type="submit" class="btn variant-filled">Sign Up</button>
</form>
