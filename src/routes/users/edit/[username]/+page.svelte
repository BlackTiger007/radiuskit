<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';
	export let data: PageData;

	let password = '';
	let hashMethod: 'MD5' | 'Cleartext' = 'MD5'; // Standardmäßig MD5
	let groups = data.user.groups.join(', ');
	let replies = JSON.stringify(data.user.replies, null, 2);
</script>

<h1 class="mb-6 text-3xl font-semibold">Benutzer bearbeiten: {data.user.username}</h1>

<form method="POST" action="?/update" class="space-y-4">
	<div class="form-control w-full">
		<label for="password" class="label">Passwort</label>
		<input
			type="text"
			name="password"
			class="input-bordered input w-full"
			bind:value={password}
			placeholder="Neues Passwort oder leer lassen"
		/>
	</div>

	<div class="form-control w-full">
		<label for="hash_method" class="label">Passwort-Format</label>
		<select name="hash_method" class="select-bordered select w-full" bind:value={hashMethod}>
			<option value="MD5">MD5 (empfohlen)</option>
			<option value="Cleartext">Klartext</option>
		</select>
		<label for="hash_method" class="label text-sm text-error">
			Hinweis: MD5 ist sicherer als Klartext. FreeRADIUS unterstützt beide.
		</label>
	</div>

	<div class="form-control w-full">
		<label for="groups" class="label">Gruppen (kommagetrennt)</label>
		<input type="text" name="groups" class="input-bordered input w-full" bind:value={groups} />
	</div>

	<div class="form-control w-full">
		<label for="replies" class="label">Replies (JSON Array)</label>
		<textarea name="replies" class="textarea-bordered textarea w-full" rows="6" bind:value={replies}
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
