<script lang="ts">
	import { enhance } from '$app/forms';
	import Eye from '$lib/SVG/Eye.svelte';
	import EyeSlash from '$lib/SVG/EyeSlash.svelte';
	import Key from '$lib/SVG/Key.svelte';
	import User from '$lib/SVG/User.svelte';
	import type { ActionData } from './$types';
	let { form }: { form: ActionData } = $props();

	let showPassword = $state(false);
</script>

<main class="flex h-screen w-full grow items-center justify-center p-4">
	<form
		method="POST"
		action="?/login"
		use:enhance
		class="fieldset w-full max-w-xs space-y-4 rounded-box border border-base-300 bg-base-200 p-6"
	>
		<legend class="fieldset-legend mb-2 text-lg font-semibold">Admin Anmeldung</legend>

		<!-- username -->
		<div class="form-control">
			<label class="label text-sm" for="username">Name</label>
			<label class="input-bordered input flex items-center gap-2">
				<User class="size-4" />
				<input
					type="text"
					id="username"
					name="username"
					placeholder="Benutzername"
					autocomplete="username"
					minlength="3"
					maxlength="20"
					required
				/>
			</label>
		</div>

		<!-- Passwort -->
		<div class="form-control">
			<label class="label text-sm" for="password">Passwort</label>
			<label class="input-bordered input flex items-center gap-2">
				<Key class="size-5" />
				<input
					id="password"
					name="password"
					type={showPassword ? 'text' : 'password'}
					minlength="3"
					placeholder="Passwort"
					autocomplete="current-password"
					title="Mehr als 3 Ziffern eingeben"
					required
				/>
				<button
					type="button"
					class="btn btn-ghost btn-sm"
					onclick={() => (showPassword = !showPassword)}
					aria-label="Passwort anzeigen"
				>
					{#if showPassword}
						<EyeSlash class="size-5" />
					{:else}
						<Eye class="size-5" />
					{/if}
				</button>
			</label>
		</div>

		<!-- Fehlermeldung -->
		{#if form && form?.message}
			<div class="alert text-sm alert-error">
				{form?.message ?? ''}
			</div>
		{/if}

		<!-- Submit Button -->
		<button type="submit" class="btn w-full btn-primary">Anmelden</button>
	</form>
</main>
