<script lang="ts">
	const test = async () => {
		var author = 1;
		var accused = 2;
		var color = 'red';
		const body = JSON.stringify({ author, accused, color });

		const res = await fetch('http://localhost:3000/cards', {
			body,
			method: 'POST'
		});
		console.log(res);

		if (res.ok) {
			console.log('success');
		}
	};
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<h1 class="h1">Let's get cracking bones!</h1>
		<p>Start by exploring:</p>
		<ul>
			<li><code class="code">/src/routes/+layout.svelte</code> - barebones layout</li>
			<li><code class="code">/src/app.postcss</code> - app wide css</li>
			<li>
				<code class="code">/src/routes/+page.svelte</code> - this page, you can replace the contents
			</li>
		</ul>
		<button type="button" class="btn variant-filled" on:click={test}>Test</button>
	</div>
</div>
