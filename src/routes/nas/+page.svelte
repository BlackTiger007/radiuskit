<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h1 class="mb-6 text-3xl font-semibold">Network-Access-Server Verwaltung</h1>

<a href={resolve('/nas/add')} class="btn mb-4">NAS hinzufügen</a>

<table class="table w-full table-zebra">
	<thead>
		<tr>
			<th>ID</th>
			<th>Name</th>
			<th>Shortname</th>
			<th>Typ</th>
			<th>Aktionen</th>
		</tr>
	</thead>
	<tbody>
		{#each data.nasList as item}
			<tr>
				<td>{item.id}</td>
				<td>{item.nasname}</td>
				<td>{item.shortname}</td>
				<td>{item.type}</td>
				<td class="flex gap-2">
					<a
						href={resolve('/nas/edit/[id]', { id: item.id.toString() })}
						class="btn btn-sm btn-primary"
					>
						Bearbeiten
					</a>
					<form method="POST">
						<input type="hidden" name="id" value={item.id} />
						<button type="submit" class="btn btn-sm btn-error">Löschen</button>
					</form>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
