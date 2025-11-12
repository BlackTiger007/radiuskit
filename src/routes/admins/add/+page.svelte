<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<form method="POST" class="mx-auto mt-8 max-w-xl space-y-4 rounded-lg bg-base-200 p-6 shadow-md">
	<h2 class="text-lg font-semibold">Neuer Admin</h2>

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
	</div>

	<div class="flex gap-2">
		<button class="btn btn-primary" type="submit">Benutzer anlegen</button>
		<a href={resolve('/users')} class="btn">Abbrechen</a>
	</div>
</form>
