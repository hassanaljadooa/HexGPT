<script>
	import utils from '$lib/utils.js';
	import ToolBar from "./ToolBar.svelte";

	let prompt = '';

	let colors = [
		{ hex: '#EF4444', name: 'red-500' },
		{ hex: '#F59E0B', name: 'yellow-500' },
		{ hex: '#10B981', name: 'green-500' },
		{ hex: '#3B82F6', name: 'blue-500' },
		{ hex: '#9333EA', name: 'indigo-500' },
		{ hex: '#EC4899', name: 'pink-500' }
	];

	async function generate() {
		let req = await fetch(`/api/generate?prompt=${prompt}`);
		let res = await req.text();

		if (req.status == 200) {
			let json = utils.extractColorArray(res)
			// extracts JSON from GPT response, then sets it to color variable
			if (json !== false) {
				colors = json
				utils.successMessage(`${colors.length} Color pallet created successfully`, 1000);
			}
			else {
				utils.failMessage("Pallet generation has failed", 2000)
			}
		} else {
			utils.failMessage("Pallet generation has failed", 2000)
		}
	}

	// Usage
	//const colors = extractColorArray();
	//console.log(colors);
</script>

<div class="flex items-center justify-center w-full">
	<div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-6xl space-y-8">
		<div class="text-center">
			<h1 class="text-3xl font-bold text-gray-800 mb-4">HexGPT Prompt</h1>
			<textarea
				bind:value={prompt}
				rows="4"
				class="textarea textarea-bordered w-full"
				placeholder="A color pallet with a cyberpunk theme, 20 colors, close shades..."
			/>
			<button on:click={generate} class="btn btn-block btn-primary"> Create Pallet </button>
		</div>

		<div class="bg-gray-100 rounded-lg p-4" id="color-panel">
			<!--<h2 class="text-2xl font-semibold text-gray-800 mb-4 text-center">
				Color Palette <span class="badge badge-info badge-lg">{colors.length}</span>
			</h2>-->
			<ToolBar />
			<div class="grid md:grid-cols-2 sm:grid-cols-1 gap-2">
				{#each colors as { hex, name }}
					<div
						class="flex flex-col items-center justify-center bg-white rounded-lg shadow p-2 focus:outline-none focus:"
					>
						<div class="w-full h-16 shadow-lg rounded-lg mb-2" style="background-color: {hex};" />
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
                        <div class="tooltip tooltip-top tooltip-info w-full" data-tip="Copy {utils.hexToRGBA(hex, 1)} to clipboard">
                            <button
                                    on:click={() => {
								utils.copyToClipboard(utils.hexToRGBA(hex, 1));
							}}
                                    class="btn btn-block btn-circle btn-outline mb-2"
                            >
                                {utils.hexToRGBA(hex, 1)}
                            </button>
                        </div>
                        <div class="tooltip tooltip-bottom tooltip-info w-full" data-tip="Copy {utils.hexToHSL(hex)} to clipboard">
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
