<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1 class="mb-6 text-3xl font-semibold">RADIUS Benutzerverwaltung</h1>

<div class="mb-4 flex justify-end">
	<a href={resolve('/users/add')} class="btn btn-primary">+ Benutzer hinzufügen</a>
</div>

<div class="overflow-x-auto rounded-xl shadow">
	<table class="table w-full table-zebra">
		<thead>
			<tr>
				<th>Benutzername</th>
				<th>Passwort</th>
				<th>Login-Zeit</th>
				<th>Gruppen</th>
				<th>Replies</th>
				<th>Aktionen</th>
			</tr>
		</thead>
		<tbody>
			{#each data.users as user}
				<tr>
					<td class="font-medium">{user.UserName}</td>
					<td>{user.password ?? '-'}</td>
					<td>{user.loginTime ?? '-'}</td>
					<td>
						{#if user.groups.length > 0}
							<div class="flex flex-wrap gap-1">
								{#each user.groups as g}
									<span class="badge badge-outline">{g}</span>
								{/each}
							</div>
						{:else}
							<span>-</span>
						{/if}
					</td>
					<td>
						{#if user.replies.length > 0}
							<ul class="ml-4 list-disc text-sm">
								{#each user.replies as reply}
									<li>{reply.Attribute}: {reply.Value}</li>
								{/each}
							</ul>
						{:else}
							<span>-</span>
						{/if}
					</td>
					<td>
						<a
							href={resolve('/users/edit/[username]', { username: user.UserName })}
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
