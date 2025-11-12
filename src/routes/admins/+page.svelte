<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1 class="mb-6 text-3xl font-semibold">Admins Benutzerverwaltung</h1>

<div class="mb-4 flex justify-end">
	<a href={resolve('/admins/add')} class="btn btn-primary">+ Benutzer hinzufügen</a>
</div>

<div class="overflow-x-auto rounded-xl shadow">
	<table class="table w-full table-zebra">
		<thead>
			<tr>
				<th>Benutzername</th>
				<th>Aktionen</th>
			</tr>
		</thead>
		<tbody>
			{#each data.users as user}
				<tr>
					<td class="font-medium">{user.username}</td>
					<td>
						<a
							href={resolve('/admins/edit/[id]', { id: user.id })}
							class="btn btn-outline btn-sm btn-primary"
						>
							Edit
						</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
