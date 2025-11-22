<script lang="ts">
	import { resolve } from '$app/paths';
	import List from '$lib/components/list.svelte';
	import { RADIUS_OPERATORS } from '$lib/types/operator';
</script>

<h1 class="mb-6 text-3xl font-semibold">Neuen radgroupreply Eintrag hinzufügen</h1>

<form method="POST" class="space-y-4">
	<div class="form-control w-full">
		<label for="groupname" class="label">Gruppenname</label>
		<input
			id="groupname"
			type="text"
			name="groupname"
			class="input-bordered input w-full"
			required
		/>
	</div>

	<div class="form-control w-full">
		<label for="attribute" class="label">Attribut</label>
		<input
			id="attribute"
			type="text"
			name="attribute"
			class="input-bordered input w-full"
			required
		/>
	</div>

	<div>
		<label for="op" class="label">Operator</label>
		<input type="text" name="op" class="input-bordered input w-20" list="operator" required />
	</div>

	<div class="form-control w-full">
		<label for="value" class="label">Value</label>
		<input id="value" type="text" name="value" class="input-bordered input w-full" required />
	</div>

	<div class="mt-4 flex gap-2">
		<button type="submit" class="btn btn-primary">Speichern</button>
		<a href={resolve('/radgroupreply')} class="btn">Abbrechen</a>
	</div>
</form>

<List id="operator" data={[...RADIUS_OPERATORS]}></List>
