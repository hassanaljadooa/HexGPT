<script>
    import utils from '$lib/utils.js';
    import ToolBar from './ToolBar.svelte';
    import {choices, currentSelectionIdx} from '$lib/stores.js';
    import PromptPanel from './PromptPanel.svelte';

    let colors = [];

    let selectionIndex = 0;

    let currentChoice = [
        {hex: '#EF4444', name: 'red-500'},
        {hex: '#F59E0B', name: 'yellow-500'},
        {hex: '#10B981', name: 'green-500'},
        {hex: '#3B82F6', name: 'blue-500'},
        {hex: '#9333EA', name: 'indigo-500'},
        {hex: '#EC4899', name: 'pink-500'}
    ];

    currentSelectionIdx.subscribe(idx => {
        selectionIndex = idx
        if (colors.length > 0 ) {
            console.log(colors[idx])
            currentChoice = colors[idx]
        }
    })

    choices.subscribe((colorChoices) => {
        colors = colorChoices;
    });

    $: if (colors.length > 0) {
        //choices.set(colors);
        // set the preview to the 1st item in the array & index to 0
        currentChoice = colors[0];
        selectionIndex = 0;
    }

    // next/previous choice are responsible for cycling through all of the generated color pallets.
    function nextChoice() {
        if (colors.length > 1) {
            $currentSelectionIdx = (selectionIndex + 1) % colors.length;
            currentChoice = colors[selectionIndex];
        }
    }

    function previousChoice() {
        if (colors.length > 1) {
            $currentSelectionIdx = (selectionIndex - 1 + colors.length) % colors.length;
            currentChoice = colors[selectionIndex];
        }
    }
</script>

<div class="flex items-center justify-center w-full">
    <div class="bg-white rounded-lg shadow-lg p-1 w-full max-w-6xl space-y-8">
        <div class="bg-gray-100 rounded-lg p-2">
            <ToolBar/>
            {#if colors.length > 0}
                <div class="fixed bottom-0 left-0 right-0 flex justify-center mb-2 z-50">
                    <div class="p-3 rounded-lg text-center">
                        <ul class="menu menu-horizontal bg-gray-200 rounded-box">
                            <li>
                                <button on:click={previousChoice}>
                                    <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            class="bi bi-arrow-left-circle-fill"
                                            viewBox="0 0 16 16"
                                    >
                                        <path
                                                d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                                        />
                                    </svg>
                                </button>
                            </li>
                            <li>
                                <p class="text-lg font-bold">
                                    {selectionIndex + 1}
                                </p>
                            </li>
                            <li>
                                <button on:click={nextChoice}>
                                    <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            class="bi bi-arrow-right-circle-fill"
                                            viewBox="0 0 16 16"
                                    >
                                        <path
                                                d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                                        />
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            {/if}
            <div id="color-panel">
                <div class="grid md:grid-cols-2 sm:grid-cols-1 gap-2">
                    {#each currentChoice as {hex, name}}
                        <div
                                class="flex flex-col items-center justify-center bg-white rounded-lg shadow p-2 focus:outline-none"
                        >
                            <div class="w-full h-16 rounded-lg shadow-lg mb-2" style="background-color: {hex};"/>
                            <div
                                    class="tooltip tooltip-top tooltip-info w-full"
                                    data-tip="Copy {hex} to clipboard"
                            >
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
                            <p class="mt-2 bg-slate-600 w-full text-white"/>
                            <p class="text-xs text-gray-500">{name}</p>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</div>
