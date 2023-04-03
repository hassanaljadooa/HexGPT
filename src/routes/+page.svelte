<script>
	import ColorPanel from './ColorPanel.svelte';
	import QandA from './QandA.svelte';
</script>

<svelte:head>
	<title>HexGPT</title>
	<meta name="description" content="Utilize the power of LLMs to create your next color pallet." />
</svelte:head>

<section>
	<div class="container">
		<div class="my-2">
			<ColorPanel />
		</div>
		<div class="my-2">
			<QandA />
		</div>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}
</style>
