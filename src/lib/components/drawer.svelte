<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	let { children } = $props();
</script>

<div class="drawer-open drawer">
	<input id="drawer-toggle" type="checkbox" class="drawer-toggle" checked />
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
						href={resolve('/')}
						class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
						data-tip="Dashboard"
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
						href={resolve('/users')}
						class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
						data-tip="Benutzer"
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

				<!-- Gruppen -->
				<li>
					<a
						href={resolve('/group')}
						class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
						data-tip="Gruppen"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 1920 1920"
							fill="none"
							stroke="currentColor"
							class="my-1.5 size-5"
						>
							<path
								d="M1807.059 1270.091c-68.668 48.452-188.725 116.556-343.906 158.57-18.861-102.55-92.725-187.37-196.066-219.106-91.708-28.235-185.11-48.339-279.53-61.666 71.944-60.762 121.638-145.807 135.982-243.162 21.91-.791 44.837-1.243 71.04-1.243 166.023.904 331.143 26.316 490.955 75.445 72.621 22.362 121.525 87.755 121.525 162.861v128.301Zm-451.765 338.824c-114.183 80.753-330.24 198.099-621.176 198.099-129.43 0-379.144-26.203-621.177-198.1v-128.752c0-74.993 49.017-140.499 121.75-162.861 162.41-49.694 330.354-74.88 499.427-74.88h8.47c166.588.79 331.821 26.09 491.407 75.106 72.509 22.249 121.3 87.642 121.3 162.635v128.753Zm-903.53-761.901V734.072c0-155.632 126.608-282.352 282.354-282.352 155.746 0 282.353 126.72 282.353 282.352v112.942c0 155.746-126.607 282.353-282.353 282.353S451.765 1002.76 451.765 847.014Zm734.118-734.118c75.22 0 146.146 29.478 199.567 82.899 53.309 53.421 82.786 124.235 82.786 199.454V508.19c0 155.746-126.607 282.353-282.353 282.353-19.651 0-38.4-2.598-56.47-6.438v-50.033c0-156.423-92.047-290.71-224.188-354.748 8.357-148.066 130.447-266.428 280.658-266.428Zm532.857 758.061c-91.37-28.01-184.546-48.226-279.755-61.666 86.174-72.508 142.192-179.802 142.192-301.1V395.248c0-105.374-41.11-204.65-115.877-279.304-74.767-74.767-173.93-115.99-279.417-115.99-200.696 0-365.138 151.002-390.211 345.148-20.217-3.275-40.433-6.325-61.553-6.325-217.977 0-395.294 177.43-395.294 395.294v112.942c0 121.298 56.018 228.593 142.305 301.214-94.305 13.214-188.16 33.092-279.529 61.1C81.092 1246.375 0 1355.249 0 1480.163v185.675l22.588 16.941c275.238 206.344 563.803 237.177 711.53 237.177 344.244 0 593.618-148.63 711.53-237.177l22.587-16.94v-120.51c205.214-50.597 355.652-146.032 429.177-201.373l22.588-16.941V1141.79c0-125.026-80.979-233.901-201.261-270.833Z"
								fill="currentColor"
							/>
						</svg>

						<span class="is-drawer-close:hidden">Gruppen</span>
					</a>
				</li>

				<!-- Logs -->
				<li>
					<a
						href={resolve('/logs')}
						class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
						data-tip="Logs"
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
						href={resolve('/stats')}
						class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
						data-tip="Statistik"
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
						href={resolve('/nas')}
						class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
						data-tip="NAS Geräte"
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

				<!-- Admin Benutzerverwaltung -->
				<li>
					<a
						href={resolve('/admins')}
						class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
						data-tip="Admins"
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
						<span class="is-drawer-close:hidden">Admins</span>
					</a>
				</li>
			</ul>

			<!-- Logout -->
			<a
				href={resolve('/logout')}
				class="btn mt-auto mb-4 btn-block btn-outline btn-error is-drawer-close:tooltip is-drawer-close:tooltip-right"
				data-sveltekit-preload-data="off"
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
