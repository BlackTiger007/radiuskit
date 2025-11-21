<script>
	import { resolve } from '$app/paths';
	import List from '$lib/components/list.svelte';
	import { RADGROUPCHECK_ATTRIBUTES } from '$lib/types/attribute/radgroupcheck';
	import { RADIUS_OPERATORS } from '$lib/types/operator';
</script>

<h1 class="mb-4 text-2xl font-semibold">Neue RadGroupCheck Gruppe hinzufügen</h1>

<form method="POST" action="?/create" class="space-y-4">
	<div>
		<label for="GroupName" class="label">Gruppe</label>
		<input
			type="text"
			name="GroupName"
			class="input-bordered input w-full"
			autocomplete="off"
			required
		/>
	</div>

	<div>
		<label for="Attribute" class="label">Attribut</label>
		<input type="text" name="Attribute" class="input-bordered input w-full" list="radgroupcheck" />
	</div>

	<div>
		<label for="op" class="label">Operator</label>
		<input type="text" name="op" class="input-bordered input w-20" list="operator" required />
	</div>

	<div>
		<label for="Value" class="label">Wert</label>
		<input type="text" name="Value" class="input-bordered input w-full" required />
	</div>

	<div class="flex gap-2">
		<button type="submit" class="btn btn-primary">Erstellen</button>
		<a href={resolve('/group')} class="btn btn-secondary">Zurück zur Übersicht</a>
	</div>
</form>

<List id="radgroupcheck" data={[...RADGROUPCHECK_ATTRIBUTES]}></List>
<List id="operator" data={[...RADIUS_OPERATORS]}></List>
