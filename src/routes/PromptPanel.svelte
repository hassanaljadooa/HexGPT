<script>
	import utils from '$lib/utils.js';
	import { choices } from '$lib/stores';

	let currentlyLoading = false;

	let requestParameters = {
		prompt: '',
		generationCount: 2 // defines the number of ChatGPT completions based on a single prompt,
	};

	async function generate() {
		console.log(requestParameters);
		currentlyLoading = true
		let req = await fetch(
			`/api/generate?prompt=${requestParameters.prompt}&count=${requestParameters.generationCount}`
		);
		let res = await req.json();

		let colors = [];

		if (req.status == 200) {
			res.detail.choices.forEach((choice) => {
				// extracts JSON from GPT response, then sets it to color variable
				let extractedJson = utils.extractColorArray(choice.message.content); //JSON.parse(choice.message.content)
				// makes sure the content extracted from the ChatGPT API is actually an object.
				if (typeof extractedJson === 'object') {
					colors.push(extractedJson);
				}
			});

			choices.set([])
			choices.set(colors);

			utils.successMessage('Your pallets have been generated :)', 2000)
		} else {
			utils.failMessage('Uh oh it looks like something went wrong, please try again!', 5000)
		}
		currentlyLoading = false;
	}
</script>

<div class="grid-cols-2">
	<div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-6xl mb-2 space-y-8">
		<div class="text-center">
			<h1 class="text-3xl font-bold text-gray-800 mb-4">Create Your Pallet</h1>
			<textarea
				bind:value={requestParameters.prompt}
				rows="4"
				class="textarea textarea-bordered w-full"
				placeholder="A color pallet with a cyberpunk theme, 20 colors, close shades..."
			/>
			<div class="mb-2 rounded-lg shadow-lg px-2 py-3 gap-2">
				<h2 class="text-left font-bold mb-1">Options
					<div class="tooltip tooltip-bottom	 tooltip-info" data-tip="How many pallets HexGPT will create.">
						<span class="badge sm:badge-md md:badge-lg">
							<i class="fa-sharp fa-solid fa-palette" /> &nbsp; {requestParameters.generationCount}</span>
					</div>
				</h2>
				<div class="form-control bg-slate-100 hover:bg-slate-200 focus:bg-slate-400 rounded-lg pl-2">
					<label class="label cursor-not-allowed" >
						<span class="label-text text-left font-bold">CSS Gradient (coming soon) <br><p class="font-italics">Create a pallet of CSS gradients based on the same prompt.</p></span>
						<input type="checkbox" class="checkbox" disabled />
					</label>
				</div>
				<div class="bg-slate-100 text-black rounded-lg p-2 mb-1 mt-2">
					<label class="w-full">
								<span>
									<div class="badge badge-info w-full font-bold">
										<i class="fa-sharp fa-solid fa-palette" />&nbsp;Pallet Count &nbsp;
										<div
												class="tooltip tooltip-info"
												data-tip="Set the number of color pallets to generate, each a pallet is a unique ChatGPT completion based on the same prompt. It alters the n parameter of the ChatGPT API.">
											<i class="fa-solid fa-circle-info" />
										</div>
									</div>
								</span>
						<input
								type="range"
								bind:value={requestParameters.generationCount}
								step="1"
								min="1"
								max="5"
								placeholder="Set the model temperature between 0.0-1.0."
								class="range"
						/>
						<div class="w-full flex justify-between text-xs px-2">
							<span>1</span>
							<span>2</span>
							<span>3</span>
							<span>4</span>
							<span>5</span>
						</div>
					</label>
				</div>
			</div>
			<button on:click={generate} class="{requestParameters.prompt === '' ? 'btn-disabled' : ''} {currentlyLoading === false ? '' : 'loading'} btn btn-block btn-primary tracking-widest">{currentlyLoading == false ? 'Generate Pallet' : 'Generating...'}</button>
		</div>
	</div>
</div>
