<script>
	import utils from "$lib/utils.js";
	import html2canvas from 'html2canvas';

	let screenshotUrl;

	async function captureScreenshot() {
		let colorPanel = document.getElementById('color-panel');

		colorPanel.style.boxSizing = 'border-box';
		colorPanel.style.borderRadius = 0;
		colorPanel.style.padding = 5;

		let canvas = await html2canvas(colorPanel, {
			scale: 2
		});

		screenshotUrl = canvas.toDataURL();

		utils.actuateModal('sc')
	}
</script>

<div class="mb-2">
	<div class="navbar rounded-lg bg-base-100">
		<div class="flex flex-col sm:flex-row justify-between w-full">
			<div class="text-center sm:text-left mb-4 sm:mb-0">
				<button class="btn btn-ghost hover:backdrop-grayscale-0 normal-case text-xl">Pallet Options</button>
			</div>
			<div class="flex-none">
				<ul class="menu flex flex-col sm:flex-row menu-horizontal px-1">
					<li class="mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto">
						<button class="btn btn-ghost w-full sm:w-auto text-center" on:click={captureScreenshot}>Save Pallet</button>
					</li>
					<li class="w-full sm:w-auto">
						<button class="btn btn-ghost w-full sm:w-auto text-center">Fine Tune (coming soon)</button>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>




<!-- Put this part before </body> tag -->
<input type="checkbox" id="screenshotModal" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle" id="sc">
	<div class="modal-box">
		<h3 class="font-bold text-xl text-center mb-1">Screenshot Preview</h3>
		<img src={screenshotUrl} class="" alt="An Image of the Color Pallete" />
		<div class="modal-action">
			<a
				href={screenshotUrl}
				download="pallete.png"
				for="screenshotModal"
				class="btn"
				on:click={() => {
					//screenshotUrl = undefined;
					utils.actuateModal('sc')
					utils.successMessage('Saved pallet successfully.', 1500)
				}}>Save</a>
		</div>
	</div>
</div>
