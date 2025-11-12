<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
</script>

<form
	method="POST"
	use:enhance
	class="mx-auto mt-8 max-w-xl space-y-4 rounded-lg bg-base-200 p-6 shadow-md"
>
	<h2 class="text-lg font-semibold">Radius - Neuer Benutzer</h2>

	<div class="form-control">
		<label for="username" class="label">Benutzername</label>
		<input name="username" required class="input-bordered input w-full" />
	</div>

	<div class="form-control">
		<label for="password" class="label">Passwort</label>
		<input
			name="password"
			type="password"
			required
			minlength="6"
			class="input-bordered input w-full"
		/>
		<label for="password" class="label text-sm text-error">
			Hinweis: Passwort wird als Cleartext in radcheck gespeichert (FreeRADIUS-Standard). <br />
			TODO: Bessere Lösung implementieren.
		</label>
	</div>

	<div class="form-control">
		<label for="priority" class="label">Priorität</label>
		<input name="priority" type="number" required class="input-bordered input w-full" />
		<label for="priority" class="label text-sm">
			Priorität des Benutzers in der Gruppe (niedrigerer Wert = höhere Priorität)
		</label>
	</div>

	<div class="form-control">
		<label for="group" class="label">Gruppe (optional)</label>
		<input
			name="group"
			class="input-bordered input w-full"
			placeholder="z. B. guests oder admins"
		/>
	</div>

	<div class="form-control">
		<label for="login_time" class="label">Login-Time (optional)</label>
		<input
			name="login_time"
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
