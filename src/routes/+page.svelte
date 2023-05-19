<script>
	import ColorPanel from './ColorPanel.svelte';
	import PromptPanel from "./PromptPanel.svelte";
	import ChoiceSelector from "./ChoiceSelector.svelte";
</script>

<svelte:head>
	<meta charset="UTF-8">
	<meta name="description" content="HexGPT - AI-powered Color Palette Generator">
	<meta name="keywords" content="HexGPT, color palette, AI, GPT-3.5-Turbo, design guidelines">
	<meta name="robots" content="index, follow">
	<title>HexGPT - AI-powered Color Palette Generator</title>
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
