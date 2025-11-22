<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import List from '$lib/components/list.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<form
	method="POST"
	use:enhance
	class="mx-auto mt-8 max-w-xl space-y-4 rounded-lg bg-base-200 p-6 shadow-md"
>
	<h2 class="text-lg font-semibold">Radius - Neuer Benutzer</h2>

	<div class="form-control">
		<label for="username" class="label">Benutzername</label>
		<input name="username" id="username" required class="input-bordered input w-full" />
	</div>

	<div class="form-control">
		<label for="hash_method" class="label">Passwort-Format</label>
		<select name="hash_method" id="hash_method" class="select-bordered select w-full">
			<option value="MD5" selected>MD5 (empfohlen)</option>
			<option value="Cleartext">Klartext</option>
		</select>
		<label for="hash_method" class="label text-sm text-warning">
			MD5 ist sicherer als Klartext.
		</label>
	</div>

	<div class="form-control">
		<label for="password" class="label">Passwort</label>
		<input
			name="password"
			id="password"
			type="password"
			required
			minlength="6"
			class="input-bordered input w-full"
		/>
	</div>

	<div class="form-control">
		<label for="priority" class="label">Priorität</label>
		<input
			name="priority"
			id="priority"
			type="number"
			required
			class="input-bordered input w-full"
		/>
		<label for="priority" class="label text-sm">
			Priorität des Benutzers in der Gruppe (niedrigerer Wert = höhere Priorität)
		</label>
	</div>

	<div class="form-control">
		<label for="group" class="label">Gruppe (optional)</label>
		<input
			name="group"
			id="group"
			class="input-bordered input w-full"
			placeholder="z. B. guests oder admins"
			list="group"
			autocomplete="off"
		/>
	</div>

	<div class="form-control">
		<label for="login_time" class="label">Login-Time (optional)</label>
		<input
			name="login_time"
			id="login_time"
			class="input-bordered input w-full"
			placeholder="z. B. Mo-Fr0600-1600 oder leer"
		/>
		<label for="login_time" class="label text-sm">
			Format: Mo-Fr0600-1600, Mo-Su0000-2359, etc.
		</label>
	</div>

	<div class="flex gap-2">
		<button class="btn btn-primary" type="submit">Benutzer anlegen</button>
		<a href={resolve('/users')} class="btn">Abbrechen</a>
	</div>
</form>

<List id="group" data={data.groups}></List>
