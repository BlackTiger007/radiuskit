<script lang="ts">
	import { resolve } from '$app/paths';
	import List from '$lib/components/list.svelte';
	import { RADREPLAY_ATTRIBUTES } from '$lib/types/attribute/radreply';
	import { RADIUS_OPERATORS } from '$lib/types/operator';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h1 class="mb-6 text-3xl font-semibold">Neuen radreply Eintrag hinzufügen</h1>

<form method="POST" class="space-y-4">
	<div class="form-control w-full">
		<label for="username" class="label">Username</label>
		<input
			id="username"
			type="text"
			name="username"
			class="input-bordered input w-full"
			list="usernames"
			autocomplete="off"
			required
		/>
	</div>

	<div class="form-control w-full">
		<label for="attribute" class="label">Attribute</label>
		<input
			id="attribute"
			type="text"
			name="attribute"
			class="input-bordered input w-full"
			list="radreplay"
			autocomplete="off"
			required
		/>
	</div>

	<div>
		<label for="op" class="label">Operator</label>
		<input
			type="text"
			name="op"
			class="input-bordered input w-20"
			list="operator"
			autocomplete="off"
			required
		/>
	</div>

	<div class="form-control w-full">
		<label for="value" class="label">Value</label>
		<input
			id="value"
			type="text"
			name="value"
			class="input-bordered input w-full"
			autocomplete="off"
			required
		/>
	</div>

	<div class="mt-4 flex gap-2">
		<button type="submit" class="btn btn-primary">Speichern</button>
		<a href={resolve('/radreply')} class="btn">Abbrechen</a>
	</div>
</form>

<List id="operator" data={[...RADIUS_OPERATORS]}></List>
<List id="radreplay" data={[...RADREPLAY_ATTRIBUTES]}></List>
<List id="usernames" data={[...data.usernames]}></List>
