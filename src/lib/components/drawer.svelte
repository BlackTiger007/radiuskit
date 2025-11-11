<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	let { children } = $props();
</script>

<div class="drawer-open drawer">
	<input id="drawer-toggle" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content p-6">
		{@render children()}
	</div>

	<div class="drawer-side is-drawer-close:overflow-visible">
		<div
			class="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64"
		>
			<!-- Sidebar Navigation -->
			<ul class="menu w-full grow">
				<li class="mb-4">
					<span class="ps-4 pt-2 text-xl font-bold is-drawer-close:hidden">Admin Panel</span>
				</li>

				<!-- Dashboard -->
				<li>
					<a
						href={resolve('/admin')}
						class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
						data-tip="Dashboard"
						class:is-active={page.url.pathname.includes('/admin')}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="my-1.5 size-5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"
							/>
						</svg>
						<span class="is-drawer-close:hidden">Dashboard</span>
					</a>
				</li>

				<!-- Benutzerverwaltung -->
				<li>
					<a
						href={resolve('/admin/users')}
						class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
						data-tip="Benutzer"
						class:is-active={page.url.pathname.startsWith('/admin/users')}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="my-1.5 size-5"
						>
							<path d="M20 21v-2a4 4 0 0 0-3-3.87"></path>
							<path d="M4 21v-2a4 4 0 0 1 3-3.87"></path>
							<circle cx="12" cy="7" r="4"></circle>
						</svg>
						<span class="is-drawer-close:hidden">Benutzer</span>
					</a>
				</li>

				<!-- Logs -->
				<li>
					<a
						href={resolve('/admin/logs')}
						class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
						data-tip="Logs"
						class:is-active={page.url.pathname.startsWith('/admin/logs')}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="my-1.5 size-5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 6v6l4 2m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span class="is-drawer-close:hidden">Logs</span>
					</a>
				</li>

				<!-- Statistik -->
				<li>
					<a
						href={resolve('/admin/stats')}
						class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
						data-tip="Statistik"
						class:is-active={page.url.pathname.startsWith('/admin/stats')}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="my-1.5 size-5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3 3v18h18M9 17V9m4 8V5m4 12v-4"
							/>
						</svg>
						<span class="is-drawer-close:hidden">Statistik</span>
					</a>
				</li>

				<!-- NAS Verwaltung -->
				<li>
					<a
						href={resolve('/admin/nas')}
						class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
						data-tip="NAS Geräte"
						class:is-active={page.url.pathname.startsWith('/admin/nas')}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="my-1.5 size-5"
						>
							<rect x="3" y="3" width="18" height="18" rx="2"></rect>
							<path d="M7 7h10v10H7z"></path>
						</svg>
						<span class="is-drawer-close:hidden">NAS Geräte</span>
					</a>
				</li>
			</ul>

			<!-- Logout -->
			<a
				href={resolve('/admin/logout')}
				class="btn mt-auto mb-4 btn-block btn-outline btn-error is-drawer-close:tooltip is-drawer-close:tooltip-right"
				data-tip="Abmelden"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					stroke-linejoin="round"
					stroke-linecap="round"
					stroke-width="2"
					fill="none"
					stroke="currentColor"
					class="my-1.5 size-5"
				>
					<path d="M10 12h10m0 0l-3-3m3 3l-3 3" />
					<path d="M4 4h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4" />
				</svg>
				<span class="is-drawer-close:hidden">Logout</span>
			</a>

			<!-- Drawer-Toggle unten -->
			<div class="m-2 is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Menü öffnen">
				<label
					for="drawer-toggle"
					class="drawer-button btn btn-circle btn-ghost is-drawer-open:rotate-y-180"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						stroke-linejoin="round"
						stroke-linecap="round"
						stroke-width="2"
						fill="none"
						stroke="currentColor"
						class="my-1.5 inline-block size-4"
					>
						<path d="M9 5l7 7-7 7" />
					</svg>
				</label>
			</div>
		</div>
	</div>
</div>
