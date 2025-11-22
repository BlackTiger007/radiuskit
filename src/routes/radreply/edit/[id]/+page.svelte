<script lang="ts">
	import type { PageData } from './$types';
	import { resolve } from '$app/paths';
	import List from '$lib/components/list.svelte';
	import { RADIUS_OPERATORS } from '$lib/types/operator';
	import { RADREPLAY_ATTRIBUTES } from '$lib/types/attribute/radreply';

	export let data: PageData;
</script>

<h1 class="mb-6 text-3xl font-semibold">
	radreply bearbeiten: {data.entry.username}
</h1>

<form method="POST" action="?/update" class="space-y-4">
	<div class="grid grid-cols-2 gap-4">
		<div class="form-control w-full">
			<label class="label" for="username">Username</label>
			<input
				type="text"
				name="username"
				class="input-bordered input w-full"
				value={data.entry.username}
				autocomplete="off"
				list="usernames"
				required
			/>
		</div>

		<div class="form-control w-full">
			<label class="label" for="attribute">Attribute</label>
			<input
				type="text"
				name="attribute"
				class="input-bordered input w-full"
				value={data.entry.attribute}
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
				value={data.entry.op}
				autocomplete="off"
				required
			/>
		</div>

		<div class="form-control w-full">
			<label class="label" for="value">Value</label>
			<input
				type="text"
				name="value"
				class="input-bordered input w-full"
				value={data.entry.value}
				autocomplete="off"
				required
			/>
		</div>
	</div>

	<div class="mt-4 flex gap-2">
		<button type="submit" class="btn btn-primary">Speichern</button>
		<a class="btn" href={resolve('/radreply')}>Abbrechen</a>
	</div>
</form>

<form method="POST" action="?/delete" class="mt-2">
	<input type="hidden" name="action" value="delete" />
	<button type="submit" class="btn btn-error">Löschen</button>
</form>

<List id="operator" data={[...RADIUS_OPERATORS]}></List>
<List id="radreplay" data={[...RADREPLAY_ATTRIBUTES]}></List>
<List id="usernames" data={[...data.usernames]}></List>
