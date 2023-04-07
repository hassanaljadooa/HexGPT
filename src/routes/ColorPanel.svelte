<script>
	import utils from '$lib/utils.js';
	import ToolBar from './ToolBar.svelte';
	import {choices} from "$lib/stores.js";

	let prompt = '';

	let colors = [];

	let selectionIndex = 0

	choices.subscribe(colorChoices => {
		colors = colorChoices
	})

	let currentChoice = [
		{ hex: '#EF4444', name: 'red-500' },
		{ hex: '#F59E0B', name: 'yellow-500' },
		{ hex: '#10B981', name: 'green-500' },
		{ hex: '#3B82F6', name: 'blue-500' },
		{ hex: '#9333EA', name: 'indigo-500' },
		{ hex: '#EC4899', name: 'pink-500' }
	]

	// next/previous choice are responsible for cycling through all of the generated color pallets.
	function nextChoice() {
		if (colors.length > 1) {
			selectionIndex = (selectionIndex + 1) % colors.length;
			currentChoice = colors[selectionIndex];
		}
		console.log(selectionIndex);
	}

	function previousChoice() {
		if (colors.length > 1) {
			selectionIndex = (selectionIndex - 1 + colors.length) % colors.length;
			currentChoice = colors[selectionIndex];
		}
		console.log(selectionIndex);
	}


	async function generate() {
		let req = await fetch(`/api/generate?prompt=${prompt}`);
		let res = await req.json();

		if (req.status == 200) {
			res.detail.choices.forEach(choice => {
				// extracts JSON from GPT response, then sets it to color variable
				let extractedJson = utils.extractColorArray(choice.message.content)
				// makes sure the content extracted from the ChatGPT API is actually an object.
				if (typeof extractedJson == 'object') {
					colors.push(extractedJson)
				}
			})


			if (colors.length > 0) {
				// sets the available colors to the choices store
				choices.set(colors)
				// set the preview to the 1st item in the array & index to 0
				currentChoice = colors[0]
				selectionIndex = 0

				utils.successMessage(`${colors.length} Color pallet created successfully`, 1500);
			} else {
				utils.failMessage('Pallet generation has failed', 1500);
			}
		} else {
			utils.failMessage('Pallet generation has failed', 1500);
		}
	}
</script>
<details class="alert alert-warning mb-2 text-left rounded-lg">
	<summary class="alert-title cursor-pointer">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
		Important Information
	</summary>
	<div class="alert-content pt-2">
		<span>ChatGPT API can struggle when a prompt is overtly specific, if you see a <span class="font-bold italic">Pallet generation has failed</span> error message please don't hesitate to try again, even slight variations in a prompt can a make a big difference.
			I am currently working on a more robust system prompt, to make sure that the ChatGPT API is reliable and flexible.
			<br><br>
			Also, HexGPT now generates 4 distinct colors pallets based on the same prompt, you can cycle through them all with the tooltip located at the bottom of the screen.
		</span>
	</div>
</details>

<div class="grid-cols-2">
	<div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-6xl mb-2 space-y-8">
		<div class="text-center">
			<h1 class="text-3xl font-bold text-gray-800 mb-4">Create Your Pallet</h1>
			<textarea
					bind:value={prompt}
					rows="4"
					class="textarea textarea-bordered w-full"
					placeholder="A color pallet with a cyberpunk theme, 20 colors, close shades..."
			/>
			<button on:click={generate} class="btn btn-block btn-primary"> Create Pallet </button>
		</div>
	</div>
</div>

<div class="flex items-center justify-center w-full">
	<div class="bg-white rounded-lg shadow-lg p-1 w-full max-w-6xl space-y-8">
		<div class="bg-gray-100 rounded-lg p-2">
			<ToolBar  />
			{#if colors.length > 0 }
				<div class="fixed bottom-0 left-0 right-0 flex justify-center mb-2 z-50">
					<div class="p-3 rounded-lg text-center">
						<ul class="menu menu-horizontal bg-gray-200 rounded-box">
							<li>
								<button on:click={previousChoice}>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
										<path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
									</svg>
								</button>
							</li>
							<li>
								<p class="text-lg font-bold">
									{selectionIndex}
								</p>
							</li>
							<li>
								<button on:click={nextChoice}>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
										<path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
									</svg>
								</button>
							</li>
						</ul>
					</div>
				</div>
			{/if}
			<div id="color-panel">
				<div class="grid md:grid-cols-2 sm:grid-cols-1 gap-2">
					{#each currentChoice as { hex, name }}
						<div
								class="flex flex-col items-center justify-center bg-white rounded-lg shadow p-2 focus:outline-none"
						>
							<div class="w-full h-16 rounded-lg shadow-lg mb-2" style="background-color: {hex};" />
							<div class="tooltip tooltip-top tooltip-info w-full" data-tip="Copy {hex} to clipboard">
								<button
										on:click={() => {
									utils.copyToClipboard(hex);
								}}
										class="btn btn-block btn-circle btn-outline mb-2"
								>
									{hex}
								</button>
							</div>
							<div
									class="tooltip tooltip-top tooltip-info w-full"
									data-tip="Copy {utils.hexToRGBA(hex, 1)} to clipboard"
							>
								<button
										on:click={() => {
									utils.copyToClipboard(utils.hexToRGBA(hex, 1));
								}}
										class="btn btn-block btn-circle btn-outline mb-2"
								>
									{utils.hexToRGBA(hex, 1)}
								</button>
							</div>
							<div
									class="tooltip tooltip-bottom tooltip-info w-full"
									data-tip="Copy {utils.hexToHSL(hex)} to clipboard"
							>
								<button
										on:click={() => {
									utils.copyToClipboard(utils.hexToHSL(hex));
								}}
										class="btn btn-block btn-circle btn-outline mb-2"
								>
									{utils.hexToHSL(hex)}
								</button>
							</div>
							<p class="mt-2 bg-slate-600 w-full text-white" />
							<p class="text-xs text-gray-500">{name}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
