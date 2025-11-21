<script lang="ts">
	import { resolve } from '$app/paths';

	export let data;
</script>

<h1 class="mb-4 text-2xl font-semibold">Log Details</h1>

<table class="table-striped table w-full">
	<tbody>
		<tr>
			<th>UserName</th>
			<td>{data.log.username}</td>
		</tr>
		<tr>
			<th>NAS IP</th>
			<td>{data.log.nasipaddress}</td>
		</tr>
		<tr>
			<th>NAS Port ID</th>
			<td>{data.log.nasportid}</td>
		</tr>
		<tr>
			<th>NAS Port Type</th>
			<td>{data.log.nasporttype}</td>
		</tr>
		<tr>
			<th>Startzeit</th>
			<td>{data.log.acctstarttime ? new Date(data.log.acctstarttime).toLocaleString() : '-'}</td>
		</tr>
		<tr>
			<th>Stoppzeit</th>
			<td>{data.log.acctstoptime ? new Date(data.log.acctstoptime).toLocaleString() : '-'}</td>
		</tr>
		<tr>
			<th>Session Time</th>
			<td>{data.log.acctsessiontime}</td>
		</tr>
		<tr>
			<th>Authentifizierung</th>
			<td>{data.log.acctauthentic}</td>
		</tr>
		<tr>
			<th>Input Octets</th>
			<td>{data.log.acctinputoctets}</td>
		</tr>
		<tr>
			<th>Output Octets</th>
			<td>{data.log.acctoutputoctets}</td>
		</tr>
		<tr>
			<th>Called Station</th>
			<td>{data.log.calledstationid}</td>
		</tr>
		<tr>
			<th>Calling Station</th>
			<td>{data.log.callingstationid}</td>
		</tr>
		<tr>
			<th>Terminate Cause</th>
			<td>{data.log.acctterminatecause}</td>
		</tr>
		<tr>
			<th>Service Type</th>
			<td>{data.log.servicetype}</td>
		</tr>
		<tr>
			<th>Framed Protocol</th>
			<td>{data.log.framedprotocol}</td>
		</tr>
		<tr>
			<th>Framed IP</th>
			<td>{data.log.framedipaddress}</td>
		</tr>
	</tbody>
</table>

<div class="mt-4">
	<a href={resolve('/logs')} class="btn btn-secondary">Zurück zur Übersicht</a>
</div>
