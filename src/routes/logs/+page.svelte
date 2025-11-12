<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	export let data;

	let usernameFilter = data.usernameFilter ?? '';
	let limit = data.limit;

	const changeFilter = () => {
		const params = new URLSearchParams();
		if (usernameFilter) params.set('username', usernameFilter);
		params.set('page', '1');
		params.set('limit', String(limit));
		window.location.search = params.toString();
	};

	const changePage = (page: number) => {
		const params = new URLSearchParams();
		if (usernameFilter) params.set('username', usernameFilter);
		params.set('page', String(page));
		params.set('limit', String(limit));
		window.location.search = params.toString();
	};
</script>

<h1 class="mb-4 text-2xl font-semibold">Authentifizierungs-Logs</h1>

<div class="mb-4 flex gap-2">
	<input
		type="text"
		placeholder="Filter nach User"
		bind:value={usernameFilter}
		class="input-bordered input"
	/>
	<button onclick={changeFilter} class="btn btn-primary">Filtern</button>
	<input
		type="number"
		min="1"
		bind:value={limit}
		placeholder="limit"
		class="input-bordered input w-20"
		onchange={changeFilter}
	/>
</div>

<table class="table w-full table-zebra">
	<thead>
		<tr>
			<th>User</th>
			<th>NAS IP</th>
			<th>Startzeit</th>
			<th>Stoppzeit</th>
			<th>Access Point</th>
			<th>Gerät</th>
			<th>Status</th>
		</tr>
	</thead>
	<tbody>
		{#each data.logs as log}
			<tr
				class={`cursor-pointer ${log.acctterminatecause === 'User-Request' ? 'text-success' : 'text-error'}`}
				onclick={() => goto(resolve(`/logs/[id]`, { id: log.radacctid.toString() }))}
			>
				<td>{log.username}</td>
				<td>{log.nasipaddress}</td>
				<td>{new Date(log.acctstarttime).toLocaleString()}</td>
				<td>{new Date(log.acctstoptime).toLocaleString()}</td>
				<td>{log.calledstationid}</td>
				<td>{log.callingstationid}</td>
				<td>{log.acctterminatecause}</td>
			</tr>
		{/each}
	</tbody>
</table>

<!-- Pagination -->
<div class="mt-4 flex gap-2">
	{#if data.page > 1}
		<button onclick={() => changePage(data.page - 1)} class="btn btn-sm">Zurück</button>
	{/if}
	<span>Seite {data.page} von {Math.max(data.totalPages, 1)}</span>
	{#if data.page < data.totalPages}
		<button onclick={() => changePage(data.page + 1)} class="btn btn-sm">Weiter</button>
	{/if}
</div>
