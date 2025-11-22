<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h1 class="mb-6 text-3xl font-semibold">NAS bearbeiten: {data.nas.nasname}</h1>

<form method="POST" action="?/update" class="space-y-4">
	<div class="grid grid-cols-2 gap-4">
		<div class="form-control w-full">
			<label for="nasname" class="label">Name</label>
			<input
				type="text"
				name="nasname"
				class="input-bordered input w-full"
				value={data.nas.nasname}
			/>
		</div>
		<div class="form-control w-full">
			<label for="shortname" class="label">Shortname</label>
			<input
				type="text"
				name="shortname"
				class="input-bordered input w-full"
				value={data.nas.shortname}
			/>
		</div>
		<div class="form-control w-full">
			<label for="type" class="label">Typ</label>
			<input type="text" name="type" class="input-bordered input w-full" value={data.nas.type} />
		</div>
		<div class="form-control w-full">
			<label for="ports" class="label">Ports</label>
			<input
				type="number"
				name="ports"
				class="input-bordered input w-full"
				value={data.nas.ports}
			/>
		</div>
		<div class="form-control w-full">
			<label for="secret" class="label">Secret</label>
			<input
				type="text"
				name="secret"
				class="input-bordered input w-full"
				value={data.nas.secret}
			/>
		</div>
		<div class="form-control w-full">
			<label for="server" class="label">Server</label>
			<input
				type="text"
				name="server"
				class="input-bordered input w-full"
				value={data.nas.server}
			/>
		</div>
		<div class="form-control w-full">
			<label for="community" class="label">Community</label>
			<input
				type="text"
				name="community"
				class="input-bordered input w-full"
				value={data.nas.community}
			/>
		</div>
		<div class="form-control w-full">
			<label for="description" class="label">Beschreibung</label>
			<input
				type="text"
				name="description"
				class="input-bordered input w-full"
				value={data.nas.description}
			/>
		</div>
		<div class="form-control w-full">
			<label for="require_ma" class="label">Require MA</label>
			<input
				type="text"
				name="require_ma"
				class="input-bordered input w-full"
				value={data.nas.require_ma}
			/>
		</div>
		<div class="form-control w-full">
			<label for="limit_proxy_state" class="label">Limit Proxy State</label>
			<input
				type="text"
				name="limit_proxy_state"
				class="input-bordered input w-full"
				value={data.nas.limit_proxy_state}
			/>
		</div>
	</div>

	<div class="mt-4 flex gap-2">
		<button type="submit" class="btn btn-primary">Speichern</button>
		<a href={resolve('/nas')} class="btn">Abbrechen</a>
	</div>
</form>

<form method="POST" action="?/delete" class="mt-2">
	<input type="hidden" name="action" value="delete" />
	<button type="submit" class="btn btn-error">Löschen</button>
</form>
