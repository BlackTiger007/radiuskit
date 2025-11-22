<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h1 class="mb-6 text-3xl font-semibold">RADIUS Group Reply Verwaltung</h1>

<a href={resolve('/radgroupreply/add')} class="btn mb-4">Neuen Eintrag hinzufügen</a>

<table class="table w-full table-zebra">
	<thead>
		<tr>
			<th>ID</th>
			<th>Gruppenname</th>
			<th>Attribut</th>
			<th>Operator</th>
			<th>Value</th>
			<th>Aktionen</th>
		</tr>
	</thead>
	<tbody>
		{#each data.groupList as item}
			<tr>
				<td>{item.id}</td>
				<td>{item.groupname}</td>
				<td>{item.attribute}</td>
				<td>{item.op}</td>
				<td>{item.value}</td>
				<td class="flex gap-2">
					<a
						href={resolve('/radgroupreply/edit/[id]', { id: item.id.toString() })}
						class="btn btn-sm btn-primary"
					>
						Bearbeiten
					</a>
					<form method="POST" action="?/delete">
						<input type="hidden" name="id" value={item.id} />
						<button type="submit" class="btn btn-sm btn-error">Löschen</button>
					</form>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
