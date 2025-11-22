<script lang="ts">
	import { resolve } from '$app/paths';
	import List from '$lib/components/list.svelte';
	import { RADIUS_OPERATORS } from '$lib/types/operator';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h1 class="mb-6 text-3xl font-semibold">radgroupreply bearbeiten: {data.item.groupname}</h1>

<form method="POST" action="?/update" class="space-y-4">
	<div class="grid grid-cols-2 gap-4">
		<div class="form-control w-full">
			<label for="groupname" class="label">Gruppenname</label>
			<input
				type="text"
				name="groupname"
				class="input-bordered input w-full"
				value={data.item.groupname}
				required
			/>
		</div>

		<div class="form-control w-full">
			<label for="attribute" class="label">Attribut</label>
			<input
				type="text"
				name="attribute"
				class="input-bordered input w-full"
				value={data.item.attribute}
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
				value={data.item.op}
				required
			/>
		</div>

		<div class="form-control w-full">
			<label for="value" class="label">Value</label>
			<input
				type="text"
				name="value"
				class="input-bordered input w-full"
				value={data.item.value}
				required
			/>
		</div>
	</div>

	<div class="mt-4 flex gap-2">
		<button type="submit" class="btn btn-primary">Speichern</button>
		<a href={resolve('/radgroupreply')} class="btn">Abbrechen</a>
	</div>
</form>

<form method="POST" action="?/delete" class="mt-2">
	<input type="hidden" name="action" value="delete" />
	<button type="submit" class="btn btn-error">Löschen</button>
</form>

<List id="operator" data={[...RADIUS_OPERATORS]}></List>
