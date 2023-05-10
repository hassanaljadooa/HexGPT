<script>
	import ColorPanel from './ColorPanel.svelte';
	import PromptPanel from "./PromptPanel.svelte";
	import ChoiceSelector from "./ChoiceSelector.svelte";
</script>

<svelte:head>
	<title>HexGPT</title>
	<meta name="description" content="Utilize the power of LLMs to create your next color pallet." />
</svelte:head>

<div class="">
	<div>
		<div class="flex flex-wrap -mx-2">
			<div class="w-full md:w-2/5 px-2">
				<div class="h-full flex flex-col">
					<div class="flex-1">
						<PromptPanel />
					</div>
					<div class="flex-1">
						<ChoiceSelector />
					</div>
				</div>
			</div>
			<div class="w-full md:w-3/5 px-2">
				<div class="h-full">
					<ColorPanel />
				</div>
			</div>
		</div>
	</div>
</div>

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
