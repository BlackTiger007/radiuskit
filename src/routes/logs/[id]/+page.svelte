<script lang="ts">
	import { resolve } from '$app/paths';

	export let data;
</script>

<h1 class="mb-4 text-2xl font-semibold">Log Details</h1>

<table class="table-striped table w-full">
	<tbody>
		<tr>
			<th>ID</th>
			<td>{data.log.id}</td>
		</tr>
		<tr>
			<th>UserName</th>
			<td>{data.log.username}</td>
		</tr>
		<tr>
			<th>Password (gesendet)</th>
			<td>{data.log.pass}</td>
		</tr>
		<tr>
			<th>Antwort</th>
			<td>{data.log.reply}</td>
		</tr>
		<tr>
			<th>Datum</th>
			<td>{data.log.authdate ? new Date(data.log.authdate).toLocaleString() : '-'}</td>
		</tr>
		{#if data.log.class}
			<tr>
				<th>Class</th>
				<td>{data.log.class}</td>
			</tr>
		{/if}
	</tbody>
</table>

<div class="mt-4">
	<a href={resolve('/logs')} class="btn btn-secondary">Zurück zur Übersicht</a>
</div>
