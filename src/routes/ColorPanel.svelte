<script>
    import utils from "$lib/utils.js";

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
            // extracts JSON from GPT response, then sets it to color variable
            colors = utils.extractColorArray(res);
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
                    class="resize-none w-full p-2 border border-gray-300 rounded-lg focus:border-blue-400 focus:outline-none"
                    placeholder="A color pallet with a cyberpunk theme, 20 colors, close shades..."
            />
            <button
                    on:click={generate}
                    class=" w-full bg-zinc-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transform transition-transform duration-200 hover:bg-lightBlue-600 active:scale-95 focus:outline-none focus:ring-4 focus:ring-2 focus:ring-opacity-50"
            >
                Create Pallet
            </button>
        </div>

        <div class="bg-gray-100 rounded-lg p-4">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 text-center">
                Color Palette <span class="rounded bg-black text-white py-1 px-2 text-lg"
            >{colors.length}</span
            >
            </h2>
            <div class="grid grid-cols-2 gap-2">
                {#each colors as { hex, name }}
                    <div
                            class="flex flex-col items-center justify-center bg-white rounded-lg shadow p-2 focus:outline-none focus:"
                    >
                        <div class="w-full h-16 shadow-lg rounded-lg mb-2" style="background-color: {hex};" />
                        <button on:click={utils.copyToClipboard(hex)}
                                class="w-full font-semibold px-6 py-2 rounded-lg shadow-md transform transition-transform duration-200 hover:bg-lightBlue-600 active:scale-95 focus:outline-none focus:ring-4 focus:ring-2 focus:ring-opacity-50"
                        >
                            {hex}
                        </button>
                        <button
                                on:click={() => {
								utils.copyToClipboard(utils.hexToRGBA(hex, 1));
							}}
                                class=" w-full font-semibold px-6 py-2 rounded-lg shadow-md transform transition-transform duration-200 hover:bg-lightBlue-600 active:scale-95 focus:outline-none focus:ring-4 focus:ring-2 focus:ring-opacity-50"
                        >
                            {utils.hexToRGBA(hex, 1)}
                        </button>
                        <button
                                on:click={() => {
								utils.copyToClipboard(utils.hexToHSL(hex));
							}}
                                class=" w-full font-semibold px-6 py-2 rounded-lg shadow-md transform transition-transform duration-200 hover:bg-lightBlue-600 active:scale-95 focus:outline-none focus:ring-4 focus:ring-2 focus:ring-opacity-50"
                        >
                            {utils.hexToHSL(hex)}
                        </button>
                        <p class="mt-2 bg-slate-600 w-full text-white" />
                        <p class="text-xs text-gray-500">{name}</p>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    .min-h-screen {
        min-height: 100vh;
    }
</style>
