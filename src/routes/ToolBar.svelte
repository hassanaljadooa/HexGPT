<script>
	import utils from '$lib/utils.js';
	import html2canvas from 'html2canvas';

	import { choices, currentSelectionIdx } from '$lib/stores.js';
	import {onMount} from "svelte";

	let screenshotUrl;

	let numOfPallets = 0;
	let colorChoices = []

	let currentChoice;

	onMount(() => {
		choices.subscribe((choices) => {
			console.log(colorChoices)
			numOfPallets = choices.length;
			colorChoices = choices
		});

		currentChoice = colorChoices[0]
	})

	$: if ($currentSelectionIdx) {
		currentChoice = colorChoices[$currentSelectionIdx]
	}

	function exportAsJson (exportType) {
		if (exportType === "clipboard") {
			utils.copyToClipboard(JSON.stringify(currentChoice))
		}
		if (exportType == 'file') {return null}
	}

	async function captureScreenshot() {
		let colorPanel = document.getElementById('color-panel');

		colorPanel.style.boxSizing = 'border-box';
		colorPanel.style.borderRadius = 0;
		colorPanel.style.padding = 5;

		let canvas = await html2canvas(colorPanel, {
			scale: 4
		});

		screenshotUrl = canvas.toDataURL();

		utils.actuateModal('sc');
	}
</script>

<div class="mb-2">
	<div class="navbar bg-base-100 shadow-lg rounded-lg">
		<div class="flex-1">
			<a class="btn btn-ghost normal-case text-xl" href="/">Options <span class="badge rounded-lg ml-1">{$currentSelectionIdx + 1}</span></a>
		</div>
		<div class="flex-none">
			<ul class="menu menu-horizontal px-1">
				<div class="dropdown dropdown-end mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto">
					<label tabindex="0" class="btn btn-ghost rounded-btn swap">
						<input type="checkbox" />
						<div class="swap-on"><i class="mr-1 fa-solid fa-caret-right text-xl fa-rotate-90"></i> Export Pallet</div>
						<div class="swap-off"><i class="mr-1 fa-solid fa-caret-right text-xl fa-rotate-90"></i> Export Pallet</div>
					</label>
					<ul tabindex="0" class="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-full mt-4">
						<li>
							<button class="btn btn-ghost w-full text-center" on:click={captureScreenshot}
							>Image</button
							></li>
						<li>
							<button class="btn btn-ghost w-full text-center" on:click={() => {utils.actuateModal('cm')}}
							>JSON</button>
						</li>
					</ul>
				</div>
			</ul>
		</div>
	</div>
</div>



<!-- Put this part before </body> tag -->
<input type="checkbox" id="screenshotModal" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle" id="sc">
	<div class="modal-box">
		<div class="flex justify-between mb-1">
			<h3 class="font-bold text-xl text-center mb-1">Preview Image</h3>
			<button class="btn btn-ghost btn-circle btn-sm text-xl" on:click={() => {utils.actuateModal("sc")}}><i class="fa-solid fa-circle-xmark"></i></button>
		</div>
		p.
		<div class="divider"></div>
		<img src={screenshotUrl} class="" alt="An Image of the Color Pallete" />
		<div class="modal-action">
			<a
				href={screenshotUrl}
				download="pallete.png"
				for="screenshotModal"
				class="btn"
				on:click={() => {
					//screenshotUrl = undefined;
					utils.actuateModal('sc');
					utils.successMessage('Saved pallet successfully.', 1500);
				}}><i class="fa-solid fa-download"></i>&nbsp;Save Image</a
			>
		</div>
	</div>
</div>

{#if typeof currentChoice != 'undefined'}
	<input type="checkbox" id="codeModal" class="modal-toggle" />
	<div class="modal modal-bottom sm:modal-middle" id="cm">
		<div class="modal-box">
			<div class="flex justify-between mb-1">
				<h3 class="font-bold text-xl text-center mb-1">JSON Preview</h3>
				<button class="btn btn-ghost btn-circle btn-sm text-xl" on:click={() => {utils.actuateModal("cm")}}><i class="fa-solid fa-circle-xmark"></i></button>
			</div>
			<div class="divider"></div>
			<div class="mockup-code">
				{#each currentChoice as color, idx}
					<pre class="text-success bg-transparent	shadow-transparent" data-prefix="{idx + 1}"><code>{JSON.stringify(color)}</code></pre>
				{/each}
			</div>
			<div class="modal-action">
				<button on:click={() => {
					exportAsJson('clipboard')
					utils.actuateModal('cm')
				}} class="btn btn-primary"><i class="fa-solid fa-copy"></i> &nbsp; Copy to Clipboard</button>
				<button on:click={() => {
					exportAsJson('file')
				utils.actuateModal('cm')
				}} class="btn btn-secondary"><i class="fa-solid fa-download"></i>&nbsp;Save as JSON File</button>
			</div>
		</div>
	</div>
{/if}