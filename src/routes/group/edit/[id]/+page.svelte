<script lang="ts">
	import { resolve } from '$app/paths';
	import List from '$lib/components/list.svelte';
	import { RADGROUPCHECK_ATTRIBUTES } from '$lib/types/attribute/radgroupcheck.js';

	export let data;
</script>

<h1 class="mb-4 text-2xl font-semibold">Gruppe bearbeiten</h1>

<form method="POST" action="?/update" class="space-y-4">
	<div>
		<label for="GroupName" class="label">Gruppe</label>
		<input
			type="text"
			name="GroupName"
			value={data.group.groupname}
			class="input-bordered input w-full"
			required
		/>
	</div>

	<div>
		<label for="Attribute" class="label">Attribut</label>
		<input
			type="text"
			name="Attribute"
			value={data.group.attribute}
			class="input-bordered input w-full"
			list="radgroupcheck"
		/>
	</div>

	<div>
		<label for="op" class="label">Operator</label>
		<input
			type="text"
			name="op"
			value={data.group.op}
			class="input-bordered input w-full"
			required
		/>
	</div>

	<div>
		<label for="Value" class="label">Wert</label>
		<input
			type="text"
			name="Value"
			value={data.group.value}
			class="input-bordered input w-full"
			required
		/>
	</div>

	<div class="flex gap-2">
		<button type="submit" class="btn btn-primary">Speichern</button>
		<button type="submit" formaction="?/delete" formmethod="POST" class="btn btn-error">
			Löschen
		</button>
		<a href={resolve('/group')} class="btn btn-secondary">Zurück</a>
	</div>
</form>

<List id="radgroupcheck" data={[...RADGROUPCHECK_ATTRIBUTES]}></List>
