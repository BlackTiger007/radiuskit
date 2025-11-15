<script lang="ts">
	import { page } from '$app/state';
</script>

<main class="flex h-full w-full content-center items-center p-4">
	<div class="mx-auto text-center">
		<h1 class="text-8xl font-extrabold text-error opacity-20 select-none lg:text-[10rem]">Error</h1>
		<h2 class="text-6xl font-bold text-error opacity-20 select-none lg:text-8xl">
			{page.status}
		</h2>
		<p class="mt-6 mb-8 text-lg text-base-content lg:text-xl">
			{page.error?.message}
		</p>
	</div>
</main>
