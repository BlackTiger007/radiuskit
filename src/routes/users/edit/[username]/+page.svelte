<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h1 class="mb-6 text-3xl font-semibold">Benutzer bearbeiten: {data.user.username}</h1>

<form method="POST" action="?/update" class="space-y-4">
	<div class="form-control w-full">
		<label for="password" class="label">Passwort</label>
		<input
			type="text"
			name="password"
			id="password"
			class="input-bordered input w-full"
			value={data.user.password}
			placeholder="Neues Passwort oder leer lassen"
		/>
	</div>

	<div class="form-control w-full">
		<label for="hash_method" class="label">Passwort-Format</label>
		<select
			name="hash_method"
			id="hash_method"
			class="select-bordered select w-full"
			value={data.user.password ? 'Cleartext' : 'MD5'}
		>
			<option value="MD5">MD5 (empfohlen)</option>
			<option value="Cleartext">Klartext</option>
		</select>
		<label for="hash_method" class="label text-sm text-warning">
			MD5 ist sicherer als Klartext.
		</label>
	</div>

	<div class="form-control w-full">
		<label for="groups" class="label">Gruppen (kommagetrennt)</label>
		<input
			type="text"
			name="groups"
			id="groups"
			class="input-bordered input w-full"
			value={data.user.groups.join(', ')}
			autocomplete="off"
		/>
	</div>

	<div class="form-control w-full">
		<label for="replies" class="label">Replies (JSON Array)</label>
		<textarea
			name="replies"
			id="replies"
			class="textarea-bordered textarea w-full"
			rows="6"
			value={JSON.stringify(data.user.replies, null, 2)}
		></textarea>
	</div>

	<div class="flex gap-2">
		<button type="submit" class="btn btn-primary">Speichern</button>
		<a href={resolve('/users')} class="btn">Abbrechen</a>
	</div>
</form>

<form method="POST" action="?/delete" class="mt-4">
	<button type="submit" class="btn btn-error">Benutzer löschen</button>
</form>
