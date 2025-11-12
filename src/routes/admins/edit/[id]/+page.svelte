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
			class="input-bordered input w-full"
			placeholder="Neues Passwort"
			required
		/>
	</div>

	<div class="flex gap-2">
		<button type="submit" class="btn btn-primary">Speichern</button>
		<a href={resolve('/admins')} class="btn">Abbrechen</a>
	</div>
</form>

<!-- Löschen-Formular -->
<form method="POST" action="?/delete" class="mt-4 space-y-2">
	<button type="submit" class="btn btn-error">Benutzer löschen</button> <br />
	<div class="text-sm text-error">
		<p>Warnung:</p>
		<span>
			Wenn dies der letzte Admin ist, wird die Seite nicht mehr funktionieren. <br />
			Stellen Sie sicher, dass mindestens ein weiterer Admin-Benutzer vorhanden ist, bevor Sie diesen
			löschen.
			<br />
			Wenn sie ausversehen alle gelöscht haben müssen sie die Anwendung neustarten und es wird ein Standart
			Admin erstellt.
		</span>
	</div>
</form>
