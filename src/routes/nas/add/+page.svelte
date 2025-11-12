<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<h1 class="mb-6 text-3xl font-semibold">Neuen NAS hinzufügen</h1>

<form method="POST" class="space-y-4">
	<div class="form-control w-full">
		<label for="nasname" class="label">NAS Name</label>
		<input id="nasname" type="text" name="nasname" class="input-bordered input w-full" required />
	</div>

	<div class="form-control w-full">
		<label for="shortname" class="label">Short Name</label>
		<input id="shortname" type="text" name="shortname" class="input-bordered input w-full" />
	</div>

	<div class="form-control w-full">
		<label for="type" class="label">Type</label>
		<select id="type" name="type" class="select-bordered select w-full">
			<option value="other">Other</option>
			<option value="cisco">Cisco</option>
			<option value="mikrotik">Mikrotik</option>
			<option value="juniper">Juniper</option>
		</select>
	</div>

	<div class="form-control w-full">
		<label for="ports" class="label">Ports</label>
		<input id="ports" type="number" name="ports" class="input-bordered input w-full" min="0" />
	</div>

	<div class="form-control w-full">
		<label for="secret" class="label">Secret</label>
		<input
			id="secret"
			type="text"
			name="secret"
			class="input-bordered input w-full"
			value="secret"
		/>
	</div>

	<div class="form-control w-full">
		<label for="server" class="label">Server</label>
		<input id="server" type="text" name="server" class="input-bordered input w-full" />
	</div>

	<div class="form-control w-full">
		<label for="community" class="label">Community</label>
		<input id="community" type="text" name="community" class="input-bordered input w-full" />
	</div>

	<div class="form-control w-full">
		<label for="description" class="label">Description</label>
		<input
			id="description"
			type="text"
			name="description"
			class="input-bordered input w-full"
			value="RADIUS Client"
		/>
	</div>

	<div class="form-control w-full">
		<label for="require_ma" class="label">Require MA</label>
		<input
			id="require_ma"
			type="text"
			name="require_ma"
			class="input-bordered input w-full"
			value="auto"
		/>
	</div>

	<div class="form-control w-full">
		<label for="limit_proxy_state" class="label">Limit Proxy State</label>
		<input
			id="limit_proxy_state"
			type="text"
			name="limit_proxy_state"
			class="input-bordered input w-full"
			value="auto"
		/>
	</div>

	<div class="mt-4 flex gap-2">
		<button type="submit" class="btn btn-primary">Speichern</button>
		<a href={resolve('/nas')} class="btn">Abbrechen</a>
	</div>
</form>
