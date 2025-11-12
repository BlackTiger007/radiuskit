<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	export let data;

	const groups = data.groups;
</script>

<h1 class="mb-4 text-2xl font-semibold">Gruppen Übersicht</h1>

<div class="mb-4 flex justify-end">
	<a href={resolve('/group/add')} class="btn btn-primary">+ Gruppe erstellen</a>
</div>

<table class="table w-full table-zebra">
	<thead>
		<tr>
			<th>ID</th>
			<th>Gruppe</th>
			<th>Attribut</th>
			<th>Operator</th>
			<th>Wert</th>
		</tr>
	</thead>
	<tbody>
		{#each groups as group}
			<tr
				class="cursor-pointer"
				onclick={() => goto(resolve(`/group/edit/[id]`, { id: group.id.toString() }))}
			>
				<td>{group.id}</td>
				<td>{group.groupname}</td>
				<td>{group.attribute}</td>
				<td>{group.op}</td>
				<td>{group.value}</td>
			</tr>
		{/each}
	</tbody>
</table>
