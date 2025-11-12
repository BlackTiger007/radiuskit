<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import Drawer from '$lib/components/drawer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>RadiusKit</title>
</svelte:head>

<div class="contents h-screen w-full">
	{#if page.data.user}
		<Drawer>
			{@render children()}
		</Drawer>
	{:else}
		{@render children()}
	{/if}
</div>
