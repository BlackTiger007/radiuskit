<script lang="ts">
	export let id: string;
	export let data: string[] = [];
</script>

{#if id && data.length > 0}
	<datalist {id}>
		{#each data as kst}
			<option value={kst}>{kst}</option>
		{/each}
	</datalist>
{/if}
